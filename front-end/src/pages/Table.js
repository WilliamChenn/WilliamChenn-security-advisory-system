import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { COLUMNS } from './TableColumns';
import './Table.css';
import Sidebar from '../components/Sidebar';

//helper method that returns entries that match search
const matchesSearchQuery = (item, query) => {
  if (!query) return true;
  const lowerCaseQuery = query.toLowerCase();
  return Object.values(item).some(value =>
    value && value.toString().toLowerCase().includes(lowerCaseQuery)
  );
};

//helper method
const getSeverityClass = (cvss) => {
  if (cvss > 0 && cvss < 4) {
    return "low";
  } else if (cvss >= 4 && cvss < 7) {
    return "medium";
  } else if (cvss >= 7 && cvss < 9) {
    return "high";
  } else if (cvss >= 9 && cvss <= 10) {
    return "critical";
  } else {
    return "n-a";
  }
};

const Table = () => {
  const [data, setData] = useState([]);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [filters, setFilters] = useState({
    severity: [],
    dateRange: 'default',
    startDate: '',
    endDate: '',
    searchQuery: '',
    vendors: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetches cves from the last year
        const response = await fetch('http://localhost:3001/api/v3/cves/recent?time_range=year', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const parsedData = await response.json();
        setData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    const currentDate = new Date();
    let startDate;
    let endDate;
    if (filters.dateRange === 'day') {
      startDate = currentDate;
      endDate = currentDate;
    } else if (filters.dateRange === 'week') {
      startDate = new Date();
      startDate.setDate(currentDate.getDate() - 7);
      endDate = currentDate;
    } else if (filters.dateRange === 'month') {
      startDate = new Date();
      startDate.setMonth(currentDate.getMonth() - 1);
      endDate = currentDate;
    } else if (filters.dateRange === 'year') {
      startDate = new Date();
      startDate.setFullYear(currentDate.getFullYear() - 1);
      endDate = currentDate;
    } else if (filters.dateRange === 'custom') {
      startDate = new Date(filters.startDate);
      endDate = new Date(filters.endDate);
    } else {
      startDate = new Date(0); 
      startDate.setDate(currentDate.getDate() - 14);
      endDate = currentDate;
    }
  
    return data.filter(item => {
      const severityLevel = getSeverityClass(item.max_cvss_base_score);
      const severityMatch = filters.severity.length === 0 || filters.severity.includes(severityLevel);
      const itemDate = new Date(item.publish_date.substring(0, 10));
      const dateMatch = itemDate >= startDate && itemDate <= endDate;
      const searchMatch = matchesSearchQuery(item, filters.searchQuery);
      const vendorMatch = filters.vendors.length === 0 || filters.vendors.includes(item.vendor.name);
      return severityMatch && dateMatch && searchMatch && vendorMatch;
    });
  }, [data, filters]);

  const columns = useMemo(() => COLUMNS, []);

  const initialState = {
    sortBy: [
      {
        id: 'max_cvss_base_score',
        desc: true,
      },
    ],
    pageSize: 30, 
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    state: { pageIndex },
    prepareRow,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState,
    },
    useSortBy,
    usePagination
  );

  const showSidebar = () => setSidebarVisible(!sidebarVisible);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // backend controller that posts new vendors as needed
      const response = await fetch('http://localhost:3001/api/v3/vendors/refresh_vendors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh vendors');
      }

      const updatedDataResponse = await fetch('http://localhost:3001/api/v3/cves/recent?time_range=year', {
        credentials: 'include',
      });
      if (!updatedDataResponse.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedData = await updatedDataResponse.json();
      setData(updatedData);
    } catch (error) {
      console.error('Error refreshing vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prevFilters) => {
      if (type === 'checkbox') {
        if (name === 'severity') {
          const updatedSeverity = checked
            ? [...prevFilters.severity, value]
            : prevFilters.severity.filter(severity => severity !== value);
          return { ...prevFilters, severity: updatedSeverity };
        }
      }
      return { ...prevFilters, [name]: value };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageIndex]);
  
  return (
     <div>
      <main className="table-main-content">
        <div className="filter-refresh-wrapper">
          <button className="filter-button" onClick={showSidebar}>
            Filter Here
            <img src="https://static.thenounproject.com/png/4800805-200.png" alt="filter" />
          </button>
          <button className="refresh-button" onClick={handleRefresh}>
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <img src="https://cdn-icons-png.flaticon.com/512/61/61225.png" alt="refresh" />
            )}
          </button>
        </div>

        <div className={sidebarVisible ? 'sidebar-visible' : ''}>
        <div className="table-container">        <table {...getTableProps()} className="Table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={column.id === 'cve_id' ? { width: column.width } : {}}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? (
                          <img src="https://cdn2.iconfinder.com/data/icons/arrows-236/14/Polygon-1-1024.png" alt="desc" style={{ width: '20px', marginLeft: '10px' }} />
                        ) : (
                          <img src="https://cdn2.iconfinder.com/data/icons/arrows-236/14/Polygon-1024.png" alt="asc" style={{ width: '20px', marginLeft: '10px' }} />
                        )) : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={cell.column.id === 'cve_id' ? { width: cell.column.width } : {}}
                      >
                        {cell.column.id === 'cve_id' ? (
                          <Link to={`/learn-more/${cell.row.original.cve_id}`}>{cell.render('Cell')}</Link>
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            {pageOptions.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => gotoPage(pageNumber)}
                className={pageIndex === pageNumber ? 'active' : ''}
              >
                {pageNumber + 1}
              </button>
            ))}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </div>
        <Sidebar
          sidebar={sidebarVisible}
          showSidebar={showSidebar}
          handleFilterChange={handleFilterChange}
          filters={filters}
        />
        </div>
      </main>
    </div>
  );
};

export default Table;

