
import {Link, Outlet} from  'react-router-dom';
//import './App.css'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function App() {

  return (
      <Container maxWidth ="xl">
      <AppBar position='static'>
      <Toolbar>
        
       
            <nav style={{ display: 'flex', gap: '20px' }}>
          <Link to={"/"} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Harjoitukset
            </Typography>
          </Link>
          <Link to={"/customers"} style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Asiakkaat
            </Typography></Link>
          <Link to={"/Calendar"} style={{ textDecoration: 'none', color: 'white' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Kalenteri
          </Typography></Link>
          </nav>
         
    </Toolbar>
    </AppBar>
    <Outlet />
    
      </Container>
   
   
  
  )
}
export default App
