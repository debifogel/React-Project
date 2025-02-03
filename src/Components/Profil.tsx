import { Avatar, Box, Button, Modal, TextField } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import {  FormEvent, useContext, useEffect, useRef, useState } from "react";
import { UserCotext } from "../Types/User";
import { login } from "../Types/MobxStore";
import { observer } from "mobx-react-lite";
const Profil= observer(()=>{  
const [userSite,DispachSiteUser]=useContext(UserCotext)
const[toUpdate,setToUpdate]=useState(false)
const[letter,setLetter]=useState(' ')
const name = useRef<HTMLInputElement>(null);
const familyName = useRef<HTMLInputElement>(null);
const email = useRef<HTMLInputElement>(null);
const address = useRef<HTMLInputElement>(null);
const phone = useRef<HTMLInputElement>(null);
const password = useRef<HTMLInputElement>(null);
const styleInput={height:"30",width:"200",margin:"10px"}   
   const upDateDetails=()=>{setToUpdate(true)}
    const toserver=async()=>{
      try{
        if(!login)
          return;
        const res = await fetch('http://localhost:3000/api/user',{
        method: 'PUT',        
          headers: {
          'Content-Type': 'application/json',
          "user-id":JSON.stringify(userSite.id) }
          ,body: JSON.stringify(userSite)})            
           if(res.status==404){alert("sorry you dont login")}
           if (!res.ok) { throw new Error(`fetch error ${res.status}`) }
           setLetter(userSite.firstName)               
        }       
      catch(e) {console.log(e);}}
    const handleSubmit=(e: FormEvent)=>{
      e.preventDefault()
      setToUpdate(false)
       DispachSiteUser({
        type: "UPDATE", field: {          
          firstName: name.current?.value||userSite.firstName,
          lastName: familyName.current?.value||userSite.lastName,
          address: address.current?.value||userSite.address,
          email: email.current?.value||userSite.email,
          password: password.current?.value||userSite.password,
          phone: phone.current?.value||userSite.phone
        }})      
      }
    useEffect(() => {
      if(!userSite.id||userSite.id===0){return}
      toserver()
    },[userSite])
return (<>  
  {!login.login&&<Avatar/>}
{login.login&&
  <Button onClick={upDateDetails} sx={{borderRadius:"30px", height:"55px"}}> 
  <Avatar sx={{ bgcolor: deepPurple[500] }}>{(letter??' ')[0]}</Avatar>
  </Button>}
  <Modal open={toUpdate} sx={{  width: "300",position:"fixed",left:"300px"}}>
  <Box >
<form onSubmit={handleSubmit} >
<TextField label='name' id="_name" inputRef={name} sx={styleInput}/>
<TextField label='familyname' id="_familyname" inputRef={familyName}sx={styleInput}/>
<TextField type="email" label="email" id="_email" inputRef={email}sx={styleInput}/>
<TextField label='password' id="_password" inputRef={password}sx={styleInput}/>
<TextField label='adress' id="_adress" inputRef={address}sx={styleInput}/>
<TextField label='phone' id="_phone" inputRef={phone}sx={styleInput}/>
<button type="submit">UPDATE</button>
</form>        
  </Box>   
   </Modal>     
      </>)
})
export default Profil


