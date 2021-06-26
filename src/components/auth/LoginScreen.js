import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

export const LoginScreen = () => {

	// Dispatch and Selector para mostar errores
	const dispatch = useDispatch();
	const { loading } = useSelector(state => state.ui);
	
	
	// 	Hook useForm
	const [formValues, handleInputChange] = useForm({ email: 'test@hotmail.com', password: '123456' });
	const {email, password} = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		// Hacemos el dispatch a mi reducer de auth
		dispatch( startLoginEmailPassword(email, password) );
	
	}

	// Login con google
	const handleGoogleLogin = () => {
		dispatch( startGoogleLogin() );
	}


	/**... JSX ...**/
	return (
		<>
			<h3>Login</h3>
			<form className="auth__form"  onSubmit={ handleLogin  } >
				<input onChange={ handleInputChange } name="email"    value={email}  className="auth__form-control" type="text" placeholder="Email..." autoComplete="off" />
				<input onChange={ handleInputChange } name="password" value={password}  className="auth__form-control" type="password" placeholder="Password..." autoComplete="off" />
				<button type="submit" disabled={ loading }  className="btn btn-primary pointer" >Login</button>

				<div className="auth__social-networks" >
					<h4>Login with Social Networks</h4>
					<div onClick={handleGoogleLogin}  className="google-btn">
						<div className="google-icon-wrapper">
							<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>
					</div>
				</div>

				<Link className="link" to="/auth/register"> Create new Account </Link>
			</form>

		</>
	)
}
