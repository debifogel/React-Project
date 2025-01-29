import { Avatar, Box, Button, Modal, TextField } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import {  FormEvent, useContext, useEffect, useRef, useState } from "react";
import { userCotext } from "../Types/User";
import { login } from "../Types/MobxStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
const Profil= observer(()=>{  
  const navigate = useNavigate();
const [userSite,DispachSiteUser]=useContext(userCotext)
const[toUpdate,setToUpdate]=useState(false)
const[letter,setLetter]=useState(' ')
const name = useRef<HTMLInputElement>(null);
const familyName = useRef<HTMLInputElement>();
const email = useRef<HTMLInputElement>();
const address = useRef<HTMLInputElement>(null);
const phone = useRef<HTMLInputElement>(null);
const password = useRef<HTMLInputElement>(null);
const styleInput={height:"30",width:"200",margin:"10px"}   
   const upDateDetails=()=>{setToUpdate(true)}
    const toserver=async()=>{
      try{
        if(!login)
          return;
        const res = await fetch('http://localhost:3000/api/user', {
        method: 'PUT',        
          headers: {
          'Content-Type': 'application/json',
          "user-id":JSON.stringify(userSite.id) }
          ,body: JSON.stringify(userSite)})            
          if(res.status==404){alert("sorry")
            navigate('/Login')}          
           if (!res.ok) { throw new Error(`fetch error ${res.status}`) }
           setLetter(userSite.name)               
        }       
      catch(e) {console.log(e);}}
    const handleSubmit=(e: FormEvent)=>{
      e.preventDefault()
      setToUpdate(false)
       DispachSiteUser({
        type: "UPDATE", field: {          
          name: name.current?.value||userSite.name,
          familyname: familyName.current?.value||userSite.familyname,
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
  <Button onClick={upDateDetails} sx={{borderRadius:"30px", height:"55px"}}> 
  <Avatar sx={{ bgcolor: deepPurple[500] }}>{letter[0]}</Avatar>
  </Button>
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


