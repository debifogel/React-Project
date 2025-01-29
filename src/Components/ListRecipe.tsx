import { Link, Outlet } from "react-router"
import { observer } from "mobx-react-lite";
import { Mrecipes } from "../Types/MobxStore";

 const ListRecipe = observer(() => {    
    const recipes: { id: number; title: string,description:string }[] = Mrecipes.list
    return(<>   
    <nav style={{width:"200px", position:"fixed",right:"100px"}}>  
{  recipes.map((recipe) => (
        <Link key={recipe.id} to={recipe.id.toString()} style={{display:'block',padding:'10px'}}>{recipe.title}</Link>
    ))} 
    </nav>  
    <Outlet/>
    </>)})
export default ListRecipe;