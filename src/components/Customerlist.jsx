import {useState, useEffect} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";

export default function Customerlist (){
    const [columnDefs] = useState([
        {field: 'firstname',headerName: 'Etunimi',  sortable: true, filter: true },
        {field: 'lastname', headerName: 'Sukunimi', sortable: true, filter: true },
        {field: 'streetaddress', headerName: 'Katuosoite',  sortable: true, filter: true },
        {field: 'postcode', headerName: 'Postikoodi', sortable: true, filter: true, width: 150 },
        {field: 'city', headerName: 'Kaupunki', sortable: true, filter: true, width: 150 },
        {field: 'email', headerName: 'Sähköposti',  sortable: true, filter: true, width: 150 },
        {field: 'phone', headerName: 'Puhelinnumero', sortable: true, filter: true, width: 160 }
        
    ]);
    const [customers, setCustomers] = useState([]);
    useEffect(() => fetchData(), []);
    const fetchData = () =>{
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
    return (
        <div className="ag-theme-material" style= {{ width: '80%', height: 500}} >
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
    )
}