import React, { useState } from 'react'
import TopBar from './components/TopBar'
import MiniDrawer from './components/MiniDrawer'
import { themeOptions as light } from './themes/light'
import { ThemeProvider } from '@emotion/react'

const App = () => {
    const [drawerOpened, setDrawerOpened] = useState(false)

    const openDrawer = () => {
        setDrawerOpened(!drawerOpened)
    }

    return (
        <ThemeProvider theme={light}>
            <TopBar openDrawer={openDrawer} />
            <MiniDrawer open={drawerOpened}/>
        </ThemeProvider>
    )
}

export default App