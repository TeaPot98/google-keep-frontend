import React, { useState } from 'react'
import { 
  Paper,
  Typography, 
  Box
} from '@mui/material'
import NoteForm from './NoteForm'
import { useTheme } from '@emotion/react'

const NewNote = ({ labels, addNote, deleteNote, createLabel }) => {
  const theme = useTheme()

  // Label menu anchor
  const [labelAnchorElF, setLabelAnchorElF] = useState(null)
  const labelMenuOpenF = Boolean(labelAnchorElF)
  
  const [active, setActive] = useState(false)
  const [note, setNote] = useState({
    title: '',
    content: '',
    pinned: false,
    color: theme.palette.primary.main,
    labels: []
  })

  // Label menu functions
  const openLabelMenuF = (event) => {
    event.stopPropagation()
    setLabelAnchorElF(event.currentTarget)
  }
  const closeLabelMenuF = () => {
    setLabelAnchorElF(null)
  }

  const handleEditNote = (updatedNote) => {
    setNote(updatedNote)
  }

  const handleColorChange = (newNote) => {
    setNote(newNote)
  }

  const closeNoteForm = async () => {
    // console.log('Clicked away !')
    setActive(false)
    if (note.title !== '' || note.content !== '') {
      await addNote(note)
    }
    setNote({
      title: '',
      content: '',
      color: theme.palette.primary.main,
      pinned: false,
      labels: []
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
        <Box
          sx={{
            mx: 'auto',
            maxWidth: '600px',
          }}
        >
              <NoteForm 
                handleEditNote={handleEditNote}
                note={note}
                labels={labels}
                deleteNote={deleteNote}
                changeColor={handleColorChange}
                onClose={closeNoteForm}
                newNote={true}
                onClickAway={closeNoteForm}
                isOpen={true}
                createLabel={createLabel}
                closeLabelMenu={closeLabelMenuF}
                openLabelMenu={openLabelMenuF}
                labelAnchorEl={labelAnchorElF}
                labelMenuOpen={labelMenuOpenF}
              />
        </Box> :
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