import { Link, Outlet, useLocation } from "react-router-dom"
import { NavBar } from "./NavBar"
import { Grid2 as Grid } from "@mui/material"
import { Home } from "./Home"
import Profil from "./Profil"
import { login } from "../Types/MobxStore"
export const AppLayot=()=> {
    const location = useLocation();
  return (
    <>    
  <Grid container  spacing={10} sx={{ flexGrow: 1, position:"fixed",top:15,left:20}}>
      {!login.login &&<Link to='/Login'> login</Link>   }
      {!login.login &&<Link to='/Register'> Register</Link>   }    
      <Profil/>
  <Grid size={{ xs: 4, md: 'auto' }} offset={{ xs: 4, md: 0 }}sx={{position:"fixed",top:35,right:30}}>
  <Outlet />
  <NavBar/>
  </Grid>
  <Grid size={{ xs: 'grow', md: 6 }} offset={{ md: 2 }} sx={{position:"fixed",top:"50vh",right:"50vw"}}>
  {location.pathname === '/' && <Home />} 
  </Grid>
</Grid>   
   </>
  )
}
  
