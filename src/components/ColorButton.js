import React from 'react'
import { IconButton, Badge } from '@mui/material'
import FormatColorResetOutlinedIcon from '@mui/icons-material/FormatColorResetOutlined'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'

const ColorButton = ({ color, onClick, note }) => {
  const styles = {
      badge: {
          "& .MuiBadge-badge": {
              m: 0,
              p: 0,
              width: '5px',
              height: '10px',
              color: 'white',
              backgroundColor: theme => theme.palette.other.purple,
          }
      },
      badgeIcon: {
          m: 0,
          p: 0,
      },
      colorButton: {
          backgroundColor: color,
          width: '32px',
          height: '32px',
          mx: 0.25,
          border: theme => `2px solid ${color === '#fff' && color !== note.color ? theme.palette.divider : color === note.color ? theme.palette.other.purple : 'transparent '}`,
          "&:hover": {
              backgroundColor: color,
              borderColor: theme => color === note.color ? theme.palette.other.purple : theme.palette.text.accent
          }
      },
      colorButtonIcon: {
          color: theme => theme.palette.text.accent
      }
  }
  
  return (
      <Badge
          invisible={note.color !== color}
          overlap="circular"
          sx={styles.badge} 
          badgeContent={
              note.color === color ? 
              <CheckOutlinedIcon 
                  fontSize="15px"
                  sx={styles.badgeIcon}
              /> : 
              null
          }
      >
          <IconButton
              disableRipple={true}
              onClick={() => {
                  onClick()
                //   console.log('Color button clicked!')
              }}
              size="large"
                  sx={styles.colorButton}
          >
              {color === '#fff' ? 
                  <FormatColorResetOutlinedIcon
                  fontSize="small"
                      sx={styles.colorButtonIcon}
                  /> : 
                  null
              }
          </IconButton>
      </Badge>
  )
}

export default ColorButton