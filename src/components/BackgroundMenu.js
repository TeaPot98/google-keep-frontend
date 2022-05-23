import React from 'react'
import { IconButton, Popover, Badge } from '@mui/material'
import FormatColorResetOutlinedIcon from '@mui/icons-material/FormatColorResetOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useTheme } from '@emotion/react'

import { useDispatch } from 'react-redux'
import { editNote } from '../reducers/noteSlice'

const colors = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

const ColorButton = ({ color, onClick, note }) => {
    const styles = {
        badge: {
            "& .MuiBadge-badge": {
                m: 0,
                p: 0,
                width: '5px',
                height: '10px',
                color: 'white',
                backgroundColor: theme => theme.palette.other.purple,
            }
        },
        badgeIcon: {
            m: 0,
            p: 0,
        },
        colorButton: {
            backgroundColor: color,
            width: '32px',
            height: '32px',
            mx: 0.25,
            border: theme => `2px solid ${color === '#fff' && color !== note.color ? theme.palette.divider : color === note.color ? theme.palette.other.purple : 'transparent '}`,
            "&:hover": {
                backgroundColor: color,
                borderColor: theme => color === note.color ? theme.palette.other.purple : theme.palette.text.accent
            }
        },
        colorButtonIcon: {
            color: theme => theme.palette.text.accent
        }
    }
    
    return (
        <Badge
            invisible={note.color !== color}
            overlap="circular"
            sx={styles.badge} 
            badgeContent={
                note.color === color ? 
                <CheckOutlinedIcon 
                    fontSize="15px"
                    sx={styles.badgeIcon}
                /> : 
                null
            }
        >
            <IconButton
                disableRipple={true}
                onClick={() => {
                    onClick()
                    console.log('Color button clicked!')
                }}
                size="large"
                    sx={styles.button}
            >
                {color === '#fff' ? 
                    <FormatColorResetOutlinedIcon
                    fontSize="small"
                        sx={styles.colorButtonIcon}
                    /> : 
                    null
                }
            </IconButton>
        </Badge>
    )
}

const BackgroundMenu = ({ open, onClose, anchor, note, handleEditNote = (c) => {} }) => {
    const dispatch = useDispatch()
    // console.log()
    const changeColor = (newColor) => {
        if (handleEditNote) {
            handleEditNote({
                ...note,
                // labels: note.labels.map(l => l.id),
                color: newColor
            })
        } else {
            dispatch(editNote({
                ...note,
                // labels: note.labels.map(l => l.id),
                color: newColor
            }))
        }
    }

    const styles = {
        container: {
            display: 'flex',
            zIndex: 2002,
            "& .MuiPopover-paper": {
                borderRadius: '7px',
                padding: 1,
            }
        }
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
            sx={styles.container}
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