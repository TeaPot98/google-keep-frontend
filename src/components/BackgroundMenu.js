import React from 'react'
import { IconButton, Popover } from '@mui/material'
import noteService from '../services/notes'

const colors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

const ColorButton = ({ color, onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            size="large"
                sx={{
                    backgroundColor: color,
                    width: '32px',
                    height: '32px',
                    mx: 0.25,
                    border: '2px solid transparent',
                    "&:hover": {
                        backgroundColor: color,
                        borderColor: theme => theme.palette.text.accent
                    }
                }}
            >
        </IconButton>
    )
}

const BackgroundMenu = ({ open, onClose, anchor, onColorChange, note }) => {

    const changeColor = async (newColor) => {
        await onColorChange({
            ...note,
            color: newColor
        })
    }

    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            sx={{
                "&": {
                    display: 'flex',
                    borderRadius: 7,
                    px: 1,
                }
            }}
        >
            {colors.map(c => 
                <ColorButton 
                    key={c} 
                    color={c}
                    onClick={() => {
                        changeColor(c)
                        onClose()
                    }}
                />
            )}
        </Popover>
    )
}

export default BackgroundMenu