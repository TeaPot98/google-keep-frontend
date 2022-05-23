import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

const DrawerButton = ({ open, text, linkUrl = null, children, onClick = null }) => {
  const location = useLocation().pathname
  // const location = "/home"
  const isActive = linkUrl === decodeURIComponent(location)
  // console.log('The linkUrl for DrawerButton >>> ', linkUrl)
  const styles = {
    button: {
      minHeight: 48,
      justifyContent: open ? 'initial' : 'center',
      px: 2.5,
      width: open ? 'none' : '48px',
      transition: 'border-radius 0.218s ease-in-out',
      mx: open ? 0 : 1,
      backgroundColor: theme => isActive ? theme.palette.secondary.main : 'default',
      borderRadius: open ? '0 24px 24px 0' : '24px',
      "&:hover": {
        backgroundColor: theme => isActive ? theme.palette.secondary.main : 'none'
      },
    },
    buttonIcon: {
      minWidth: 0,
      mr: open ? 3 : 'auto',
      justifyContent: 'center',
      color: theme => isActive ? theme.palette.button.accent : theme.palette.button.primary,
    },
    buttonText: { 
      opacity: open ? 1 : 0,
      color: theme => theme.palette.button.accent,
      textDecoration: 'none',
      transition: 'opacity 0.218s easy-in-out',
    },
  }
  
  return (
    <ListItemButton
      onClick={onClick}
      disableRipple={true}
      component={linkUrl ? Link : 'div'}
      to={linkUrl ? linkUrl : null}
      sx={styles.button}
    >
      <ListItemIcon
        sx={styles.buttonIcon}
      >
        {/* Icon */}
        {children}
      </ListItemIcon>
      <ListItemText 
        primary={text} 
        sx={styles.buttonText} 
      />
    </ListItemButton>
  )
}

export default DrawerButton