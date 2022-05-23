import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    List,
    ListItem,
    TextField,
    IconButton,
    Tooltip
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import { selectLabels, createLabel, removeLabel, editLabel } from '../reducers/labelSlice'
import { useDispatch, useSelector } from 'react-redux'

import EditLabelItem from './EditLabelItem'

const EditLabels = ({ 
    onClose, 
    open, 
}) => {
    const [newLabelField, setNewLabelField] = useState('')
    const dispatch = useDispatch()
    const labels = useSelector(selectLabels)

    const styles = {
        dialogTitle: {
            fontSize: '1rem',
            color: theme => theme.palette.text.accent
        },
        labelTextField: {
            label: { color: theme => theme.palette.text.accent },
            mt: theme => theme.spacing(1),
            ml: theme => theme.spacing(2),
        },
    }
    
    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle
                sx={styles.dialogTitle}
            >
                Edit labels
            </DialogTitle>
            <ListItem
                dense={true}
            >
                <Tooltip title="Delete label">
                    <IconButton onClick={() => setNewLabelField('')}>
                        <CloseIcon fontSize="small" /> 
                    </IconButton>
                </Tooltip>
                <TextField 
                    fullWidth 
                    value={newLabelField}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true
                    }}
                    onChange={(event) => setNewLabelField(event.target.value)}
                    sx={styles.labelTextField}
                    placeholder="Create new label"
                />
                <Tooltip title="Create label">
                    <IconButton
                        onClick={() => {
                            dispatch(createLabel(newLabelField))
                            setNewLabelField('')
                        }}
                    >
                        <CheckIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
            </ListItem>
            <List>
                {labels.map((label) => 
                    <EditLabelItem 
                        key={label.id}
                        label={label}
                        createLabel={createLabel}
                        editLabel={editLabel}
                        removeLabel={removeLabel}
                    />
                )}
            </List>
        </Dialog>
    )
}

export default EditLabels