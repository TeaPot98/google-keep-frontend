import React, { useState } from 'react'
import { 
  Paper,
  Typography, 
  Box
} from '@mui/material'
import NewNoteForm from './NewNoteForm'
import { useTheme } from '@emotion/react'

import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteSlice'

const NewNote = ({ labels }) => {
  const dispatch = useDispatch()
  const theme = useTheme()

  // Label menu anchor
  const [labelAnchorElF, setLabelAnchorElF] = useState(null)
  const labelMenuOpenF = Boolean(labelAnchorElF)
  
  const [active, setActive] = useState(false)
  const [note, setNote] = useState({
    title: '',
    content: '',
    pinned: false,
    color: '#fff',
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

  const openNoteForm = async () => {
    setActive(true)
  }

  const closeNoteForm = async () => {
    // console.log('Clicked away !')
    setActive(false)
    if (note.title !== '' || note.content !== '') {
      await dispatch(createNote(note))
    }
    setNote({
      title: '',
      content: '',
      color: theme.palette.primary.main,
      pinned: false,
      labels: []
    })
  }
  
  const styles = {
    container: {
      display: 'block',
      animationDuration: '3s',
      animationName: 'slidein',
    },
    noteFormWrapper: {
      mx: 'auto',
      maxWidth: '600px',
    },
    newNotePaper: { 
      mt: 3, 
      mx: 'auto',
      py: 1,
      px: 2,
      cursor: 'text',
      border: `1px solid ${theme => theme.palette.divider}`,
      maxWidth: '568px',
    },
    placeholderText: {
      color: theme => theme.palette.text.primary,
    },
  }

  return (
    <Box
      sx={styles.container}
    >
      {active ?
        <Box
          sx={styles.noteFormWrapper}
        >
          <NewNoteForm 
            handleEditNote={handleEditNote}
            note={note}
            changeColor={handleColorChange}
            onClose={closeNoteForm}
            onClickAway={closeNoteForm}
            closeLabelMenu={closeLabelMenuF}
            openLabelMenu={openLabelMenuF}
            labelAnchorEl={labelAnchorElF}
            labelMenuOpen={labelMenuOpenF}
          />
        </Box> :
        <Paper 
          elevation={4} 
          onClick={openNoteForm}
          sx={styles.newNotePaper}
        >
          <Typography 
            variant="subtitle1" 
            component="p"
            sx={styles.placeholderText}
          >
            New note...
          </Typography>
        </Paper>
      }
    </Box>
  )
}

export default NewNote