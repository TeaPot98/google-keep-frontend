import React, { useState } from 'react'
import { 
  TextField,
  Box,
  Typography,
  ClickAwayListener,
  Grow,
  Checkbox,
  Dialog,
} from '@mui/material'

import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import PushPinIcon from '@mui/icons-material/PushPin'
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined'
import { ArchiveOutlined } from '@mui/icons-material'

import { useDispatch } from 'react-redux'
import { editNote } from '../reducers/noteSlice'

import NoteContainer from './NoteContainer'
import NoteButton from './NoteButton'
import BackgroundMenu from './BackgroundMenu'
import LabelMenu from './LabelMenu'
import LabelChipArray from './LabelChipArray'

const NoteForm = ({ 
  note, 
  handleEditNote, 
  deleteNote, 
  changeNote, 
  onClose,
  newNote,
  isOpen,
  labels,
  openLabelMenu,
  closeLabelMenu,
  labelMenuOpen,
  labelAnchorEl
}) => {
  const [anchorNoteForm, setAnchorNoteForm] = useState(null)
  const open = Boolean(anchorNoteForm)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorNoteForm(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorNoteForm(null)
  }

  const removeNote = async () => {
    await deleteNote(note.id)
  }

  const updateNote = (updNote) => {
    handleEditNote(updNote)
    changeNote(updNote)
  }

  const styles = {
    noteContainer: {
      backgroundColor: note.color,
      transition: 'background-color 0.218s ease-in-out',
      mt: newNote ? 3 : 'auto', 
      mb: newNote ? 0 : 'auto',
      mx: 'auto',
      border: `1px solid ${theme => theme.palette.divider}`,
      position: newNote ? 'default' : 'fixed',
      display: newNote ? 'block' : isOpen ? 'inline-table' : 'none',
      height: 'auto',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      maxWidth: '600px',
      // maxHeight: '70vh',
      zIndex: newNote ? 'auto' : 2001
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'text',
    },
    titleText: {
      label: { color: theme => theme.palette.text.accent },
      mt: theme => theme.spacing(1),
      ml: theme => theme.spacing(2),
    },
    contentContainer: {
      px: theme => theme.spacing(2),
      pb: theme => theme.spacing(1),
      cursor: 'text',
      maxHeight: '60vh',
      overflow: 'auto',
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'end',
      gap: theme => theme.spacing(2),
      ml: theme => theme.spacing(2),
      mr: theme => theme.spacing(3)
    },
    buttonText: {
      color: theme => theme.palette.text.accent
    },
  }
  
  // console.log('The note object passed to NoteForm >>> ', note)
  return (
    // <ClickAwayListener onClickAway={onClickAway}>
      // {/* <Grow 
      //   in={isOpen}
      //   {...(isOpen  && newNote ? {timeout: 0} : {})}
      // > */}
      <Dialog onClose={onClose} open={isOpen}>
          <NoteContainer 
            elevation={4} 
            // variant="outlined"
            className="noteContainer"
            sx={styles.noteContainer}
        >
            <Box>
                <Box
                    sx={styles.titleContainer}
                >
                    <TextField 
                      fullWidth 
                      variant="standard"
                      InputProps={{
                        disableUnderline: true
                      }}
                      sx={styles.titleText}
                      placeholder="Title"
                      onChange={(event) => handleEditNote({
                        ...note,
                        title: event.target.value
                      })}
                      value={note.title}
                    />
                    <Checkbox 
                        checked={note.pinned}
                        icon={
                            <PushPinOutlinedIcon 
                                className="pinButtonIcon"
                            />
                        }
                        checkedIcon={
                            <PushPinIcon 
                                color="action"
                            />
                        }
                        onChange={(event) => {
                          updateNote({
                            ...note,
                            pinned: event.target.checked
                          })
                        }}
                        onClick={(event) => {event.stopPropagation()}}
                    />
                </Box>
                <Box
                    sx={styles.contentContainer}
                >
                    <TextField 
                      fullWidth 
                      multiline
                      variant="standard"
                      InputProps={{
                        disableUnderline: true
                      }}
                      placeholder="New note..."
                      autoFocus={true}
                      onChange={(event) => handleEditNote({
                        ...note,
                        content: event.target.value
                      })}
                      value={note.content}
                    />
                    <LabelChipArray note={note} />
                </Box>
            </Box>
            <Box
                sx={styles.buttonsContainer}
            >
                <NoteButton
                    onClick={handleClick}
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
                {newNote ?
                  null : 
                  <NoteButton
                      onClick={removeNote}
                      tooltip="Delete note"
                  >
                      <DeleteOutlineOutlinedIcon fontSize='small'/>
                  </NoteButton>
                }
                <div style={{ flex: 1}}></div>
                <NoteButton
                    onClick={onClose}
                    tooltip=""
                >
                    <Typography 
                      sx={styles.buttonText}
                    >
                      Close
                    </Typography>
                </NoteButton>
            </Box>
            <BackgroundMenu 
                open={open}
                onClose={handleClose}
                anchor={anchorNoteForm}
                note={note}
                onColorChange={changeNote}
                handleEditNote={handleEditNote}
            />
            <LabelMenu
                anchor={labelAnchorEl}
                open={labelMenuOpen}
                onClose={closeLabelMenu}
                note={note}
                labels={labels}
                changeNote={handleEditNote}
                // labelMenuLocation="NoteForm"
            />
        </NoteContainer>
      </Dialog>
      // {/* </Grow> */}
    // {/* </ClickAwayListener> */}
  )
}

export default NoteForm