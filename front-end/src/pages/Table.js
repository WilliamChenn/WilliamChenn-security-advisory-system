import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link } from 'react-router-dom';
import { COLUMNS } from './TableColumns';
import './Table.css';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: #f8f8f8;
`;

const FilterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Add margin to create space between the button and the table */
`;

const FilterButton = styled.button`
  background-color: white;
  border: none;
  color: #0417aa;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }

  img {
    width: 20px;
    margin-left: 10px;
  }
`;

const matchesSearchQuery = (item, query) => {
  if (!query) return true;
  const lowerCaseQuery = query.toLowerCase();
  return Object.values(item).some(value =>
    value && value.toString().toLowerCase().includes(lowerCaseQuery)
  );
};

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
  const [sidebar, setSidebar] = useState(false);
  const [filters, setFilters] = useState({
    severity: [],
    dateRange: 'default',
    startDate: '',
    endDate: '',
    searchQuery: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/cves/recent?time_range=year');
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
      startDate = new Date(0); // For 'all' or any other unspecified ranges
      startDate.setDate(currentDate.getDate() - 14);
      endDate = currentDate;
    }

    return data.filter(item => {
      const severityLevel = getSeverityClass(item.max_cvss_base_score);
      const severityMatch = filters.severity.length === 0 || filters.severity.includes(severityLevel);
      const itemDate = new Date(item.publish_date.substring(0, 10));
      const dateMatch = itemDate >= startDate && itemDate <= endDate;
      const searchMatch = matchesSearchQuery(item, filters.searchQuery);
      return severityMatch && dateMatch && searchMatch;
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
    pageSize: 30, // Initial page size
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

  const showSidebar = () => setSidebar(!sidebar);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters((prevFilters) => {
      if (type === 'checkbox') {
        const updatedSeverity = checked
          ? [...prevFilters.severity, value]
          : prevFilters.severity.filter(severity => severity !== value);
        return { ...prevFilters, severity: updatedSeverity };
      }
      return { ...prevFilters, [name]: value };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageIndex]);

  return (
    <Wrapper>
      <Header />
      <HeaderContainer>
        <div className="title">Find Out If You Have Vulnerabilities That Put You at Risk</div>
      </HeaderContainer>
      <FilterButtonWrapper>
        <FilterButton onClick={showSidebar} sidebar={sidebar}>
          Filter Here
          <img
            src="https://static.thenounproject.com/png/4800805-200.png"
            alt="desc"
          />
        </FilterButton>
      </FilterButtonWrapper>
      <div className={`TableContainer ${sidebar ? 'with-sidebar' : ''}`}>
        <table {...getTableProps()} className="Table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                    <td {...cell.getCellProps()}>
                      {cell.column.id === 'cve_number' ? (
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
        sidebar={sidebar}
        showSidebar={showSidebar}
        handleFilterChange={handleFilterChange}
        filters={filters}
      />
      <Footer />
    </Wrapper>
  );
};

export default Table;

