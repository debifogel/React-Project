import { createContext, Dispatch } from "react";

 type User={
    id?:number
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    address:string,
    phone:string
}
export type UserAction =
 { type:"POST"|"UPDATE"|"DELETE" ; field:User }
 export const initialState: User = {
    id:0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: ''
}; 

 function UserReducer(state:User,op:UserAction)
{
   switch (op.type) {
    case "POST":       
        return{...op.field}
        case "UPDATE": 
            console.log("update",op.field);
            
            return{...state,...op.field}    
        case "DELETE":
            return initialState
    default:
        return state
   }
}
export { UserReducer }
export type { User }
export const UserCotext = createContext<[User, Dispatch<UserAction>]>([{} as User, () => { }]);
