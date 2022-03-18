import React, { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import MiniDrawer from './components/MiniDrawer'
import Notes from './components/Notes'
import NewNote from './components/NewNote'
import labelService from './services/labels'
import noteService from './services/notes'
import { themeOptions as light } from './themes/light'
import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/system'
import { Toolbar } from '@mui/material'

const App = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [labels, setLabels] = useState([])
    const [notes, setNotes] = useState([])

    useEffect(() => {
        labelService.getAll().then(response => setLabels(response))
    }, [])

    useEffect(() => {
        noteService.getAll().then(response => setNotes(response))
    }, [])

    const addNote = async (newNote) => {
        const addedNote = await noteService.create(newNote)
        console.log('New note is >>> ', addedNote)
        setNotes([...notes, addedNote])
    }

    const deleteNote = async (noteId) => {
        const response = await noteService.remove(noteId)
        console.log('The note successfuly removed >>> ', response)
        setNotes(notes.filter(n => n.id !== noteId))
    }

    const changeColor = async (updatedNote) => {
        const response = await noteService.update(updatedNote)
        console.log('Color updated >>> ', response)
        setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
    }

    const openDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const onDrawerClickAway = () => {
        console.log('Drawer clicked away')
        if (drawerOpen) {
            setDrawerOpen(false)
            console.log('Drawer clicked away when it is closed')
        }
    }

    return (
        <ThemeProvider theme={light}>
            <TopBar openDrawer={openDrawer} />
            <Box 
                sx={{ 
                    display: 'flex', 
                }}
            >
                <MiniDrawer 
                    open={drawerOpen} 
                    labels={labels} 
                    onMouseEnter={() => setDrawerOpen(true)}
                />
                <Box 
                    sx={{
                        flex: 1
                    }}
                    onClick={onDrawerClickAway}
                >
                    <Toolbar />
                    <NewNote addNote={addNote} />
                    <Notes 
                        notes={notes} 
                        deleteNote={deleteNote}
                        changeColor={changeColor}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App