import React from 'react'
import '../style.css'
import {
    Box
} from '@mui/material'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Note from './Note'

const Notes = ({ notes, labels, deleteNote, changeNote, createLabel }) => {
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
                            labels={labels}
                            deleteNote={deleteNote}
                            changeNote={changeNote}
                            createLabel={createLabel}
                        />
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </Box>
    )
}

export default Notes