import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import MOCK_DATA from '../Table/MockData.json'
import { COLUMNS } from './columns'
import './BasicTable.css';

export const BasicTable = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div>
            <table {...getTableProps}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))
                            }
                            <th></th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps}>
                    {
                        rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        rows.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        })}
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BasicTable;