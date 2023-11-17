import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer (props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname:'', lastname:'', streetaddress:'', postcode:'', city:'', email:'', phone:''
    });

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleInputChange = (event) => {
        setCustomer({...customer,[event.target.name]: event.target.value})
    }
    const addCustomer =() =>{
        props.saveCustomer(customer);
        handleClose();
    } 
    return(
        <React.Fragment>
      <Button style={{margin:20}} variant="outlined" onClick={handleClickOpen}>
        Lisää asiakas
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi asiakas</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name= "firstname"
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            label="Etunimi"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "lastname"
            value={customer.lastname}
            onChange={e=> handleInputChange(e)}
            label="Sukunimi"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "streetaddress"
            value={customer.streetaddress}
            onChange={e=> handleInputChange(e)}
            label="Katuosoite"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "postcode"
            value={customer.postcode}
            onChange={e=> handleInputChange(e)}
            label="Postinumero"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "city"
            value={customer.city}
            onChange={e=> handleInputChange(e)}
            label="Kaupunki"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "email"
            value={customer.email}
            onChange={e=> handleInputChange(e)}
            label="Sähköposti"
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "phone"
            value={customer.phone}
            onChange={e=> handleInputChange(e)}
            label="Puhelinnumero"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={addCustomer}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}