import { Link, Outlet } from "react-router"
import { observer } from "mobx-react-lite";
import { Mrecipes } from "../Types/MobxStore";

 const ListRecipe = observer(() => {    
    return(<>   
    <nav style={{width:"200px", position:"fixed",right:"100px"}}>  
{  Mrecipes.list.map((recipe) => (
        <Link key={recipe.id} to={(recipe.id??0).toString()} style={{display:'block',padding:'10px'}}>{recipe.title}</Link>
    ))} 
    </nav>  
    <Outlet/>
    </>)})
export default ListRecipe;