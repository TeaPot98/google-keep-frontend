import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: []
  },
  reducers: {
    set: (state, action) => {
      state.notes = action.payload
    },
    add: (state, action) => {
      state.notes.push(action.payload)
    },
    remove: (state, action) => {
      state.notes = state.notes.filter(n => n.id !== action.payload)
    },
    edit: (state, action) => {
      state.notes = state.notes.map(n => n.id === action.payload.id ? action.payload : n)
      // console.log('The state after editing', state.notes)
    }
  }
})

export const { set, add, remove, edit } = noteSlice.actions

export const fetchNotes = () => async dispatch => {
  try {
    const response = await noteService.getAll()
    // console.log('The response from reducer fetchNotes >>>', response)
    dispatch(set(response))
  } catch (error) {
    console.log(error)
  }
}

export const createNote = newNote => async dispatch => {
  try {
    const response = await noteService.create(newNote)
    // console.log('New note added >>>', response)
    dispatch(add(response))
    return response
  } catch (error) {
    console.log(error)
  }
}

export const removeNote = noteId => async dispatch => {
  try {
    const response = await noteService.remove(noteId)
    // console.log('The note with ID', noteId, 'was successfuly removed !', response)
    dispatch(remove(noteId))
  } catch (error) {
    console.log(error)
  }
}

export const editNote = editedNote => async dispatch => {
  try {
    const response = await noteService.update(editedNote)
    // console.log('The note was edited', response)
    dispatch(edit(response))
  } catch (error) {
    console.log(error)
  }
}

export const selectNotes = state => state.note.notes

export default noteSlice.reducer