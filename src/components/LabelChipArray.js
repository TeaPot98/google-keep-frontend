import React from 'react'
import { 
    Box,
    ListItem,
    Chip
} from '@mui/material'

const LabelChipArray = ({ labels }) => {
    return (
        <Box>
            {labels.map(l => 
                <Chip></Chip>
            )}
        </Box>
    )
}

export default LabelChipArray