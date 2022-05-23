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
import { fetchNotes, createNote, removeNote, selectNotes, editNote } from './reducers/noteSlice'
import { selectLabels, fetchLabels } from './reducers/labelSlice'

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
                                />
                            }
                        />
                        <Route 
                            path="/archive"
                            element={
                                <Notes 
                                    notes={notes.filter(n => n.archived && !n.deleted)} 
                                    labels={labels}
                                />
                            }
                        />
                        <Route 
                            path="/trash"
                            element={
                                <Notes 
                                    notes={notes.filter(n => n.deleted)} 
                                    labels={labels}
                                />
                            }
                        />
                    </Routes>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App