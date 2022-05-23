import React from 'react'
import { 
    Box,
    Chip,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { editNote } from '../reducers/noteSlice'


const LabelChipArray = ({ note }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removeLabel = (currentLabel) => {
        dispatch(editNote({
            ...note,
            labels: note.labels.filter(l => l.id !== currentLabel.id)
        }))
    }
    // console.log('The note object passed to ChipArray', note)
    const styles = {
        chip: {
            ml: theme => theme.spacing(1),
            mt: theme => theme.spacing(0.5)
        }
    }
    
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
                    sx={styles.chip}
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