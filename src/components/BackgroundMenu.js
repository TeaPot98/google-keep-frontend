import React from 'react'
import { IconButton, Popover, Badge } from '@mui/material'
import FormatColorResetOutlinedIcon from '@mui/icons-material/FormatColorResetOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { useTheme } from '@emotion/react';

const colors = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

const ColorButton = ({ color, onClick, note }) => {
    return (
        <Badge
            invisible={note.color !== color}
            overlap="circular"
            badgeContent={
                note.color === color ? 
                <CheckOutlinedIcon 
                    fontSize="15px"
                    sx={{
                        m: 0,
                        p: 0,
                    }}
                /> : 
                null
            }
            sx={{
                "& .MuiBadge-badge": {
                    m: 0,
                    p: 0,
                    width: '5px',
                    height: '10px',
                    color: 'white',
                    backgroundColor: theme => theme.palette.other.purple,
                }
            }} 
        >
            <IconButton
                disableRipple={true}
                onClick={() => {
                    onClick()
                    console.log('Color button clicked!')
                }}
                size="large"
                    sx={{
                        backgroundColor: color,
                        width: '32px',
                        height: '32px',
                        mx: 0.25,
                        border: theme => `2px solid ${color === '#fff' && color !== note.color ? theme.palette.divider : color === note.color ? theme.palette.other.purple : 'transparent '}`,
                        "&:hover": {
                            backgroundColor: color,
                            borderColor: theme => color === note.color ? theme.palette.other.purple : theme.palette.text.accent
                        }
                    }}
            >
                {color === '#fff' ? 
                    <FormatColorResetOutlinedIcon
                    fontSize="small"
                        sx={{
                            color: theme => theme.palette.text.accent
                        }}
                    /> : 
                    null
                }
            </IconButton>
        </Badge>
    )
}

const BackgroundMenu = ({ open, onClose, anchor, onColorChange, note, handleEditNote = (c) => {} }) => {
    // console.log()
    const changeColor = (newColor) => {
        handleEditNote({
            ...note,
            // labels: note.labels.map(l => l.id),
            color: newColor
        })
        onColorChange({
            ...note,
            labels: note.labels.map(l => l.id),
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
                display: 'flex',
                zIndex: 2002,
                "& .MuiPopover-paper": {
                    borderRadius: '7px',
                    padding: 1,
                }
            }}
        >
            {colors.map(c => 
                <ColorButton 
                    key={c} 
                    color={c}
                    note={note}
                    onClick={() => {
                        changeColor(c)
                    }}
                />
            )}
        </Popover>
    )
}

export default BackgroundMenu