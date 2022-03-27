import React from 'react'
import { useParams } from 'react-router-dom'
import '../style.css'
import {
    Box
} from '@mui/material'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Note from './Note'

const Notes = ({ notes, labels, deleteNote, changeNote, createLabel }) => {
    const { labelName } = useParams()
    console.log('The param from Router (labelName) >>>', labelName)
    let notesToShow = [...notes]
    console.log('The notesToShow array at start', notesToShow)

    if (labelName) {
        const filteredNotes = []
        notes.map(n => {
            for (let i = 0; i < n.labels.length; i++) {
                console.log(n.labels[i].name)
                if (n.labels[i].name === labelName) {
                    filteredNotes.push(n)
                }
            }
        })
        notesToShow = filteredNotes
        console.log('The notesToShow array >>> ',notesToShow)
    }
    
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
                    {notesToShow.map(n => 
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