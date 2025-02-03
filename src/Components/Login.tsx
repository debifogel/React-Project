import {    TextField  } from "@mui/material"
import {  FormEvent,useContext, useRef } from "react"
import { UserCotext } from "../Types/User"
import { observer } from "mobx-react-lite"
import { login } from "../Types/MobxStore"
import { useNavigate } from "react-router-dom"
const Login=observer(()=>{
  const navigate = useNavigate();
  const [,DispachSiteUser]=useContext(UserCotext)
  const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
 //let  [password,setpassword]=useState("")
const handleSubmit=async (e: FormEvent)=>
{
  e.preventDefault()  
  login.ToLogin()
  try {
       const res= await fetch('http://localhost:3000/api/user/login',
        {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              password: passwordRef.current?.value || "",
              email: emailRef.current?.value || ""
            })
          }
        )
        const data = await res.json()
        console.log('Response Data:', data); // Log the response data

        if (res.status === 401) { 
          alert('מייל  או סיסמא לא נכונים') 
          login.ToLogin()        
        }
        else if (!res.ok) {
             throw new Error(`fetch error ${res.status}`) 
        }
        DispachSiteUser({type:"POST",field:data.user})
        console.log(data.user);                      
      }
      catch(e)
      {
        login.ToLogin()        
      }
      finally{
        navigate('/home')
      }
}

    return(<>      
    <form onSubmit={handleSubmit}>
    <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
    <TextField label='userPassword' variant="filled" margin="normal" fullWidth inputRef={passwordRef} required />
   <button type="submit">Login</button>
   </form>  
  </>
  )
})
export default Login


