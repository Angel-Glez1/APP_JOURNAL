import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';


export const ButtonNewNote = ({ onClick }) => {

    const { isSaving } = useSelector(state => state.journal);

    return (
        <IconButton
            disabled={isSaving}
            onClick={onClick}
            size={'large'}
            sx={{
                color: 'white',
                backgroundColor: 'error.main',
                ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                position: 'fixed',
                right: 50,
                bottom: 50,
            }}
        >
            <AddOutlined sx={{ fontSize: 30, color: 'white' }} />
        </IconButton>
    )
}
