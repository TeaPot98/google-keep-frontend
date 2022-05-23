import React, { useState } from 'react'
import {
    ListItem,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'

import { selectNotes, editNote } from '../reducers/noteSlice'
import { useDispatch, useSelector } from 'react-redux'

const EditLabelItem = ({ label, removeLabel, editLabel }) => {
  const [value, setValue] = useState(label.name)
  const dispatch = useDispatch()
  const notes = useSelector(selectNotes)

  const deleteLabel = () => {
      notes.map(n => {
          n.labels.map(l => {
              if (l.id === label.id) {
                  dispatch(editNote({
                      ...n,
                      labels: n.labels.filter(l => l.id !== label.id)
                  }))
              }
          })
      })
      dispatch(removeLabel(label.id))
  }

  const styles = {
      labelTextField: {
          label: { color: theme => theme.palette.text.accent },
          mt: theme => theme.spacing(1),
          ml: theme => theme.spacing(2),
      },
  }

  return (
      <ListItem
          dense={true}
      >
          <Tooltip title="Delete label">
              <IconButton onClick={deleteLabel}>
                  <DeleteIcon fontSize="small" /> 
              </IconButton>
          </Tooltip>
          <TextField 
              fullWidth 
              value={value}
              variant="standard"
              InputProps={{
                  disableUnderline: true
              }}
              onChange={(event) => setValue(event.target.value)}
              sx={styles.labelTextField}
              placeholder="Title"
          />
          <Tooltip title="Rename label">
              <IconButton
                  onClick={() => dispatch(editLabel({
                      ...label,
                      name: value
                  }))}
              >
                  <CheckIcon fontSize="small"/>
              </IconButton>
          </Tooltip>
      </ListItem>
  )
}

export default EditLabelItem