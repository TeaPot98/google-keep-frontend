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

import { useSelector, useDispatch } from 'react-redux'
import labelService from './services/labels'
import { fetchNotes, createNote, removeNote, selectNotes, editNote } from './reducers/noteSlice'
import { selectLabels, fetchLabels, createLabel, removeLabel, editLabel } from './reducers/labelSlice'

import TopBar from './components/TopBar'
import MiniDrawer from './components/MiniDrawer'
import Notes from './components/Notes'
import NewNote from './components/NewNote'

const App = () => {
    const dispatch = useDispatch()
    const notes = useSelector(selectNotes)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const labels = useSelector(selectLabels)
    const [searchString, setSearchString] = useState('')
    const [foundNotes, setFoundNotes] = useState([])

    const location = useLocation()

    useEffect(() => {
        console.log('Fetching labels...')
        dispatch(fetchLabels())
    }, [])

    useEffect(() => {
        console.log('Fetching notes...')
        dispatch(fetchNotes())
    }, [])

    const addNote = async (newNote) => {
        dispatch(createNote(newNote))
    }

    const deleteNote = async (noteId) => {
        dispatch(removeNote(noteId))
        console.log('The note successfuly removed !')
    }

    const changeNote = async (updatedNote) => {
        dispatch(editNote(updatedNote))
    }

    const createLabel = (newLabel) => {
        console.log('Creating label from App')
        dispatch(createLabel(newLabel))
    }

    const removeLabel = async (labelId) => {
        dispatch(removeLabel(labelId))
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
        dispatch(editLabel(updatedLabel))
        // setNotes(notes.map(n => {
        //     let editedNote = {
        //         ...n,
        //         labels: n.labels.map(l => l.id !== updatedLabel.id ? l : updatedLabel)
        //     }
        //     return editedNote
        // }))
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