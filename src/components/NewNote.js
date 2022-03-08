import React, { useState } from 'react'
import { 
  Paper,
  Typography, 
  ClickAwayListener
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
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        {active ? 
          <NoteForm 
            handleTitleChange={handleTitleChange}
            handleContentChange={handleContentChange}
            note={note}
          /> :
          <Paper 
            elevation={4} 
            onClick={() => setActive(true)}
            sx={{ 
              mt: 3, 
              mx: 1, 
              py: 1,
              px: 2,
              cursor: 'text',
              border: `1px solid ${theme => theme.palette.divider}`
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
      </div>
    </ClickAwayListener>
  )
}

export default NewNote