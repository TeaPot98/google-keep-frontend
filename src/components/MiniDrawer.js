import React, { useState } from 'react'
import {
  List,
} from '@mui/material'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import EditLabels from './EditLabels'
import Drawer from './Drawer'
import DrawerHeader from './DrawerHeader'
import DrawerButton from './DrawerButton'

const MiniDrawer = ({ open, labels, onMouseEnter, createLabel, removeLabel, editLabel }) => {
  const [editLabelOpen, setEditLabelOpen] = useState(false)
  
  const handleEditLabelOpen = () => {
    setEditLabelOpen(true)
  }

  const handleEditLabelClose = () => {
    setEditLabelOpen(false)
  }
  
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
          <DrawerButton open={open} text='Edit labels' onClick={handleEditLabelOpen}>
            <EditOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Archive' linkUrl="/archive">
            <ArchiveOutlinedIcon />
          </DrawerButton>
          <DrawerButton open={open} text='Trash' linkUrl="/trash">
            <DeleteOutlinedIcon />
          </DrawerButton>
        </List>
        <EditLabels 
          onClose={handleEditLabelClose}
          open={editLabelOpen}
          labels={labels}
          createLabel={createLabel}
          removeLabel={removeLabel}
          editLabel={editLabel}
        />
      </Drawer>
    // </ClickAwayListener>
  )
}

export default MiniDrawer