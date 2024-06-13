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
`;

const HeaderContainer = styled.div`
  padding: 20px;
  text-align: center;
  background: #f8f8f8;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start; /* Align items at the start of the flex container */
`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px; /* Width of the sidebar */
`;

const FilterButton = styled.button`
  background-color: #4CAF50; /* Green */
  color: white;
  padding: 10px 24px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: ${({ sidebar }) => (sidebar ? "none" : "block")};
  margin-bottom: 10px;
`;

const TableContainer = styled.div`
  flex: 1; /* This ensures the table container takes up the remaining space */
  padding: 20px;
  margin-right: 250px; /* Ensure the table content is centered */
`;

const Table = () => {
    const [data, setData] = useState([]);
    const [sidebar, setSidebar] = useState(false);

    useEffect(() => {
        // Fetch JSON data from the API
        fetch('http://localhost:3001/api/v1/cves/recent?time_range=month')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(parsedData => {
                console.log("Fetched Data:", parsedData); // Debugging: Check fetched data
                setData(parsedData); // Set the fetched data to state
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []); // Empty dependency array means this useEffect runs once after initial render

    const columns = useMemo(() => COLUMNS, []);

    const initialState = {
        sortBy: [
            {
                id: 'max_cvss_base_score',
                desc: true
            }
        ]
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        initialState,
    },
        useSortBy
    );

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <Wrapper>
            <HeaderContainer>
                <div className="title">Find Out If You Have Vulnerabilities That Put You at Risk</div>
            </HeaderContainer>
            <ContentWrapper>
                <SidebarWrapper>
                    <Sidebar sidebar={sidebar} />
                </SidebarWrapper>
                <TableContainer>
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
                </TableContainer>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Table;
