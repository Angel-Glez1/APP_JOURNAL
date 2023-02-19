import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { AuthLayout } from '../layouts/AuthLayout';
import { useForm } from '../../hooks';

const formData = {
    email: '',
    password: ''
}


export const LoginPage = () => {

    const dispatch = useDispatch();
    const { status, errorMessage } = useSelector(state => state.auth);
    const { email, password, onInputChange } = useForm(formData);
    const isAuthenticating = useMemo(() => status === 'checking', [status]);


    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }))
    }


    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn({ email, password }))
    }


    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit}>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder='correo@gmail.com'
                            fullWidth
                            name='email'
                            value={email}
                            onChange={onInputChange}
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

                    <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={isAuthenticating} type='submit' variant='contained' fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={isAuthenticating} onClick={onGoogleSignIn} variant='contained' fullWidth>
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>

                    </Grid>

                    <Grid container direction='row' justifyContent='end' >
                        <Link component={RouterLink} color='inherit' to='/auth/register'>
                            Crear Una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    )
}
