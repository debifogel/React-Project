import {  makeAutoObservable, } from "mobx"
import { Recipe } from "./Recipe";
class Recipes {
    list:Recipe [] = []
    taskCounter = 0
     constructor() {
        makeAutoObservable(this)
        this.fetchRecipes()
    }
    fetchRecipes = async () => {
        const response = await fetch('http://localhost:3000/api/recipes', {
            method: 'GET',
        });    
        if (!response.ok) {
            throw new Error(`Error fetching recipes: ${response.status}`);
        }   
        this.list=await await response.json();
    };
    AddRecipe = async (r:Recipe,id:number) => {
        const response = await fetch('http://localhost:3000/api/recipes', {
            headers:{ "user-id":JSON.stringify( id)},
            method: 'POST',
            body:JSON.stringify({r})
        })    
        if (!response.ok) {
            throw new Error(`Error fetching recipes: ${response.status}`);
        }
        this.fetchRecipes()
         
    };
        
}
class Login{
     login = false
    constructor(){
        makeAutoObservable(this)
    }
    ToLogin(){this.login=!this.login}
}
const Mrecipes = new Recipes();
let login = new Login();

export { Mrecipes, login };


