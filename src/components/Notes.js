import React from 'react'
import { styled } from '@mui/material/styles'
import {
    Box,
    Paper,
    Toolbar,
    Typography
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
            // id='masonry'
        >
            <Masonry columns={2} spacing={1}>
                {notes.map(n => 
                    <Note key={n.id} elevation={0} variant="outlined">
                        <Typography variant="subtitle1" component="p">
                            {n.title}
                        </Typography>
                        <p>{n.content}</p>
                    </Note>
                )}
            </Masonry>
        </Box>
    )
}

export default Notes