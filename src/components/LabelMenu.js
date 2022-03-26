import React, { useState } from 'react'
import { 
    Menu,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Checkbox,
    FormControlLabel,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@emotion/react';


const LabelMenu = ({ anchor, open, onClose, note, labels, changeNote, createLabel }) => {
    // const theme = useTheme()
    const [labelSearchString, setLabelSearchString] = useState('')
    const [labelsToShow, setLabelsToShow] = useState(labels)
    const [checkedLabels, setCheckedLabels] = useState(note.labels.map(l => {
        return l.id
    }))
    console.log('The note passed to LabelMenu', note)
    // console.log('The Note object recievied by LabelMenu >>> ', note)

    const handleLabelSearch = (event) => {
        if (event.target.value !== null && event.target.value !== undefined && event.target.value !== '') {
            setLabelSearchString(event.target.value)
            setLabelsToShow(labels.filter(l => l.name.toLowerCase().includes(event.target.value.toLowerCase())))
        } else {
            setLabelSearchString('')
            setLabelsToShow(labels)
        }
    }

    const createNewLabel = async () => {
        const addedLabel = await createLabel(labelSearchString)
        setCheckedLabels([...checkedLabels, addedLabel.id])
        console.log(checkedLabels)
        changeNote({
            ...note,
            labels: [...note.labels.map(l => l.id), addedLabel.id]
        })
        console.log(addedLabel)
        setLabelSearchString('')
        setLabelsToShow([...labels, addedLabel])
    }

    const addLabel = (event, currentLabel) => {
        const labelChecked = checkedLabels.includes(currentLabel.id)
        if (labelChecked) {
            setCheckedLabels(checkedLabels.filter(l => l !== currentLabel.id))
            console.log(checkedLabels)
            changeNote({
                ...note,
                labels: note.labels.map(l => l.id !== currentLabel.id ? l.id : null)
            })
        } else {
            setCheckedLabels([...checkedLabels, currentLabel.id])
            console.log(checkedLabels)
            changeNote({
                ...note,
                labels: [...note.labels.map(l => l.id), currentLabel.id]
            })
        }
    }

    const handleClose = () => {
        setLabelSearchString('')
        onClose()
    }

    return (
        <Menu
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            sx={{
                zIndex: 2002,
            }}
        >
            <Box
                sx={{
                    px: theme => theme.spacing(1)
                }}
            >    
                <Typography
                    sx={{
                        fontSize: '0.9rem',
                        color: theme => theme.palette.text.accent
                    }}
                >
                    Label note
                </Typography>
                <TextField
                    fullWidth
                    variant="standard"   
                    placeholder="Enter label name"
                    sx={{
                        // Target and style the placeholder!!
                        "& input::placeholder": {
                            fontSize: '0.85rem'
                        }
                    }}
                    value={labelSearchString}
                    onChange={handleLabelSearch}
                    InputProps={{
                        endAdornment:  
                            <InputAdornment position="end">
                                <SearchIcon 
                                    sx={{
                                        color: theme => theme.palette.text.hint,
                                        fontSize: '1rem'
                                    }}
                                />
                            </InputAdornment>,
                        disableUnderline: true,
                    }}
                />
            </Box>
                {labelsToShow.length > 0 ?
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        maxHeight: '400px',
                        px: theme => theme.spacing(1)
                    }}
                    >
                    {labelsToShow.map((l) => 
                            <FormControlLabel
                                key={l.id}
                                control={
                                    <Checkbox
                                        size="small" 
                                        checked={checkedLabels.includes(l.id)}
                                        onChange={(event) => addLabel(event, l)}
                                        sx={{
                                            color: theme => theme.palette.text.secondary,
                                            "&.Mui-checked": {
                                                color: theme => theme.palette.text.secondary,
                                            }
                                        }}
                                    />
                                }
                                label={
                                    <Typography
                                        sx={{
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        {l.name}
                                    </Typography>
                                }
                                // labelPlacement="end"
                                // sx={{
                                //     display: 'flex',
                                //     flexDirection: 'column'
                                // }}
                            />
                        )}
                    </Box> :
                    <MenuItem
                        onClick={createNewLabel}
                    >
                        <ListItemIcon>
                            <AddIcon 
                                fontSize="small"
                            />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography
                                component="p"
                                sx={{
                                    fontSize: '0.85rem'
                                }}
                            >
                                Create <b>"{labelSearchString}"</b>
                            </Typography>
                        </ListItemText>
                    </MenuItem>
                }
        </Menu>
    )
}

export default LabelMenu