import React, { useState } from 'react'
import { 
  TextField,
  Box,
  Typography,
  ClickAwayListener,
  Grow,
  Checkbox,

} from '@mui/material'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import { ArchiveOutlined } from '@mui/icons-material';

import NoteContainer from './NoteContainer'
import NoteButton from './NoteButton'
import BackgroundMenu from './BackgroundMenu';
import LabelMenu from './LabelMenu'
import LabelChipArray from './LabelChipArray'

const NoteForm = ({ 
  note, 
  handleEditNote, 
  deleteNote, 
  changeNote, 
  onClose,
  newNote,
  onClickAway,
  isOpen,
  createLabel,
  labels,
  openLabelMenu,
  closeLabelMenu,
  labelMenuOpen,
  labelAnchorEl
}) => {
  const [anchorNoteForm, setAnchorNoteForm] = useState(null)
  const open = Boolean(anchorNoteForm)

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
  
  // console.log('The note object passed to NoteForm >>> ', note)
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      {/* <Grow 
        in={isOpen}
        {...(isOpen  && newNote ? {timeout: 0} : {})}
      > */}
          <NoteContainer 
            elevation={4} 
            // variant="outlined"
            className="noteContainer"
            sx={{
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
            }}
        >
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'text',
                    }}
                >
                    <TextField 
                      fullWidth 
                      variant="standard"
                      InputProps={{
                        disableUnderline: true
                      }}
                      sx={{
                        label: { color: theme => theme.palette.text.accent },
                        mt: theme => theme.spacing(1),
                        ml: theme => theme.spacing(2),
                      }}
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
                    sx={{
                        px: theme => theme.spacing(2),
                        pb: theme => theme.spacing(1),
                        cursor: 'text',
                        maxHeight: '60vh',
                        overflow: 'auto',
                    }}
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
                    <LabelChipArray note={note} changeNote={updateNote} />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    gap: theme => theme.spacing(2),
                    ml: theme => theme.spacing(2),
                    mr: theme => theme.spacing(3)
                }}
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
                    onClick={() => {}}
                    tooltip="Archive"
                >
                    <ArchiveOutlined fontSize='small'/>
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
                      sx={{
                        color: theme => theme.palette.text.accent
                      }}
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
                createLabel={createLabel}
                // labelMenuLocation="NoteForm"
            />
        </NoteContainer>
      {/* </Grow> */}
    </ClickAwayListener>
  )
}

export default NoteForm