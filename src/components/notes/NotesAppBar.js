import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploadin } from '../../actions/notes'

export const NotesAppBar = () => {

	const dispatch = useDispatch();
	const {active} = useSelector(state => state.notes);


	// Actuliza la nota que se edito
	const handleSaveNote = () => {
		dispatch(startSaveNote(active) );		
	}

	
	const handlePictureUpload = () => {
		document.querySelector('#file').click();
		
	}

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if(file){
			dispatch( startUploadin(file) );
		}
	}

	return (
		<div className="notes__appbar">
			<span>28 Agost 2020</span>	
			<div>
				<input  onChange={handleFileChange} id="file" type="file" name="file" style={{display:'none'}} />
				<button  onClick={handlePictureUpload} className="btn btn-primary pointer" style={{ backgroundColor : '#444', marginLeft: '2px'  }} > Picture </button>
				<button  onClick={handleSaveNote} className="btn btn-primary pointer" style={{ backgroundColor : '#444', marginLeft: '2px'  }} > Save </button>
				
			</div>

		</div>
	)
}
