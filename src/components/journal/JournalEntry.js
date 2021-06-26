import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {

	const noteDate = moment(date);
	const dispatch = useDispatch();

	const handleEntryClick = () => {
		dispatch(activeNote(id, { date, title, body, url }) );
	}

	return (
		<div onClick={handleEntryClick} className="journal__entry" >
			{ 
				url &&
				<div 
					className="journal__entry-picture"
					style={{ backgroundSize: 'cover', backgroundImage: `url(${url})`}}
				></div>
			}

			<div className="journal__entry-body">
				<p className="journal__body-title">{title}</p>
				<p className="journal__body-content">{body}</p>
			</div>

			<div className="journal__entry-date-box">
				<span> { noteDate.format('dddd') } </span>
				<h4>  {noteDate.format('D') } </h4>

			</div>
			
		</div>
	)
}
