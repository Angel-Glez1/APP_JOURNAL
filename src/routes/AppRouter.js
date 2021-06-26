import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { firebase } from '../firebase/firebase-config'
import { JorunalScreen } from '../components/journal/JorunalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRouters } from './PrivateRouters';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';
import { SpinnerScreen } from '../components/ui/SpinnerScreen';

export const AppRouter = () => {

	const dispatch = useDispatch();

	// Sirver para poner un loading Spinner en todo ami aplicacion cuando este cargando.
	const [checking, setChecking] = useState(true);

	// Saber si el user esta logueado para bloquear las rutasPublicas(LoginScreen y RegisterScreen).
	const [isLoggedIn, setIsLoggedIn] = useState(false);


	// Saber si exite un usuario autentificado...
	useEffect(() => {
		firebase.auth().onAuthStateChanged( async (user) => {

			if (user?.uid) {

				dispatch(login(user.uid, user.displayName));
				
				setIsLoggedIn(true); 

				// Obtener las notas del usuario auth 
				dispatch(startLoadingNotes(user.uid));

			} else {
				
				setIsLoggedIn(false);
			}

			setChecking(false);
		})
	}, [dispatch, setChecking, setIsLoggedIn])


	if (checking) {
		return (<SpinnerScreen />)
	}

	

	return (
		<Router>
			<div>
				<Switch>
					
					<PublicRoute path="/auth" isAuthenticated={isLoggedIn} component={AuthRouter} />

					<PrivateRouters exact path="/" isAuthenticated={isLoggedIn} component={JorunalScreen} />

					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	)
}


