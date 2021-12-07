import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { COLUMNS } from "./columns"

export default function Table (props){
    // import columns title from file
    const columnsTitle = useMemo(()=> COLUMNS, []);

    // create cookies for safe sorting data
    
    let desc = (localStorage.getItem("column") == 0) ? false : true;
    

    const initialState = {
        sortBy:[
            {
                id: localStorage.getItem("column"),
                desc: desc
            }
        ]
    }

    const tableInstance = useTable({
        columns: columnsTitle,
        data: props.values,
        initialState
    }, useSortBy)

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow
    } = tableInstance;

    return (
        <table  {...getTableProps()} className="tableInfo">
            <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column, index) => {
                                    let id = "", desc="";
                                    if (column.isSorted) {
                                        id = column.id;
                                        desc = column.isSortedDesc ? '1' : '0'
                                    }
                                    if (id!=="") {
                                        localStorage.setItem("column", id);
                                        localStorage.setItem("desc", desc)
                                    }
                                    return (<th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                        {
                                            column.render('Header')
                                        }
                                    </th>)
                                })
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map( row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {   
                                    
                                    row.cells.map( cell => {
                                        return <td {...cell.getCellProps({className:cell.column.className})}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>    
    );
}