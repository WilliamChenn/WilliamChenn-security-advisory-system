import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import { COLUMNS } from './TableColumns';
import './Table.css';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const FilterButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 24px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const getSeverityClass = (cvss) => {
    if (cvss > 0 && cvss < 4) {
        return "low";
    }
    else if (cvss >= 4 && cvss < 7) {
        return "medium";
    }
    else if (cvss >= 7 && cvss < 9) {
        return "high";
    }
    else if (cvss >= 9 && cvss <= 10) {
        return "critical";
    }
    else {
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
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/cves/recent?time_range=month');
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
        console.log('Applying filters:', filters); // Debugging: Log current filters

        const currentDate = new Date();
        let startDate;
        let endDate;
        if (filters.dateRange === 'week') {
            startDate = new Date();
            startDate.setDate(currentDate.getDate() - 7);
            endDate = setDate(currentDate);
        } else if (filters.dateRange === 'month') {
            startDate = new Date();
            startDate.setMonth(currentDate.getMonth() - 1);
        } else if (filters.dateRange === 'year') {
            startDate = new Date();
            startDate.setFullYear(currentDate.getFullYear() - 1);
        } else if (filters.dateRange === 'custom') {
            startDate = new Date(filters.startDate);
            endDate = new Date(filters.endDate);
        } else {
            startDate = new Date(0); // For 'all' or any other unspecified ranges
        }

        console.log('Date range:', startDate, endDate); // Debugging: Log date range

        return data.filter(item => {
            const severityLevel = getSeverityClass(item.max_cvss_base_score);
            const severityMatch = filters.severity.length === 0 || filters.severity.includes(severityLevel);
            const itemDate = new Date(item.publish_date.substring(0, 10));
            const dateMatch = itemDate >= startDate && itemDate <= endDate;
            console.log('Item:', item); // Debugging: Log each item
            console.log('Severity match:', severityMatch, 'Date match:', dateMatch); // Debugging: Log match results
            return severityMatch && dateMatch;
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
    };

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data: filteredData,
            initialState,
        },
        useSortBy
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

    return (
        <Wrapper>
            <HeaderContainer>
                <div className="title">Find Out If You Have Vulnerabilities That Put You at Risk</div>
            </HeaderContainer>
            <ContentWrapper>
                <SidebarWrapper>
                    <FilterButton onClick={showSidebar} sidebar={sidebar}>
                        Filter Here
                    </FilterButton>
                    <Sidebar
                        sidebar={sidebar}
                        showSidebar={showSidebar}
                        handleFilterChange={handleFilterChange}
                        filters={filters}
                    />
                </SidebarWrapper>
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
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>
                                            {cell.column.id === 'cve_number' ? (
                                                <Link to={`/learn-more/${cell.cve_id}`}>{cell.render('Cell')}</Link>
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
            </ContentWrapper>
        </Wrapper>
    );
};

export default Table;