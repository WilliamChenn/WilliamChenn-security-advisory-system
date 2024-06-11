import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';
import { COLUMNS } from './TableColumns';
import Tooltip from '@mui/material/Tooltip';
import './Table.css';

const Table = () => {
    const [data, setData] = useState([]);

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

    return (
        <div>
            <header className="Vulnerabilities-header">
                <div className="title">Find Out If You Have Vulnerabilities That Put You at Risk</div>
            </header>
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
                                            <Link to={`/cve/${cell.value}`}>{cell.render('Cell')}</Link>
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
        </div>
    );
};

export default Table;
