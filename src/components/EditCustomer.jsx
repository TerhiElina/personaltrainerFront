import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Customerlist from "./Customerlist";

export default function EditCustomer ({fetchData, data, updateCustomer}) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname:'', lastname:'', streetaddress:'', postcode:'', city:'', email:'', phone:''
    });

    const handleClickOpen = () => {
    setOpen(true);
    setCustomer({
      firstname: data.firstname,
      lastname: data.lastname,
      streetaddress: data.streetaddress,
      postcode: data.postcode,
      city: data.city,
      email: data.email,
      phone: data.phone,
    });
    console.log(data);
    };

    const handleClose = () => {
    setOpen(false);
    };
    const handleInputChange = (event) => {
      setCustomer({ ...customer, [event.target.name]: event.target.value });
    };
    const updateCustomerHandler = () => {
      updateCustomer(customer, data.links[0].href);
      handleClose();
  };

    return(
        <React.Fragment>
      <Button onClick={handleClickOpen}>
        Muokkaa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Muokkaa tietoja</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name= "firstname"
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "lastname"
            value={customer.lastname}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "streetaddress"
            value={customer.streetaddress}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "postcode"
            value={customer.postcode}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "city"
            value={customer.city}
            onChange={e=> handleInputChange(e)}

            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "email"
            value={customer.email}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
           <TextField
            margin="dense"
            name= "phone"
            value={customer.phone}
            onChange={e=> handleInputChange(e)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={updateCustomerHandler}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    );
}