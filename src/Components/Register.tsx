import { Box, Button, Modal, TextField } from "@mui/material"
import { createContext, FormEvent, useContext, useRef } from "react";
import axios from "axios";
import { userCotext } from "../Types/User";
import { useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite";
import { login } from "../Types/MobxStore";

export const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};
export const UserIdContext = createContext<number>(-1);

export default observer(() => {
    const navigate = useNavigate();

  const [,DispachSiteUser]=useContext(userCotext)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        login.ToLogin()

        try {

            const res = await axios.post(`http://localhost:3000/api/user/register`, 
            {
                email: emailRef.current!.value,
                password: passwordRef.current!.value
            });
            
                DispachSiteUser({
                type: "POST",
                field: res.data.user,
            });
        } catch (e: any) {
            if (e.status === 400 ) {
                alert('user already sign up');
            }
            login.ToLogin()


        } finally {
            emailRef.current!.value = ''
            passwordRef.current!.value = ''
            navigate('/home')
        }
    };

    return (<>

        <Modal open={true} >
            <Box sx={styleModal}>
                <form onSubmit={handleSubmit}>
                    <TextField label='userEmail' variant="filled" margin="normal" type="email" fullWidth inputRef={emailRef} required />
                    <TextField label='userPassword' variant="filled" margin="normal" fullWidth inputRef={passwordRef} required />
                    <Button sx={{ marginTop: '2px' }} color="info" fullWidth variant="contained" type="submit">התחברות</Button>
                </form>
            </Box>
        </Modal> 
    </>)
})