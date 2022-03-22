import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles'
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const drawerWidth = 300

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
)

const DrawerButton = ({ open, text, linkUrl, children }) => {
  const location = useLocation().pathname
  // const location = "/home"
  const isActive = linkUrl === decodeURIComponent(location)
  // console.log('The linkUrl for DrawerButton >>> ', linkUrl)
  return (
    <ListItemButton
      // onClick={onClick}
      disableRipple={true}
      component={Link}
      to={linkUrl}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        width: open ? 'auto' : '48px',
        mx: 'auto',
        backgroundColor: theme => isActive ? theme.palette.secondary.main : 'default',
        borderRadius: open ? '0 24px 24px 0' : '24px',
        "&:hover": {
          backgroundColor: theme => isActive ? theme.palette.secondary.main : 'none'
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
          color: theme => isActive ? theme.palette.button.accent : theme.palette.button.primary,
        }}
      >
        {/* Icon */}
        {children}
      </ListItemIcon>
      <ListItemText 
        primary={text} 
        sx={{ 
          opacity: open ? 1 : 0,
          color: theme => theme.palette.button.accent,
          textDecoration: 'none'
        }} 
      />
    </ListItemButton>
  )
}

const MiniDrawer = ({ open, labels, onMouseEnter }) => {
  return (
    // <ClickAwayListener onClickAway={clickAway}>
      <Drawer 
        variant='permanent' 
        open={open} 
        onMouseEnter={onMouseEnter}
      >
        <DrawerHeader>
          
        </DrawerHeader>
        <List>
          <DrawerButton open={open} text='Notes' linkUrl="/home">
            <LightbulbOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Reminders' linkUrl="/reminders">
            <NotificationsOutlinedIcon />
          </DrawerButton>
          {labels.map(l => 
            <DrawerButton key={l.id} open={open} text={l.name} linkUrl={`/label/${l.name}`}>
              <LabelOutlinedIcon />
            </DrawerButton>
          )}
          <DrawerButton open={open} text='Edit labels' linkUrl={''}>
            <EditOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Archive' linkUrl="/archive">
            <ArchiveOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Trash' linkUrl="/trash">
            <DeleteOutlinedIcon />
          </DrawerButton>
        </List>
      </Drawer>
    // </ClickAwayListener>
  )
}

export default MiniDrawer