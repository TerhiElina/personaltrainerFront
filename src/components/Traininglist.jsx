import {useState, useEffect} from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import { format } from 'date-fns';

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
        {field: 'customer.lastname', headerName: 'sukunimi',sortable: true, filter: true, width: 150 }
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
    return (
        <div className="ag-theme-material" style= {{ width: '80%', height: 500}} >
            <AgGridReact
                rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
    )
}