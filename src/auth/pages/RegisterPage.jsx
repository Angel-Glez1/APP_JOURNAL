import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'Ingresa un correo valido.'],
    password: [(value) => value.length >= 6, 'El password debe tener mas de 3 letras'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}


export const RegisterPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);
    const [formSubitted, setFormSubitted] = useState(false);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])
    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);


    const onSubmit = e => {
        e.preventDefault();
        setFormSubitted(true);

        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmailPassword({
            ...formState
        }));
    }


    return (
        <AuthLayout title='Register'>
            <form onSubmit={onSubmit} >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre completo'
                            type='text'
                            placeholder='john doun'
                            fullWidth
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && formSubitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@gmail.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && formSubitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='contraseña'
                            fullWidth
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && formSubitted}
                            helperText={passwordValid}
                        />
                    </Grid>


                    <Grid
                        item
                        xs={12}
                        sx={{ mt: 2, mb: 2 }}
                        display={!!errorMessage ? '' : 'none'}
                    >
                        <Alert severity='error'>
                            {errorMessage}
                        </Alert>
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                        <Button disabled={isCheckingAuthentication} type='submit' variant='contained' fullWidth>
                            Crear Cuenta
                        </Button>
                    </Grid>

                    <Grid container direction='row' justifyContent='end' >
                        <Typography sx={{ mr: 1 }}>¿Tienes una cuenta? </Typography>
                        <Link component={RouterLink} color='inherit' to='/auth/login'>
                            Inicia Sesión
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
