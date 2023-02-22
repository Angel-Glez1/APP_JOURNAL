import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
import { ButtonNewNote } from '../components/ButtonNewNote';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';



export const JournalPage = () => {

  const dispatch = useDispatch();
  const { active } = useSelector(state => state.journal);

  const onClickNewNote = () => dispatch(startNewNote());

  return (
    <JournalLayout>
      {
        active?.id
          ? <NoteView />
          : <NothingSelectedView />
      }
      <ButtonNewNote onClick={onClickNewNote} />
    </JournalLayout>
  )
}
