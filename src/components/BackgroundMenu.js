import React from 'react'
import { IconButton, Popover, Badge } from '@mui/material'
import FormatColorResetOutlinedIcon from '@mui/icons-material/FormatColorResetOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { useTheme } from '@emotion/react'

import { useDispatch } from 'react-redux'
import { editNote } from '../reducers/noteSlice'

import ColorButton from './ColorButton'

const colors = ['#fff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed']

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