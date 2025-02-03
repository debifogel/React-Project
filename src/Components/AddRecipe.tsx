import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Container } from '@mui/material';
import { Mrecipes } from '../Types/MobxStore';
import { UserCotext } from '../Types/User';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    title: Yup.string()
        .min(10, 'Title must be at least 10 characters long')
        .required('Title is required'),
    description: Yup.string()
        .matches(/^[a-zA-Z\s]*$/, 'Description must contain only alpha characters')
        .min(10, 'Description must be at least 10 characters long')
        .required('Description is required'),
    instructions: Yup.string()
        .min(5, 'Instructions must be at least 5 characters long')
        .required('Instructions are required'),
    ingredients: Yup.array().of(
        Yup.string().required("Ingredient is required")
    ).required('At least one ingredient is required')  // Ensure at least one ingredient
});
interface FormData {
    title: string;
    description: string;
    ingredients: string[];
    instructions: string;
}
const AddRecipe: React.FC = () => {
    const navig=useNavigate();
    const [userSite] = useContext(UserCotext);
    const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });
    const { fields, append } = useFieldArray({
        control,
        name: 'ingredients'
    });
    const onSubmit = (data: FormData) => {
        try {
            Mrecipes.AddRecipe({
                title: data.title, 
                description: data.description,
                authorId: userSite.id?.toString() ?? "0",
                ingredients: data.ingredients,
                instructions: data.instructions
            }, userSite.id ?? 0);
        } catch (error) {
            console.log(error);
        }
        navig('/all-recipes');
    };
    const AddIngredient = () => {append(''); };
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
                <TextField
                    fullWidth
                    margin="normal"
                    label="Instructions"
                    {...register('instructions')}
                    error={!!errors.instructions}
                    helperText={errors.instructions ? errors.instructions.message : ''}
                />
                {fields.map((field, index) => (
                    <TextField
                        key={field.id}
                        fullWidth
                        margin="normal"
                        label={`Ingredient #${index + 1}`}
                        {...register(`ingredients.${index}`)} // Register each ingredient
                        error={!!errors.ingredients?.[index]} // Check for errors in the current ingredient
                        helperText={errors.ingredients?.[index] ? errors.ingredients[index].message : ''}
                />
                ))}
                <Button onClick={AddIngredient} type="button">+ add ingredient</Button>
                <Button color="primary" variant="contained" fullWidth type="submit">Submit</Button>
            </form>
        </Container>
    );
};
export default AddRecipe;