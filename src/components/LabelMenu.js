import React, { useState } from 'react'
import { 
    Menu,
    Box,
    Typography,
    TextField,
    InputAdornment,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'


const LabelMenu = ({ anchor, open, onClose, note, labels, changeNote }) => {
    const [labelsToShow, setLabelsToShow] = useState(labels)

    const handleLabelSearch = (event) => {
        if (event.target.value !== null && event.target.value !== undefined && event.target.value !== '') {
            setLabelsToShow(labels.filter(l => l.name.toLowerCase().includes(event.target.value.toLowerCase())))
        } else {
            setLabelsToShow(labels)
        }
    }

    return (
        <Menu
            anchorEl={anchor}
            open={open}
            onClose={onClose}
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
            </Box>
        </Menu>
    )
}

export default LabelMenu