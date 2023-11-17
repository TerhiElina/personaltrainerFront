import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from "moment";

export default function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: '', duration: '', activity: '', firstname: '', lastname: ''
    });
    const [formattedDate, setFormattedDate] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'date') {
            setFormattedDate(value);
        } else {
            setTraining({ ...training, [name]: value });
        }
    };

    const addTraining = () => {
        if (formattedDate.trim() !== '') {
            const parsedDate = moment(formattedDate, 'DD.MM.YYYY HH:mm');
            if (parsedDate.isValid()) {
                const isoDate = parsedDate.toISOString();
                setTraining({ ...training, date: isoDate });
            } else {
                // Handle invalid date input
                console.error('Invalid date format');
                return;
            }
        } else {
            // If the input date is empty, set it to an empty string in the state
            setTraining({ ...training, date: '' });
        }

        props.saveTraining(training);
        handleClose();
    }

    return (
        <React.Fragment>
            <Button style={{ margin: 20 }} variant="outlined" onClick={handleClickOpen}>
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
                        onChange={e => handleInputChange(e)}
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
                    <TextField
                        margin="dense"
                        name="firstname"
                        value={training.firstname}
                        onChange={e => handleInputChange(e)}
                        label="Etunimi"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={training.lastname}
                        onChange={e => handleInputChange(e)}
                        label="Sukunimi"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Peruuta</Button>
                    <Button onClick={addTraining}>Tallenna</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
