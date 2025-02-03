import { Link } from "react-router-dom"
import { Link as MuiLink } from "@mui/material"
import { login } from "../Types/MobxStore";
export const NavBar=()=>{
    const styleLink= {
        marginRight: '10px',
        color: '#1976d2',
        fontWeight: 'bold',
        textDecoration: 'none',
        padding: '5px',
    };
    return(<>
    <nav style={{position:"fixed",padding:"2px",top:5,right:"10vw"}}>
    <MuiLink component={Link} to="/" style={styleLink}underline="hover">home</MuiLink>
    <MuiLink component={Link} to="/all-recipes" style={styleLink}underline="hover">Recipes</MuiLink>
    {login.login&&<MuiLink component={Link} to="/add-recipe" style={styleLink}underline="hover">add recipe</MuiLink>}
    </nav>
    </>)
}
