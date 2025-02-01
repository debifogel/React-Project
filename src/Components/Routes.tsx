import {  createBrowserRouter } from "react-router-dom"
import { AppLayot } from "./Applayot"
import  Login  from "./Login"
import  ListRecipe  from "./ListRecipe"
import { Home } from "./Home"
import Register from "./Register"
import AddRecipe from "./AddRecipe"
import { Recipe } from "./Recipe"

export const myRouter = createBrowserRouter([
    {
            path: '/',
            element: <AppLayot/>,
            errorElement: <>main error</>,
    children: 
    [
    { path:'/Login',element:<Login/>},
    {path:'/all-recipes',element:<ListRecipe/>,
        children: [{ path: `:id`, element: <Recipe/> }]
    },
    {path: '/home',element:<Home/>},
    {path: '/Register',element:<Register/>},
        {path:'/add-recipe',element:<AddRecipe/>}
    ]
    },
    ])