import React from 'react'
import '../style.css'
import {
    Box
} from '@mui/material'
import { Masonry } from '@mui/lab'

import Note from './Note'

const Notes = ({ notes, deleteNote, changeColor }) => {
    return (
        <Box 
            sx={{ 
                zIndex: theme => theme.zIndex.drawer,
                padding: 5
            }}
            // id='masonry'
        >
            <Masonry spacing={2} columns={3} defaultColumns={3}>
                    {notes.map(n => 
                        <Note 
                            key={n.id}
                            note={n}
                            deleteNote={deleteNote}
                            changeColor={changeColor}
                        />
                    )}
            </Masonry>
        </Box>
    )
}

export default Notes