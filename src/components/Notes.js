import React from 'react'
import { useParams } from 'react-router-dom'
import '../style.css'
import {
    Box,
    Typography,
} from '@mui/material'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import Note from './Note'

const Notes = ({ notes, labels, deleteNote, changeNote, createLabel }) => {
    const { labelName } = useParams()
    // console.log('The param from Router (labelName) >>>', labelName)
    let notesToShow = [...notes]
    // console.log('The notesToShow array at start', notesToShow)
    
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
        // console.log('The notesToShow array >>> ',notesToShow)
    }
    
    let pinnedNotes = notesToShow.filter(n => n.pinned)
    
    return (
        <Box 
            sx={{ 
                zIndex: theme => theme.zIndex.drawer,
                padding: 5
            }}
            // id='masonry'
        >
            {pinnedNotes.length > 0 ?
                <Box
                    sx={{
                        mb: 5
                    }}
                >
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: theme => theme.palette.text.primary,
                            my: 1,
                            mx: 2
                        }}
                    >
                        Pinned
                    </Typography>
                    <ResponsiveMasonry 
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                    >
                        <Masonry
                            gutter="15px"
                        >
                            {notesToShow.filter(n => n.pinned).map(n => 
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
                </Box> :
                null
            }
            <Box>
                {pinnedNotes.length > 0 ?
                    <Typography
                        sx={{
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: theme => theme.palette.text.primary,
                            my: 1,
                            mx: 2
                        }}
                    >
                        Others
                    </Typography> :
                    null
                }
                <ResponsiveMasonry 
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry
                        gutter="15px"
                    >
                        {notesToShow.filter(n => !n.pinned).map(n => 
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
        </Box>
    )
}

export default Notes