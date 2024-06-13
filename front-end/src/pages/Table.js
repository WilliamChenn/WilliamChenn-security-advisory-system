import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import { COLUMNS } from './TableColumns';
import './Table.css';
import Sidebar from '../components/Sidebar'; // Corrected import path
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* Ensure the wrapper takes the full width */
`;

const HeaderContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: #f8f8f8;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row; /* Align items horizontally */
  width: 100%; /* Ensure the content wrapper takes the full width */
  align-items: flex-start; /* Align items to the top */
`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px; /* Adjust width of the sidebar */
`;

const FilterButton = styled.button`
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 10px 24px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 10px;
  align-self: flex-start; /* Align button to the start of the container */
`;


const Table = () => {
    const [data, setData] = useState([]);
    const [sidebar, setSidebar] = useState(false);
    const [filters, setFilters] = useState({
        severity: 'all',
        dateRange: 'month',
        startDate: '',
        endDate: '',
    });

    useEffect(() => {
        // Fetch JSON data from the API
        const fetchData = async () => {
            let url = `http://localhost:3001/api/v1/cves/recent?time_range=${filters.dateRange}`;
            if (filters.dateRange === 'custom') {
                url += `&start_date=${filters.startDate}&end_date=${filters.endDate}`;
            }
            const response = await fetch(url);
            const parsedData = await response.json();
            setData(parsedData);
        };
        fetchData();
    }, [filters]); // Re-fetch data when filters change

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
            data,
            initialState,
        },
        useSortBy
    );

    const showSidebar = () => setSidebar(!sidebar);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
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
