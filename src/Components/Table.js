import { useMemo } from "react";
import { useSortBy, useTable } from "react-table";
import { useCookies } from "react-cookie"
import { COLUMNS } from "./columns"

export default function Table (props){
    // import columns title from file
    const columnsTitle = useMemo(()=> COLUMNS, []);

    // create cookies for safe sorting data
    const [cookies, setCookies, removeCookies] = useCookies(["column", "desc"]);
    let desc = (cookies.desc == 0) ? false : true;

    const initialState = {
        sortBy:[
            {
                id: cookies.column,
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
                                        desc = column.isSortedDesc ? '1' : '0';
                                    }
                                    if (id==="") {
                                        removeCookies()
                                    }else {
                                        setCookies("column", id);
                                        setCookies("desc", desc)
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