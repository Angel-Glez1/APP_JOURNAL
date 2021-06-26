import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

	const dispatch = useDispatch();
	const {name} = useSelector(state => state.auth);

	// Hacer el Dispatch del loguot en firebase
	const handleLogout = () => dispatch( startLogout() ); 

	const handleAddNew = () => {
		dispatch(startNewNote());
	}

	return (
		<aside className="journal__sidebar">
			<div className="journal_sidebar-navbar">
				<h3 className="mt-5"> <i className="far fa-moon"></i> <span> {name} </span> </h3>
				<button onClick={ handleLogout }  className="btn btn-primary mt-5" > Logout </button>
			</div>

			<div 
				onClick={handleAddNew}  
				className="btn btn-primary journal__new-entry" 
			>
				<i className="far fa-calendar-plus fa-5x"></i>
				<p> New Entry </p>
			</div>

			<JournalEntries/>
		</aside>
	)
}
