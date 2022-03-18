import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import {
    Box,
    Typography,
    Paper,
    Badge,
    Tooltip
} from '@mui/material'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ArchiveOutlined } from '@mui/icons-material';

import NoteButton from './NoteButton'
import BackgroundMenu from './BackgroundMenu';

const NoteContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'start',
    color: theme.palette.text.primary,
    // variant: 'outlined',
    borderRadius: 7
}))

const Note = ({ note, deleteNote }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const removeNote = async () => {
        await deleteNote(note.id)
    }
    
    return (
        <Badge
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            overlap="rectangular"
            badgeContent={
                <Tooltip title="Select note">
                    <CheckCircleIcon
                        sx={{
                            cursor: 'pointer',
                            transition: 'auto 0.5s ease-in-ease-out'
                        }}
                        onClick={() => console.log('Clicked the check button')}
                    />
                </Tooltip>
            }
            sx={{
                m: 0,
                p: 0,
                display: 'inline',
                // "& :hover": {
                //     opacity: 0
                // }
                "& .MuiBadge-badge, .noteButton": {
                    opacity: 0,
                    transition: 'opacity 0.218s ease-in-out, color 0.218s ease-in-out'
                },
                "&:hover .MuiBadge-badge": {
                    opacity: 1
                },
                "&:hover .noteButton": {
                    opacity: 1
                },
                "&:hover .noteContainer": {
                    boxShadow: '0px 1px 3px grey'
                }
            }}
        >
            <NoteContainer 
                elevation={0} 
                variant="outlined"
                className="noteContainer"
            >
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Typography 
                            variant="subtitle1" 
                            component="p"
                            sx={{
                                mt: theme => theme.spacing(1),
                                ml: theme => theme.spacing(2),
                                cursor: 'default',
                                color: theme => theme.palette.text.accent
                            }}
                        >
                            {note.title}
                        </Typography>
                        <NoteButton
                            onClick={() => {}}
                            tooltip="Pin note"
                            size="normal"
                        >
                            <PushPinOutlinedIcon />
                        </NoteButton>
                    </Box>
                    <Box
                        sx={{
                            padding: theme => theme.spacing(2)
                        }}
                    >
                        <Typography 
                            component="p"
                            variant="inherit"
                            sx={{
                                cursor: 'default'
                            }}
                        >
                            {note.content}
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end'
                    }}
                >
                    <NoteButton
                        onClick={handleClick}
                        tooltip="Background options"
                    >
                        <PaletteOutlinedIcon fontSize='small'/>
                    </NoteButton>
                    <NoteButton
                        onClick={() => {}}
                        tooltip="Add image"
                    >
                        <InsertPhotoOutlinedIcon fontSize='small'/>
                    </NoteButton>
                    <NoteButton
                        onClick={() => {}}
                        tooltip="Add label"
                    >
                        <LabelOutlinedIcon fontSize='small'/>
                    </NoteButton>
                    <NoteButton
                        onClick={() => {}}
                        tooltip="Archive"
                    >
                        <ArchiveOutlined fontSize='small'/>
                    </NoteButton>
                    <NoteButton
                        onClick={removeNote}
                        tooltip="Delete note"
                    >
                        <DeleteOutlineOutlinedIcon fontSize='small'/>
                    </NoteButton>
                </Box>
                <BackgroundMenu 
                    open={open}
                    onClose={handleClose}
                    anchor={anchorEl}
                />
            </NoteContainer>
        </Badge>
    )
}

export default Note