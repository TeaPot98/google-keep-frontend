import React, { useState } from 'react'
import {
    Box,
    Typography,
    Checkbox
} from '@mui/material'

import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import PushPinIcon from '@mui/icons-material/PushPin'
import { ArchiveOutlined } from '@mui/icons-material'
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'
import { useTheme } from '@emotion/react'

import { useDispatch } from 'react-redux'
import { editNote, removeNote } from '../reducers/noteSlice'

import NoteButton from './NoteButton'
import BackgroundMenu from './BackgroundMenu'
import NoteContainer from './NoteContainer'
import NoteForm from './NoteForm'
import LabelMenu from './LabelMenu'
import LabelChipArray from './LabelChipArray'

const Note = ({ note, labels, createLabel }) => {
    const theme = useTheme()
    const dispatch = useDispatch()

    // Background menu anchor
    const [backgroundAnchorEl, setBackgroundAnchorEl] = useState(null)
    const backgroundMenuOpen = Boolean(backgroundAnchorEl)

    // Label menu anchor
    const [labelAnchorEl, setLabelAnchorEl] = useState(null)
    const labelMenuOpen = Boolean(labelAnchorEl)

    // Background menu anchor
    const [backgroundAnchorElF, setBackgroundAnchorElF] = useState(null)
    const backgroundMenuOpenF = Boolean(backgroundAnchorElF)

    // Label menu anchor
    const [labelAnchorElF, setLabelAnchorElF] = useState(null)
    const labelMenuOpenF = Boolean(labelAnchorElF)
    
    const [openNoteForm, setOpenNoteForm] = useState(false)
    const [editedNote, setEditedNote] = useState(note)

    // Note form functions
    const handleNoteFormOpen = (event) => {
        if (!backgroundAnchorEl && !labelAnchorEl) {
            // setEditedNote(note)
            setOpenNoteForm(true)
            // console.log('The form is opened with note >>> ', editedNote)
        }
    }

    const handleNoteFormClose = async () => {
        if (openNoteForm) {
            setOpenNoteForm(false)
            dispatch(editNote(editedNote))
        }
    }
    
    // Background menu functions
    const openBackgroundMenu = (event) => {
        event.stopPropagation()
        setBackgroundAnchorEl(event.currentTarget)
    }
    const closeBackgroundMenu = () => {
        setBackgroundAnchorEl(null)
    }

    // Label menu functions
    const openLabelMenu = (event) => {
        event.stopPropagation()
        setLabelAnchorEl(event.currentTarget)
    }
    const closeLabelMenu = () => {
        setLabelAnchorEl(null)
    }

    // Background menu functions
    const openBackgroundMenuF = (event) => {
        event.stopPropagation()
        setBackgroundAnchorElF(event.currentTarget)
    }
    const closeBackgroundMenuF = () => {
        setBackgroundAnchorElF(null)
    }

    // Label menu functions
    const openLabelMenuF = (event) => {
        event.stopPropagation()
        setLabelAnchorElF(event.currentTarget)
    }
    const closeLabelMenuF = () => {
        setLabelAnchorElF(null)
    }

    // Updates the editedNote to keep state up to date while editing
    const handleEditNote = (updatedNote) => {
        setEditedNote(updatedNote)
    }

    const styles = {
        wrapper: {
            m: 0,
            p: 0,
            display: 'inline',
            // "& :hover": {
            //     opacity: 0
            // }
            "& .MuiBadge-badge, .noteButton, .pinButtonIcon": {
                opacity: 0,
                transition: 'opacity 0.218s ease-in-out, color 0.218s ease-in-out'
            },
            "&:hover .MuiBadge-badge": {
                opacity: 1
            },
            "&:hover .pinButtonIcon": {
                opacity: 1
            },
            "&:hover .noteButton": {
                opacity: 1
            },
            "&:hover .noteContainer": {
                boxShadow: `0px 1px 3px ${theme.palette.text.hint}`,
                // boxShadow: '0px 1px 3px gray'
            }
        },
        container: {
            backgroundColor: note.color,
            borderColor: note.color === '#fff' ? theme.palette.divider : 'transparent',
            transition: 'box-shadow 0.118s ease-in-out',
            zIndex: 1,
        },
        titleContainer: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        title: {
            mt: theme => theme.spacing(1),
            ml: theme => theme.spacing(2),
            cursor: 'default',
            color: theme => theme.palette.text.accent,
            textOverflow: 'ellipsis',
            overflow: 'hidden'
        },
        contentContainer: {
            px: theme => theme.spacing(2),
            maxHeight: '300px',
            overflow: 'hidden'
        },
        contentText: {
            cursor: 'default',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontFamily: 'Roboto, sans-serif',
            whiteSpace: 'pre-wrap',
        },
        buttonsContainer: {
            display: 'flex',
            justifyContent: 'start'
        },
    }

    // console.log('The note from Note', note)
    return (
        <>
            <Box
                sx={styles.wrapper}
            >
                <NoteContainer 
                    elevation={0} 
                    variant="outlined"
                    className="noteContainer"
                    onClick={handleNoteFormOpen}
                    sx={styles.container}
                >
                    <Box>
                        <Box
                            sx={styles.titleContainer}
                        >
                            <Typography 
                                variant="subtitle1" 
                                component="p"
                                sx={styles.title}
                            >
                                {note.title}
                            </Typography>
                            {note.deleted ?
                                null :
                                <Checkbox 
                                    checked={note.pinned}
                                    icon={
                                        <PushPinOutlinedIcon 
                                            className="pinButtonIcon"
                                        />
                                    }
                                    checkedIcon={
                                        <PushPinIcon 
                                            className="pinButtonIcon"
                                            color="action"
                                        />
                                    }
                                    onChange={(event) => {
                                        dispatch(editNote({
                                            ...note,
                                            pinned: event.target.checked
                                        }))
                                    }}
                                    onClick={(event) => {event.stopPropagation()}}
                                />
                            }
                        </Box>
                        <Box
                            sx={styles.contentContainer}
                        >
                            <Typography 
                                component="pre"
                                variant="inherit"
                                sx={styles.contentText}
                            >
                                {note.content}
                            </Typography>
                        </Box>
                        <LabelChipArray 
                            note={note}
                        />
                    </Box>
                    <Box
                        sx={styles.buttonsContainer}
                    >
                        {note.deleted ?
                            <>
                                <NoteButton
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatch(editNote({
                                            ...note,
                                            deleted: false
                                        }))
                                    }}
                                    tooltip="Restore"
                                >
                                    <RestoreFromTrashOutlinedIcon fontSize='small'/>
                                </NoteButton>
                                <NoteButton
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatch(removeNote(note.id))
                                    }}
                                    tooltip="Delete forever"
                                >
                                    <DeleteForeverOutlinedIcon fontSize='small'/>
                                </NoteButton>
                            </> :
                            <>
                                <NoteButton
                                    onClick={openBackgroundMenu}
                                    tooltip="Background options"
                                >
                                    <PaletteOutlinedIcon fontSize='small'/>
                                </NoteButton>
                                {/* <NoteButton
                                    onClick={() => {}}
                                    tooltip="Add image"
                                >
                                    <InsertPhotoOutlinedIcon fontSize='small'/>
                                </NoteButton> */}
                                <NoteButton
                                    onClick={openLabelMenu}
                                    tooltip="Add label"
                                >
                                    <LabelOutlinedIcon fontSize='small'/>
                                </NoteButton>
                                <NoteButton
                                    onClick={(event) => {
                                            event.stopPropagation()
                                            dispatch(editNote({
                                                ...note,
                                                archived: !note.archived
                                            }))
                                        }
                                    }
                                    tooltip={note.archived ? "Unarchive" : "Archive"}
                                >
                                    {note.archived ? 
                                        <UnarchiveOutlinedIcon fontSize="small"/> :
                                        <ArchiveOutlined fontSize='small'/>
                                    }
                                </NoteButton>
                                <NoteButton
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        dispatch(editNote({
                                            ...note,
                                            deleted: true
                                        }))
                                    }}
                                    tooltip="Delete note"
                                >
                                    <DeleteOutlineOutlinedIcon fontSize='small'/>
                                </NoteButton>
                            </>
                        }
                    </Box>
                    <BackgroundMenu 
                        open={backgroundMenuOpen}
                        onClose={closeBackgroundMenu}
                        anchor={backgroundAnchorEl}
                        note={note}
                        handleEditNote={handleEditNote}
                    />
                    {/* {console.log('Note sent to LabelMenu', note)} */}
                    <LabelMenu
                        anchor={labelAnchorEl}
                        open={labelMenuOpen}
                        onClose={closeLabelMenu}
                        note={note}
                        labels={labels}
                        createLabel={createLabel}
                        handleEditNote={handleEditNote}
                        // labelMenuLocation="Note"
                    />
                </NoteContainer>
            </Box>
            <NoteForm 
                handleEditNote={handleEditNote}
                note={editedNote}
                onClose={handleNoteFormClose}
                newNote={false}
                isOpen={openNoteForm}
                labels={labels}
                createLabel={createLabel}
                closeLabelMenu={closeLabelMenuF}
                openLabelMenu={openLabelMenuF}
                labelAnchorEl={labelAnchorElF}
                labelMenuOpen={labelMenuOpenF}
                // hidden={true}
            />
        </>
    )
}

export default Note