import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import { useTheme } from '@material-ui/core/styles'
import { 
    Toolbar,
    Box, 
    AppBar, 
    IconButton,
    Typography, 
    InputBase,
    Badge

} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
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

const TopBar = ({ openDrawer }) => {
    return (
        <Box>
            <AppBar 
                elevation={0} 
                sx={{
                    borderBottomStyle: 'solid',
                    borderBottomWidth: 1,
                    borderBottomColor: theme => theme.palette.divider,
                    zIndex: theme => theme.zIndex.drawer + 1
                }}
            >
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        aria-label='open drawer'
                        onClick={openDrawer}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        color='default'
                        sx={{ display: { xs: 'none', sm: 'block' } }}
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
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }} >
                        <IconButton
                            size='large'
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            size='large'
                        >
                            <RefreshIcon />
                        </IconButton>
                        <IconButton
                            size='large'
                        >
                            <SettingsOutlinedIcon />
                        </IconButton>
                        <IconButton
                            size='large'
                            edge='end'
                            aria-label='account of current user'
                            // aria-controls={menuId}
                            // aria-haspopup='true'
                            // onClick={handleProfileMenuOpen}
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopBar