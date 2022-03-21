import React, { useState } from 'react'
import { 
  Paper,
  Typography, 
  ClickAwayListener,
  Box
} from '@mui/material'
import NoteForm from './NoteForm'
import { useTheme } from '@emotion/react'

const NewNote = ({ addNote, deleteNote }) => {
  const theme = useTheme()
  
  const [active, setActive] = useState(false)
  const [note, setNote] = useState({
    title: '',
    content: '',
    pinned: false,
    color: theme.palette.primary.main
  })

  const handleTitleChange = (event) => {
    setNote({...note, title: event.target.value})
  } 

  const handleContentChange = (event) => {
    setNote({...note, content: event.target.value})
  }

  const handleColorChange = (newNote) => {
    setNote(newNote)
  }

  const closeNoteForm = async () => {
    console.log('Clicked away !')
    setActive(false)
    if (note.title !== '' || note.content !== '') {
      await addNote(note)
    }
    setNote({
      title: '',
      content: '',
      color: theme.palette.primary.main,
      pinned: false
    })
  }

  return (
    <Box
      sx={{
        display: 'block',
        animationDuration: '3s',
        animationName: 'slidein',
      }}
    >
      {active ? 
        <ClickAwayListener onClickAway={closeNoteForm}>
          <Box
            sx={{
              mx: 'auto',
              maxWidth: '600px',
            }}
          >
                <NoteForm 
                  handleTitleChange={handleTitleChange}
                  handleContentChange={handleContentChange}
                  note={note}
                  deleteNote={deleteNote}
                  changeColor={handleColorChange}
                  onClose={closeNoteForm}
                  newNote={true}
                />
          </Box>
        </ClickAwayListener> :
        <Paper 
          elevation={4} 
          onClick={() => setActive(true)}
          sx={{ 
            mt: 3, 
            mx: 'auto',
            py: 1,
            px: 2,
            cursor: 'text',
            border: `1px solid ${theme => theme.palette.divider}`,
            maxWidth: '568px',
          }}
        >
          <Typography 
            variant="subtitle1" 
            component="p"
            sx={{
              color: theme => theme.palette.text.primary,
            }}
          >
            New note...
          </Typography>
        </Paper>
      }
    </Box>
  )
}

export default NewNote