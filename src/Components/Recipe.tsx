import { useParams } from "react-router-dom";
import { Mrecipes } from "../Types/MobxStore";
import { observer } from "mobx-react-lite";
export const Recipe = observer(() => {
    const { id } = useParams();
    console.log("id",id);
    const recipe=Mrecipes.list.find(r=>(r.id??0).toString()===id)
    return(<>
    <div style={{position:"fixed" ,right:"30vw", bottom:"30vh"}}>
    <h1 style={{  color:'blue'}}> {recipe?.title}</h1>   
    <p>{recipe?.description}</p>
    </div>
    </>)})