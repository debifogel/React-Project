import {  createBrowserRouter } from "react-router-dom"
import { AppLayot } from "./Applayot"
import  Login  from "./Login"
import  ListRecipe  from "./ListRecipe"
import { Home } from "./Home"
import Register from "./Register"
import { Recipte } from "./Recipte"
import AddRecipe from "./AddRecipe"

export const myRouter = createBrowserRouter([
    {
            path: '/',
            element: <AppLayot/>,
            errorElement: <>main error</>,
    children: 
    [
    { path:'/Login',element:<Login/>},
    {path:'/all-recipes',element:<ListRecipe/>,
        children: [{ path: `:id`, element: <Recipte/> }]
    },
    {path: '/home',element:<Home/>},
    {path: '/Register',element:<Register/>},
        {path:'/add-recipe',element:<AddRecipe/>}
    ]
    },
    ])