
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
        
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{ my: 2, color: 'white', display: 'block' }}
            
          >
            <nav>
          <Link to={"/"}>Harjoitukset </Link>
          <Link to={"/customers"}>Asiakkaat </Link>
          </nav>
          </Typography> 
    </Toolbar>
    </AppBar>
    <Outlet />
    
      </Container>
   
   
  
  )
}
export default App
