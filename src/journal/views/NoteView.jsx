import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../helpers';
import { useForm } from '../../hooks';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { ImageGallery } from '../components';


export const NoteView = () => {

    const dispatch = useDispatch();
    const inputRef = useRef();
    const { active: note, isSaving } = useSelector(state => state.journal);
    const { body, title, onInputChange, formState, date } = useForm(note);
    const dateString = useMemo(() => formatDate(date), [date])

    const handleClick = () => {
        const imagesUrls = note?.imagesUrls.length > 0 ? note.imagesUrls : [];
        dispatch(startSaveNote({ ...formState, imagesUrls }))
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files, note))
    }

    const onDelete = () => {
        dispatch(startDeletingNote())

    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontWeight='light'>{dateString}</Typography>
            </Grid>

            <Grid item>
                <input ref={inputRef} hidden type="file" multiple onChange={onFileInputChange} />
                <IconButton onClick={() => inputRef.current.click()} color='primary' disabled={isSaving}>
                    <UploadOutlined />
                </IconButton>
                <Button color='primary' onClick={handleClick} disabled={isSaving}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>


            <Grid container>
                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    placeholder='Ingrese un title'
                    labe='Título'
                    sx={{ border: 'none', mb: 1 }}
                    value={title}
                    name='title'
                    onChange={onInputChange}
                />
                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder='Que sucedio hoy'
                    minRows={5}
                    value={body}
                    name='body'
                    onChange={onInputChange}
                />
            </Grid>


            <Grid container>
                <Grid item>
                    <Button onClick={onDelete} sx={{ mt: 2 }} color='error' >
                        <DeleteOutline />
                        Borrar
                    </Button>
                </Grid>
            </Grid>

            <ImageGallery
                images={note?.imagesUrls ?? []}
            />
        </Grid>
    )
}