import React from 'react'
import { 
    Box,
    ListItem,
    Chip,
    Link
} from '@mui/material'
import { useNavigate } from 'react-router-dom'


const LabelChipArray = ({ note, changeNote }) => {
    const navigate = useNavigate()

    const removeLabel = (currentLabel) => {
        changeNote({
            ...note,
            labels: note.labels.filter(l => l.id !== currentLabel.id)
        })
    }
    // console.log('The note object passed to ChipArray', note)
    return (
        <Box
            sx={{
                px: theme => theme.spacing(1)
            }}
        >
            {note.labels.map(label => 
                <Chip
                    // component={Link}
                    // to={`/label/${label.name}`}   
                    key={label.id}
                    size="small"
                    label={label.name}
                    sx={{
                        ml: theme => theme.spacing(1),
                        mt: theme => theme.spacing(0.5)
                    }}
                    onClick={(event) => {
                        event.stopPropagation()
                        navigate(`/label/${label.name}`)
                    }}
                    onDelete={() => removeLabel(label)}
                />
            )}
        </Box>
    )
}

export default LabelChipArray