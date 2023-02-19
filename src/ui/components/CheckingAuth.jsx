import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

const containerProps = {
    container: true,
    spacing: 0,
    direction: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    sx: { minHeight: '100vh', backgroundColor: 'primary.main', padding: 4, },
}


export const CheckingAuth = () => {
    return (
        <Grid {...containerProps}>
            <CircularProgress color='warning' />
        </Grid>
    )
}
