import React, { useState, useEffect } from 'react'
import { themeOptions as light } from './themes/light'
import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/system'
import { Toolbar } from '@mui/material'
import {
    BrowserRouter as Router, 
    Routes, Route, Link, useNavigate
} from 'react-router-dom'

import labelService from './services/labels'
import noteService from './services/notes'

import TopBar from './components/TopBar'
import MiniDrawer from './components/MiniDrawer'
import Notes from './components/Notes'
import NewNote from './components/NewNote'

const App = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [labels, setLabels] = useState([])
    const [notes, setNotes] = useState([])

    useEffect(() => {
        console.log('Fetching labels...')
        labelService.getAll().then(response => setLabels(response))
    }, [])

    useEffect(() => {
        console.log('Fetching notes...')
        noteService.getAll().then(response => setNotes(response))
    }, [])

    const addNote = async (newNote) => {
        const addedNote = await noteService.create(newNote)
        setNotes([...notes, addedNote])
        console.log('New note is >>> ', addedNote)
    }

    const deleteNote = async (noteId) => {
        setNotes(notes.filter(n => n.id !== noteId))
        const response = await noteService.remove(noteId)
        console.log('The note successfuly removed >>> ', response)
    }

    const changeNote = async (updatedNote) => {
        // console.log('Changing note started')
        setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n))
        // console.log('Updated notes list')
        const response = await noteService.update(updatedNote)
        console.log('Note updated >>> ', response)
    }

    const openDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    const onDrawerClickAway = () => {
        // console.log('Drawer clicked away')
        if (drawerOpen) {
            setDrawerOpen(false)
            // console.log('Drawer clicked away when it is closed')
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
                    <NewNote 
                        addNote={addNote} 
                        deleteNote={deleteNote}
                    />
                    <Routes>
                        <Route 
                            path="/home"
                            element={
                                <Notes 
                                    notes={notes} 
                                    deleteNote={deleteNote}
                                    changeNote={changeNote}
                                />
                            }
                        />
                        <Route 
                            path="/reminders"
                            element={<></>}
                        />
                        <Route 
                            path="/label/:labelName"
                            element={<></>}
                        />
                        <Route 
                            path="/archive"
                            element={<></>}
                        />
                        <Route 
                            path="/trash"
                            element={<></>}
                        />
                    </Routes>
                    {/* <Notes 
                        notes={notes} 
                        deleteNote={deleteNote}
                        changeNote={changeNote}
                    /> */}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App