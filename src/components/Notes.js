import React from 'react'
import { styled } from '@mui/material/styles'
import {
    Box,
    Paper,
    Toolbar
} from '@mui/material'
import { Masonry } from '@mui/lab'

const Note = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'start',
    color: theme.palette.text.secondary,
    // variant: 'outlined',
    borderRadius: 7 
}))

const Notes = ({ notes }) => {
    return (
        <Box 
            sx={{ 
                zIndex: theme => theme.zIndex.drawer,
                padding: 5 
            }}
        >
            <Toolbar />
            <Masonry columns={2} spacing={1}>
                {notes.map(n => 
                    <Note key={n.id} elevation={0} variant="outlined">
                        {n.content}
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                    </Note>
                )}
            </Masonry>
        </Box>
    )
}

export default Notes