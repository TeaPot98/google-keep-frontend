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
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const EditLabels = ({ 
    onClose, 
    open, 
    labels,
    createLabel,
    editLabel,
    removeLabel
}) => {
    const [newLabelField, setNewLabelField] = useState('')

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle
                sx={{
                    fontSize: '1rem',
                    color: theme => theme.palette.text.accent
                }}
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
                    sx={{
                        label: { color: theme => theme.palette.text.accent },
                        mt: theme => theme.spacing(1),
                        ml: theme => theme.spacing(2),
                    }}
                    placeholder="Create new label"
                />
                <Tooltip title="Create label">
                    <IconButton
                        onClick={() => {
                            createLabel(newLabelField)
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

const EditLabelItem = ({ label, createLabel, removeLabel, editLabel }) => {
    const [value, setValue] = useState(label.name)

    return (
        <ListItem
            dense={true}
        >
            <Tooltip title="Delete label">
                <IconButton onClick={() => removeLabel(label.id)}>
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
                sx={{
                    label: { color: theme => theme.palette.text.accent },
                    mt: theme => theme.spacing(1),
                    ml: theme => theme.spacing(2),
                }}
                placeholder="Title"
            />
            <Tooltip title="Rename label">
                <IconButton
                    onClick={() => editLabel({
                        ...label,
                        name: value
                    })}
                >
                    <CheckIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
        </ListItem>
    )
}

export default EditLabels