import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layouts/AuthLayout';


export const RegisterPage = () => {
    return (
        <AuthLayout title='Register'>
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre completo'
                            type='text'
                            placeholder='john doun'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@gmail.com'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder='contraseña'
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                        <Button variant='contained' fullWidth> Crear Cuenta </Button>
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
