import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { formatString } from '../../helpers';
import { setActiveNote } from '../../store/journal/journalSlice';



export const SideBarListItem = ({ note }) => {

    const dispatch = useDispatch();
    const title = useMemo(() => formatString(note.title, 15), [note.title])
    const body = useMemo(() => formatString(note.body, 18), [note.body])


    return (
        <ListItem disablePadding >
            <ListItemButton
                onClick={() => dispatch(setActiveNote(note))}
            >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText
                        primary={title}
                        secondary={body}
                    />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
