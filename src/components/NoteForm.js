import React, { useState } from 'react'
import { 
  Paper,
  TextField,
  Typography,
} from '@mui/material'

const NoteForm = ({ note, handleTitleChange, handleContentChange }) => {
  
  return (
    <Paper 
      elevation={4} 
      sx={{ 
        mt: 3, 
        mx: 1, 
        py: 1,
        px: 2,
        cursor: 'text',
        border: `1px solid ${theme => theme.palette.divider}`
      }}
    >
      <TextField 
        fullWidth 
        variant="standard"
        InputProps={{
          disableUnderline: true
        }}
        sx={{
          label: { color: theme => theme.palette.text.secondary }
        }}
        placeholder="Title"
        onChange={handleTitleChange}
        value={note.title}
      />
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
    </Paper>
  )
}

export default NoteForm