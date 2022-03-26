import React from 'react'
import { 
    Box,
    ListItem,
    Chip
} from '@mui/material'

const LabelChipArray = ({ labels }) => {
    return (
        <Box>
            {labels.map(label => 
                <Chip
                    key={label.id}
                    size="small"
                    label={label.name}
                    onClick={() => {}}
                    onDelete={() => {}}
                />
            )}
        </Box>
    )
}

export default LabelChipArray