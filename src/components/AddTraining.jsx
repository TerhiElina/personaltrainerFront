import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from "moment";

export default function AddTraining(props) {
    const { saveTraining, fetchData, customerUrl } = props;
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: customerUrl
    });
    const [formattedDate, setFormattedDate] = useState('');

    const handleClickOpen = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'date') {
        setFormattedDate(value);

        setTraining({ ...training, date: value });
    } else {
        setTraining({ ...training, [name]: value });
    }
};
const handleInputDate = (date) => {
    setFormattedDate(date);

};

    const addTraining = (url, event) => {
        event.preventDefault();
        if (formattedDate.trim() !== '') {
            console.log('Formatted Date:', formattedDate);
            const parsedDate = moment(formattedDate, 'DD.MM.YYYY HH:mm');
            console.log('Parsed Date:', parsedDate.format());
            if (parsedDate.isValid()) {
                const isoDate = parsedDate.utc().toISOString();
                console.log('ISO Date:', isoDate);
                setTraining({ ...training, date: isoDate });
            } else {
                console.error('Invalid date format');
                return;
            }
        } else {
            setTraining({ ...training, date: '' });
        }
       

    
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(training),
        })
            .then(response => {
                if (response.ok) {
                    fetchData(); 
                    console.log('Save successful');
                    return response.json();
                } else {
                    throw new Error('Error in POST: ' + response.statusText);
                }
            })
            .then(data => {
                console.log('Response data:', data);
                props.saveTraining(training);
                handleClose();
            })
            .catch(err => {
                console.error('Save error:', err);
            });
            /*props.saveTraining(training);
        handleClose();*/
    };
    

    return (
        <React.Fragment>
            <Button size = 'small'  onClick={(event) => handleClickOpen(event)}>
                Lisää treeni
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Lisää treeni</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="date"
                        value={formattedDate}
                        onChange={e => handleInputDate(e.target.value)}
                        label="Päivä"
                        fullWidth
                        variant="standard"
                        placeholder="dd.mm.yyyy hh:mm"
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label="Kesto"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label="Aktiviteetti"
                        fullWidth
                        variant="standard"
                    />
                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Peruuta</Button>
                    <Button onClick={(event) => addTraining(customerUrl, event)}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
