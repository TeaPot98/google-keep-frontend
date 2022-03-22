import React, { useState } from 'react'
import {
    Box,
    Typography,
    Badge,
    Tooltip,
    Fade,
    Grow,
} from '@mui/material'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ArchiveOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';

import NoteButton from './NoteButton'
import BackgroundMenu from './BackgroundMenu';
import NoteContainer from './NoteContainer';
import NoteForm from './NoteForm';

const Note = ({ note, deleteNote, changeNote }) => {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [openNoteForm, setOpenNoteForm] = useState(false)
    const [editedNote, setEditedNote] = useState({
        title: '',
        content: '',
        pinned: false,
        color: theme.palette.primary.main
    })

    const handleNoteFormOpen = (event) => {
        if (!anchorEl) {
            setOpenNoteForm(true)
            setEditedNote(note)
        }
    }
    
    const handleNoteFormClose = async () => {
        if (openNoteForm) {
            setOpenNoteForm(false)
            await changeNote(editedNote)
            setEditedNote({
                title: '',
                content: '',
                pinned: false,
                color: theme.palette.primary.main
            })
        }
    }
    
    const openBackgroundMenu = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const removeNote = async (event) => {
        event.stopPropagation()
        await deleteNote(note.id)
    }

    const handleTitleChange = (event) => {
        setEditedNote({...note, title: event.target.value})
    } 

    const handleContentChange = (event) => {
        setEditedNote({...note, content: event.target.value})
    }
    
    return (
        <>
            <Badge
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                overlap="rectangular"
                badgeContent={
                    !openNoteForm ?
                    <Tooltip title="Select note">
                        <CheckCircleIcon
                            sx={{
                                cursor: 'pointer',
                                transition: 'auto 0.5s ease-in-ease-out'
                            }}
                            onClick={() => console.log('Clicked the check button')}
                        />
                    </Tooltip> :
                    null
                }
                sx={{
                    m: 0,
                    p: 0,
                    display: 'inline',
                    // "& :hover": {
                    //     opacity: 0
                    // }
                    "& .MuiBadge-badge, .noteButton": {
                        opacity: 0,
                        transition: 'opacity 0.218s ease-in-out, color 0.218s ease-in-out'
                    },
                    "&:hover .MuiBadge-badge": {
                        opacity: 1
                    },
                    "&:hover .noteButton": {
                        opacity: 1
                    },
                    "&:hover .noteContainer": {
                        boxShadow: theme => `0px 1px 3px ${theme.palette.text.hint}`
                    }
                }}
            >
                <NoteContainer 
                    elevation={0} 
                    variant="outlined"
                    className="noteContainer"
                    onClick={handleNoteFormOpen}
                    sx={{
                        backgroundColor: note.color,
                        borderColor: theme => note.color === '#fff' ? theme.palette.divider : 'transparent',
                        transition: 'all 0.218s ease-in-out',
                        visibility: openNoteForm ? 'hidden' : 'default',
                        zIndex: 1,
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography 
                                variant="subtitle1" 
                                component="p"
                                sx={{
                                    mt: theme => theme.spacing(1),
                                    ml: theme => theme.spacing(2),
                                    cursor: 'default',
                                    color: theme => theme.palette.text.accent,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden'
                                }}
                            >
                                {note.title}
                            </Typography>
                            <NoteButton
                                onClick={() => {}}
                                tooltip="Pin note"
                                size="normal"
                            >
                                <PushPinOutlinedIcon />
                            </NoteButton>
                        </Box>
                        <Box
                            sx={{
                                px: theme => theme.spacing(2),
                                maxHeight: '300px',
                                overflow: 'hidden'
                            }}
                        >
                            <Typography 
                                component="pre"
                                variant="inherit"
                                sx={{
                                    cursor: 'default',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    fontFamily: 'Roboto, sans-serif',
                                    whiteSpace: 'pre-wrap',
                                }}
                            >
                                {note.content}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end'
                        }}
                    >
                        <NoteButton
                            onClick={openBackgroundMenu}
                            tooltip="Background options"
                        >
                            <PaletteOutlinedIcon fontSize='small'/>
                        </NoteButton>
                        <NoteButton
                            onClick={() => {}}
                            tooltip="Add image"
                        >
                            <InsertPhotoOutlinedIcon fontSize='small'/>
                        </NoteButton>
                        <NoteButton
                            onClick={() => {}}
                            tooltip="Add label"
                        >
                            <LabelOutlinedIcon fontSize='small'/>
                        </NoteButton>
                        <NoteButton
                            onClick={() => {}}
                            tooltip="Archive"
                        >
                            <ArchiveOutlined fontSize='small'/>
                        </NoteButton>
                        <NoteButton
                            onClick={removeNote}
                            tooltip="Delete note"
                        >
                            <DeleteOutlineOutlinedIcon fontSize='small'/>
                        </NoteButton>
                    </Box>
                    <BackgroundMenu 
                        open={open}
                        onClose={handleClose}
                        anchor={anchorEl}
                        note={note}
                        onColorChange={changeNote}
                    />
                </NoteContainer>
            </Badge>
            <Fade in={openNoteForm}>
                <Box
                    onClick={handleNoteFormClose}
                    sx={{
                        backgroundColor: theme => theme.palette.text.secondary,
                        // display: openNoteForm ? 'block' : 'none',
                        opacity: 0.7,
                        zIndex: 2000,
                        p: 0,
                        m: 0,
                        top: 0,
                        left: 0,
                        position: 'fixed',
                        height: '100vh',
                        width: '100vw'
                    }}
                >
                </Box>
            </Fade>
            <NoteForm 
                handleTitleChange={handleTitleChange}
                handleContentChange={handleContentChange}
                note={editedNote}
                deleteNote={deleteNote}
                changeNote={changeNote}
                onClose={handleNoteFormClose}
                newNote={false}
                isOpen={openNoteForm}
                onClickAway={() => {}}
                // hidden={true}
            />
        </>
    )
}

export default Note