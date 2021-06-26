import React, { useEffect, useRef } from 'react';
import { NotesAppBar } from './NotesAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';


export const NoteScreen = () => {

	const { active: note } = useSelector(state => state.notes);
	const dispatch = useDispatch();

	const [formValues, handleInputChange, reset] = useForm(note);
	const { title, body, url } = formValues;
	
	const activeId = useRef(note.id);

	useEffect(() => {

		if(note.id !== activeId.current){
			reset(note);
			activeId.current = note.id;
		}
		
	}, [note, reset])

	
	useEffect(() => {
		
		dispatch( activeNote(formValues.id, {...formValues}) );

	}, [formValues, dispatch])


	const handleDelete = () => {
		dispatch(startDeleting(note.id));
	}


	return (
		<div className="notes__main-content">


			<NotesAppBar />

			<button
				onClick={handleDelete}
				className="btn btn-danger"
			>
				Deleted
			</button>

			<div className="notes__content" >
				<input
					onChange={handleInputChange}
					name="title"
					value={title}
					type="text"
					autoComplete="off"
					placeholder="Some aweson title" />

				<textarea
					onChange={handleInputChange}
					name="body"
					value={body}
					placeholder="What happend today"
				>

				</textarea>

				{
					url &&
					<div className="notes_images">
						<img src={url} alt={title}></img>
					</div>
				}
			</div>



		</div>
	)
}
