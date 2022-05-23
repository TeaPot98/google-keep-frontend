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
import AddIcon from '@mui/icons-material/Add'

import { useDispatch, useSelector } from 'react-redux'
import { editNote } from '../reducers/noteSlice'
import { createLabel, selectLabels } from '../reducers/labelSlice'


const LabelMenu = ({ 
    anchor, 
    open, 
    onClose, 
    note, 
    changeNote,
    // labelMenuLocation
}) => {
    const dispatch = useDispatch()
    const labels = useSelector(selectLabels)
    const [labelSearchString, setLabelSearchString] = useState('')
    const [labelsToShow, setLabelsToShow] = useState(labels)

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
        const addedLabel = await dispatch(createLabel(labelSearchString))
        if (changeNote) {
            changeNote({
                ...note,
                labels: [...note.labels, addedLabel]
            })
        } else {
            dispatch(editNote({
                ...note,
                labels: [...note.labels, addedLabel]
            }))
        }
        // console.log(addedLabel)
        setLabelSearchString('')
        setLabelsToShow([...labels, addedLabel])
    }

    const addLabel = (event, currentLabel) => {
        const labelChecked = note.labels.map(l => l.id).includes(currentLabel.id)
        if (labelChecked) {
            if (changeNote) {
                changeNote({
                    ...note,
                    labels: note.labels.filter(l => l.id !== currentLabel.id)
                })
            } else {
                dispatch(editNote({
                    ...note,
                    labels: note.labels.filter(l => l.id !== currentLabel.id)
                }))
            }
        } else {
            if (changeNote) {
                changeNote({
                    ...note,
                    labels: [...note.labels, currentLabel]
                })
            } else {
                dispatch(editNote({
                    ...note,
                    labels: [...note.labels, currentLabel]
                }))
            }
        }
    }

    const handleClose = () => {
        setLabelSearchString('')
        onClose()
    }

    const styles = {
        container: {
            zIndex: 2002,
        },
        header: {
            px: theme => theme.spacing(1)
        },
        headerTitle: {
            fontSize: '0.9rem',
            color: theme => theme.palette.text.accent
        },
        searchField: {
            // Target and style the placeholder!!
            "& input::placeholder": {
                fontSize: '0.85rem'
            }
        },
        searchIcon: {
            color: theme => theme.palette.text.hint,
            fontSize: '1rem'
        },
        labelList: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            maxHeight: '400px',
            px: theme => theme.spacing(1)
        },
        labelCheckbox: {
            color: theme => theme.palette.text.secondary,
            "&.Mui-checked": {
                color: theme => theme.palette.text.secondary,
            }
        },
        labelName: {
            fontSize: '0.85rem',
        },
    }

    return (
        <Menu
            anchorEl={anchor}
            open={open}
            onClose={handleClose}
            sx={styles.container}
        >
            <Box
                sx={styles.header}
            >    
                <Typography
                    sx={styles.headerTitle}
                >
                    Label note
                </Typography>
                <TextField
                    fullWidth
                    variant="standard"   
                    placeholder="Enter label name"
                    sx={styles.searchField}
                    value={labelSearchString}
                    onChange={handleLabelSearch}
                    InputProps={{
                        endAdornment:  
                            <InputAdornment position="end">
                                <SearchIcon 
                                    sx={styles.searchIcon}
                                />
                            </InputAdornment>,
                        disableUnderline: true,
                    }}
                />
            </Box>
                {labelsToShow.length > 0 ?
                    <Box
                    sx={styles.labelList}
                    >
                    {labelsToShow.map((l) => 
                            <FormControlLabel
                                key={l.id}
                                control={
                                    <Checkbox
                                        size="small" 
                                        checked={note.labels.map(l => l.id).includes(l.id)}
                                        onChange={(event) => addLabel(event, l)}
                                        sx={styles.labelCheckbox}
                                    />
                                }
                                label={
                                    <Typography
                                        sx={styles.labelName}
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
                                sx={styles.labelName}
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