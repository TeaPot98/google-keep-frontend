import React, { useState } from 'react'
import { 
  Paper,
  Typography, 
  ClickAwayListener,
  Box
} from '@mui/material'
import NoteForm from './NoteForm'
import noteService from '../services/notes'

const NewNote = ({ addNote }) => {
  const [active, setActive] = useState(false)
  const [note, setNote] = useState({
    title: '',
    content: ''
  })

  const handleTitleChange = (event) => {
    setNote({...note, title: event.target.value})
  } 

  const handleContentChange = (event) => {
    setNote({...note, content: event.target.value})
  }

  const handleClickAway = async () => {
    console.log('Clicked away !')
    setActive(false)
    if (note.title !== '' || note.content !== '') {
      await addNote(note)
    }
    setNote({
      title: '',
      content: ''
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
        <ClickAwayListener onClickAway={handleClickAway}>
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
              color: theme => theme.palette.text.secondary,
              fontWeight: 'bolder'
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