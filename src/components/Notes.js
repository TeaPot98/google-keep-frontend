import React from 'react'
import '../style.css'
import {
    Box
} from '@mui/material'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Note from './Note'

const Notes = ({ notes, deleteNote, changeNote }) => {
    return (
        <Box 
            sx={{ 
                zIndex: theme => theme.zIndex.drawer,
                padding: 5
            }}
            // id='masonry'
        >
            <ResponsiveMasonry 
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry
                    gutter="15px"
                >
                    {notes.map(n => 
                        <Note 
                            key={n.id}
                            note={n}
                            deleteNote={deleteNote}
                            changeNote={changeNote}
                        />
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </Box>
    )
}

export default Notes