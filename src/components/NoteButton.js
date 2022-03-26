import React from 'react'
import { 
    Tooltip,
    IconButton
} from '@mui/material'

const NoteButton = ({ children, onClick, tooltip, size='small' }) => {
    return (
        <Tooltip 
            title={tooltip}
            className="noteButton"
            sx={{
                zIndex: 2002,
            }}
        >
            <IconButton
                size={size}
                sx={{
                    // color: theme => theme.palette.text.primary,
                    m: theme => theme.spacing(0.5),
                    transition: 'color 0.2s',
                    '&:hover': {
                        color: theme => theme.palette.text.accent
                    },
                    zIndex: 500
                }}
                onClick={onClick}
            >
                {children}
            </IconButton>
        </Tooltip>
    )
}

export default NoteButton