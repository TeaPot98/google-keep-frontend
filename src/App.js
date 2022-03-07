import React, { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import MiniDrawer from './components/MiniDrawer'
import Notes from './components/Notes'
import labelService from './services/labels'
import noteService from './services/notes'
import { themeOptions as light } from './themes/light'
import { ThemeProvider } from '@emotion/react'
import { Box } from '@mui/system'

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

    const openDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <ThemeProvider theme={light}>
            <TopBar openDrawer={openDrawer} />
            <Box sx={{ display: 'flex' }}>
                <MiniDrawer open={drawerOpen} labels={labels} />
                <Notes notes={notes} />
            </Box>
        </ThemeProvider>
    )
}

export default App