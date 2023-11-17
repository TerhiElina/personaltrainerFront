import {useState, useEffect} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

export default function Customerlist (){
    const [columnDefs] = useState([
        {field: 'firstname',headerName: 'Etunimi',  sortable: true, filter: true },
        {field: 'lastname', headerName: 'Sukunimi', sortable: true, filter: true },
        {field: 'streetaddress', headerName: 'Katuosoite',  sortable: true, filter: true },
        {field: 'postcode', headerName: 'Postikoodi', sortable: true, filter: true, width: 150 },
        {field: 'city', headerName: 'Kaupunki', sortable: true, filter: true, width: 150 },
        {field: 'email', headerName: 'Sähköposti',  sortable: true, filter: true, width: 150 },
        {field: 'phone', headerName: 'Puhelinnumero', sortable: true, filter: true, width: 160 },
        {cellRenderer: params => ( <EditCustomer fetchData={fetchData} data={params.data}
        updateCustomer={updateCustomer} />),width: 120 },
        {cellRenderer: params => <Button size = 'small' onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>,
        width: 120}
        
    ]);
    const [customers, setCustomers] = useState([]);
    useEffect(() => fetchData(), []);
    const fetchData = () =>{
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure")) {
        fetch(url, { method: 'DELETE' })
        .then(response => {
            if (response.ok)
            fetchData();
            else
                throw new Error('Error in DELETE' + response.statusText);
        })
        .catch(err => console.error(err))
    }
    }
    const saveCustomer =(customer) =>{
        fetch('http://traineeapp.azurewebsites.net/api/customers', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch (err => console.error(err))
    }
    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err));
    };
    return (
        <div>
        <AddCustomer saveCustomer={saveCustomer}/>
        <div className="ag-theme-material" style= {{ width: '80%', height: 500}} >
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
        </div>
    )
}