/**
 * El store no es mas que la configuracion de como va usar redux mi app
 * Ejemplo
 * Cuales con los reducer de mi app
 * Agregar el midleware para peticiones asincronas
 * Usar el redux-tools del los navegadores
 * Ect..
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';



const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
	auth : authReducer,
	ui: uiReducer,
	notes: notesReducer

})

export const store  = createStore( reducers, composeEnhancers( applyMiddleware(thunk) ));