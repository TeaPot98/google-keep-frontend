import React from 'react'
import { IconButton, Menu } from '@mui/material'

const colors = ['#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

const ColorButton = ({ color }) => {
    return (
        <IconButton
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

const BackgroundMenu = ({ open, onClose, anchor }) => {

    return (
        <Menu
            open={open}
            onClose={onClose}
            anchorEl={anchor}
            sx={{
                display: 'flex',
                borderRadius: 7,
                px: 1,
            }}
        >
            {colors.map(c => 
                <ColorButton key={c} color={c}/>
            )}
        </Menu>
    )
}

export default BackgroundMenu