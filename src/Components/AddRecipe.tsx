import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@mui/material';
import { Mrecipes } from '../Types/MobxStore';
import { userCotext } from '../Types/User';
const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(10, 'Title must be at least 10 characters long')
        .required('Title is required'),
    description: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Description must contain only alpha characters')
        .min(30, 'Description must be at least 30 characters long')
        .required('Description is required'),
});
interface FormData {
    title: string;
    description: string;
}
const AddRecipe: React.FC = () => {
    const [userSite] = useContext(userCotext); // <- Correct usage here
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });
    const onSubmit = (data: FormData) => {
        try {
            Mrecipes.AddRecipe({
                title: data.title, description: data.description,
                authorId: userSite.id ?? 0
            }, userSite.id ?? 0);
        } catch (error) {console.log(error);}
        
        
    };
    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Title"
                    {...register('title')}
                    error={!!errors.title}
                    helperText={errors.title ? errors.title.message : ''}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Description"
                    {...register('description')}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                />
                <Button color="primary" variant="contained" fullWidth type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default AddRecipe;