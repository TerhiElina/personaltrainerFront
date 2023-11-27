import {useState, useEffect} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { format } from 'date-fns';
import { Button } from "@mui/material";


export default function Traininglist (){

    const formatDate = (params) => {
        // Assuming 'date' is a property in your data
        const originalDate = new Date(params.data.date);
        const formattedDate = format(originalDate, 'dd.MM.yyyy HH:mm');
        return formattedDate;};

    const [columnDefs] = useState([
        {field: 'date', headerName: 'Aika', sortable: true, filter: true, valueFormatter: formatDate},
        {field: 'activity', headerName: 'Aktiviteetti', sortable: true, filter: true },
        {field: 'duration', headerName: 'Kesto', sortable: true, filter: true },
        {field: 'customer.firstname', headerName: 'etunimi',sortable: true, filter: true, width: 150 },
        {field: 'customer.lastname', headerName: 'sukunimi',sortable: true, filter: true, width: 150 },
        {cellRenderer: params => <Button size='small' onClick={() => deleteTraining(params.data.id)}>Delete</Button>,
 width: 120}
        ]);
    
    const [trainings, setTrainings] = useState([]);
    useEffect(() => fetchData(), []);
    const fetchData = () =>{
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => {
            console.log('Data from API:', data);
            setTrainings(data)})
    }

    const saveTraining = (training) => {
        training.customer = "https://localhost:8080/api/customers/2";
      
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(training),
        })
          .then(res => fetchData())
          .catch(err => console.error(err))
          .then(res => {
            console.log('Save successful');
            return res.json();
          })
          .then(data => {
            console.log('Response data:', data);
            fetchData();
          })
          .catch(err => console.error('Save error:', err));
      };
    const updateTraining = (training, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(res => fetchData())
        .catch(err => console.error(err));
    };
    const deleteTraining = (id) => {
        const url = `http://traineeapp.azurewebsites.net/api/trainings/${id}`;
    
        console.log('url:', url);
        if (window.confirm("Are you sure")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok)
                        fetchData(); // Use the default endpoint after delete
                    else
                        throw new Error('Error in DELETE' + response.statusText);
                })
                .catch(err => console.error(err));
        }
    };
    return (
        <div>
        <div className="ag-theme-material" style= {{ width: '80%', height: 500}} >
            <AgGridReact
                rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
        </div>
    )
}