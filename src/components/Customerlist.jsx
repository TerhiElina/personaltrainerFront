import {useState, useEffect} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

export default function Customerlist (){
    const [columnDefs] = useState([
        {field: 'firstname',headerName: 'Etunimi',  sortable: true, filter: true },
        {field: 'lastname', headerName: 'Sukunimi', sortable: true, filter: true },
        {field: 'streetaddress', headerName: 'Katuosoite',  sortable: true, filter: true },
        {field: 'postcode', headerName: 'Postikoodi', sortable: true, filter: true, width: 150 },
        {field: 'city', headerName: 'Kaupunki', sortable: true, filter: true, width: 150 },
        {field: 'email', headerName: 'Sähköposti',  sortable: true, filter: true, width: 150 },
        {field: 'phone', headerName: 'Puhelinnumero', sortable: true, filter: true, width: 160 },
        {cellRenderer: params => (
             <AddTraining
                saveTraining={saveTraining}
                fetchData={fetchData}
                customerUrl={params.data.links[0].href} />
            ),
            width: 120
        },
        {cellRenderer: params => ( <EditCustomer fetchData={fetchData} data={params.data}
        updateCustomer={updateCustomer} />),width: 120 },
        {cellRenderer: params => <Button size = 'small' onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>,
        width: 120}
        
    ]);
    const [customers, setCustomers] = useState([]);
    //useEffect(() => fetchData(), []);
    const fetchData = () =>{
        fetch('http://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }
    useEffect(() => fetchData(), []);
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
        .then(response => fetchData())
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
        .then(response => fetchData())
        .catch(err => console.error(err));
    };
    const saveTraining = (training) => {
        // Modify the 'customer' property to hold the customer reference link
        console.log('Training object before fetch:', training);
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(training),
        })
        .catch(err => {
            console.error('Save error:', err);
            throw err; // Re-throw the error to propagate it to the next catch block
        })
          .then(response => fetchData())
          .catch(err => console.error(err))
          .then(response => {
            console.log('Save successful');
            return response.json();
          })
          .then(data => {
            console.log('Response data:', data);
            fetchData();
          })
          .catch(err => console.error('Save error:', err));
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