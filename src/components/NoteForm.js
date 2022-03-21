import React, { useState } from 'react'
import { 
  TextField,
  Box,
  Typography,
} from '@mui/material'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { ArchiveOutlined } from '@mui/icons-material';

import NoteContainer from './NoteContainer'
import NoteButton from './NoteButton'
import BackgroundMenu from './BackgroundMenu';

const NoteForm = ({ 
  note, 
  handleTitleChange, 
  handleContentChange, 
  deleteNote, 
  changeNote, 
  onClose,
  newNote,
  hidden = false
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const removeNote = async () => {
    await deleteNote(note.id)
  }
  
  
  return (
    <NoteContainer 
      elevation={4} 
      // variant="outlined"
      className="noteContainer"
      sx={{
          backgroundColor: note.color,
          transition: 'background-color 0.218s ease-in-out',
          mt: 3, 
          border: `1px solid ${theme => theme.palette.divider}`,
          position: newNote ? 'default' : 'absolute',
          zIndex: newNote ? 'auto' : 1000
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
                  label: { color: theme => theme.palette.text.secondary },
                  mt: theme => theme.spacing(1),
                  ml: theme => theme.spacing(2),
                }}
                placeholder="Title"
                onChange={handleTitleChange}
                value={note.title}
              />
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
                  pb: theme => theme.spacing(1),
                  cursor: 'text',
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
                onChange={handleContentChange}
                value={note.content}
              />
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
          anchor={anchorEl}
          note={note}
          onColorChange={changeNote}
      />
  </NoteContainer>
  )
}

export default NoteForm