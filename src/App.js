import React, { useState, useEffect } from 'react'
import { themeOptions as light } from './themes/light'
import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/system'
import { Toolbar } from '@mui/material'
import {
    Routes, 
    Route, 
    useLocation
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
    const [searchString, setSearchString] = useState('')
    const [foundNotes, setFoundNotes] = useState([])

    const location = useLocation()
    // console.log('Current route >> ', location)

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
        console.log('The note sent to update >>> ', updatedNote)
        // console.log('Updated notes list')
        const response = await noteService.update(updatedNote)
        // console.log('Note updated >>> ', response)
    }

    const createLabel = async (newLabel) => {
        const addedLabel = await labelService.create(newLabel)
        setLabels([...labels, addedLabel])
        return addedLabel
    }

    const removeLabel = async (labelId) => {
        setLabels(labels.filter(l => l.id !== labelId))
        // setNotes(notes.map(n => {
        //     let editedNote = {
        //         ...n,
        //         labels: n.labels.filter(l => l.id !== labelId)
        //     }
        //     console.log('EditedNote from removeLabel >>> ', editedNote)
        //     return editedNote
        // }))
        notes.map(n => {
            n.labels.map(l => {
                if (l.id === labelId) {
                    changeNote({
                        ...n,
                        labels: n.labels.filter(l => l.id !== labelId)
                    })
                }
            })
        })
        const response = await labelService.remove(labelId)
        console.log('Label successfuly removed >>> ', response)
    }

    const editLabel = async (updatedLabel) => {
        setLabels(labels.map(l => l.id !== updatedLabel.id ? l : updatedLabel))
        setNotes(notes.map(n => {
            let editedNote = {
                ...n,
                labels: n.labels.map(l => l.id !== updatedLabel.id ? l : updatedLabel)
            }
            return editedNote
        }))
        const response = await labelService.update(updatedLabel)
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

    const handleNoteSearch = (searchText) => {
        setSearchString(searchText)
        setFoundNotes(notes.filter(n => n.title.includes(searchString) || n.content.includes(searchString)))
        console.log('Found notes >>> ', foundNotes)
    }



    return (
        <ThemeProvider theme={light}>
            <TopBar 
                openDrawer={openDrawer} 
                searchString={searchString}
                handleNoteSearch={handleNoteSearch}
            />
            <Box 
                sx={{ 
                    display: 'flex', 
                }}
            >
                <MiniDrawer 
                    open={drawerOpen} 
                    labels={labels}
                    removeLabel={removeLabel}
                    createLabel={createLabel}
                    editLabel={editLabel}
                    // onMouseEnter={() => setDrawerOpen(true)}
                />
                <Box 
                    sx={{
                        flex: 1
                    }}
                    onClick={onDrawerClickAway}
                >
                    <Toolbar />
                    {searchString === '' && location.pathname !== '/archive' && location.pathname !== '/trash' ?
                        <NewNote 
                            labels={labels}
                            addNote={addNote} 
                            deleteNote={deleteNote}
                            createLabel={createLabel}
                        /> :
                        null
                    }
                    <Routes>
                        <Route 
                            path="/home"
                            element={
                                <Notes 
                                    notes={searchString === '' ? notes.filter(n => !n.deleted && !n.archived) : foundNotes.filter(n => !n.deleted && !n.archived)} 
                                    labels={labels}
                                    deleteNote={deleteNote}
                                    changeNote={changeNote}
                                    createLabel={createLabel}
                                />
                            }
                        />
                        <Route 
                            path="/reminders"
                            element={<></>}
                        />
                        <Route 
                            path="/label/:labelName"
                            element={
                                <Notes 
                                    notes={notes} 
                                    labels={labels}
                                    deleteNote={deleteNote}
                                    changeNote={changeNote}
                                    createLabel={createLabel}
                                />
                            }
                        />
                        <Route 
                            path="/archive"
                            element={
                                <Notes 
                                    notes={notes.filter(n => n.archived && !n.deleted)} 
                                    labels={labels}
                                    deleteNote={deleteNote}
                                    changeNote={changeNote}
                                    createLabel={createLabel}
                                />
                            }
                        />
                        <Route 
                            path="/trash"
                            element={
                                <Notes 
                                    notes={notes.filter(n => n.deleted)} 
                                    labels={labels}
                                    deleteNote={deleteNote}
                                    changeNote={changeNote}
                                    createLabel={createLabel}
                                />
                            }
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