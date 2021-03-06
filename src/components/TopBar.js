import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { 
    Toolbar,
    Box, 
    AppBar, 
    IconButton,
    Typography, 
    InputBase,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
    }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch'
        }
    }
}))

const TopBar = ({ openDrawer, searchString, handleNoteSearch }) => {
    const styles = {
        appBar: {
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderBottomColor: theme => theme.palette.divider,
            zIndex: theme => theme.zIndex.drawer + 1
        },
        drawerButton: { 
            mr: 2 
        },
        appNameText: { 
            display: { 
                xs: 'none', 
                sm: 'block' 
            } 
        },
        buttonsContainer: { 
            display: 'flex' 
        },
    }
    
    return (
        <Box>
            <AppBar 
                elevation={0} 
                sx={styles.appBar}
            >
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        aria-label='open drawer'
                        onClick={openDrawer}
                        sx={styles.drawerButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        color='default'
                        sx={styles.appNameText}
                    >
                        Keep
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase 
                            placeholder='Search...'
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(event) => handleNoteSearch(event.target.value)}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={styles.buttonsContainer} >
                        {/* <IconButton
                            size='large'
                        >
                            <RefreshIcon />
                        </IconButton> */}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopBar