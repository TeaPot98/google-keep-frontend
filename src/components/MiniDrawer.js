import React from 'react'
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

const DrawerButton = ({ open, text, onClick, children }) => {
  return (
    <ListItemButton
      // onClick={onClick}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center'
        }}
      >
        {/* Icon */}
        {children}
      </ListItemIcon>
      <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
  )
}

const MiniDrawer = ({ open, labels }) => {
  return (
    // <ClickAwayListener onClickAway={clickAway}>
      <Drawer variant='permanent' open={open} >
        <DrawerHeader>
          
        </DrawerHeader>
        <List>
          <DrawerButton open={open} text='Notes'>
            <LightbulbOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Reminders'>
            <NotificationsOutlinedIcon />
          </DrawerButton>
          {labels.map(l => 
            <DrawerButton key={l.id} open={open} text={l.name}>
              <LabelOutlinedIcon />
            </DrawerButton>
          )}
          <DrawerButton open={open} text='Edit labels'>
            <EditOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Archive'>
            <ArchiveOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Trash'>
            <DeleteOutlinedIcon />
          </DrawerButton>
        </List>
      </Drawer>
    // </ClickAwayListener>
  )
}

export default MiniDrawer