import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';


export const RegisterScreen = () => {

	const dispatch = useDispatch();
	const { msError } = useSelector(state => state.ui); // Obtener informacion de mi state.


	// Hooks para leer formularios.
	const [formValues, handleInputChange] = useForm({ name: 'angel', email: 'test@hotmail.com', password: '123456', password2: '123456' });
	const { name, email, password, password2 } = formValues;

	// This function register a new user in firebase.
	const handleRegister = (e) => {
		e.preventDefault();

		if ( isFormValid() ) {
			
			dispatch( startRegisterWithEmailPasswordName(email, password, name) );
		}

	}

	// This function valited the camps the form.
	const isFormValid = () => {

		if (name.trim().length === 0) {

			dispatch(setError('Name is required'));
			return false;

		} else if (!validator.isEmail(email)) {


			dispatch(setError('Email is not valid'));
			return false;


		} else if (password !== password2 || password.trim().length <= 5) {


			dispatch(setError('Password should be at least 6 characters and match '));
			return false;

		}

		dispatch(removeError());
		return true;

	}

	return (
		<>
			<h3>Register</h3>
			<form onSubmit={handleRegister} className="auth__form" >
				{
					// Mostar msg de error si un campo es incorrecto
					msError && ( <div className="auth__alert-error"> {msError} </div> )
				}
				<input name="name" value={name} onChange={handleInputChange} className="auth__form-control" type="text" placeholder="Nombre..." autoComplete="off" />
				<input name="email" value={email} onChange={handleInputChange} className="auth__form-control" type="text" placeholder="Email..." autoComplete="off" />
				<input name="password" value={password} onChange={handleInputChange} className="auth__form-control" type="password" placeholder="Password..." autoComplete="off" />
				<input name="password2" value={password2} onChange={handleInputChange} className="auth__form-control" type="password" placeholder="Confirm Password..." autoComplete="off" />

				<button type="submit" className="btn btn-primary pointer" >Register</button>

				<Link className="link" to="/auth/login"> Alredy registed? </Link>
			</form>

		</>
	)
}
