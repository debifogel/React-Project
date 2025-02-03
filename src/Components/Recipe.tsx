import { useParams } from "react-router-dom";
import { Mrecipes } from "../Types/MobxStore";
import { observer } from "mobx-react-lite";
export const Recipe = observer(() => {
    const { id } = useParams();
    const recipe=Mrecipes.list.find(r=>(r.id??0).toString()===id)
    return(<>
    <div style={{position:"fixed" ,right:"30vw", bottom:"10vh"}}>
    <h2 style={{  color:'blue'}}> {recipe?.title}</h2>   
    <h3>{recipe?.description}</h3>
<div style={{height:"150px",width:"800px" , display:"flex", flexFlow:"column wrap"}}>
    {recipe?.ingredients.map(r=><h6 style={{width:"140px", height:"20px"}}>{r}</h6>)
    }
</div>
    <p>{recipe?.instructions}</p>
    </div>
    </>)})