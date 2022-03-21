import styled from '@emotion/styled'
import { Paper } from '@mui/material'

const NoteContainer = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'start',
    color: theme.palette.text.primary,
    // variant: 'outlined',
    borderRadius: 7
}))

export default NoteContainer