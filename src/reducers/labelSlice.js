import { createSlice } from '@reduxjs/toolkit'
import { getState } from 'react-redux'
import labelService from '../services/labels'

export const labelSlice = createSlice({
  name: 'label',
  initialState: {
    labels: []
  },
  // These reducers automatically recieve actions (with type and payload), so you don't have to define them
  reducers: {
    set: (state, action) => {
      state.labels = action.payload
    },
    add: (state, action) => {
      state.labels.push(action.payload)
    },
    remove: (state, action) => {
      state.labels = state.labels.filter(n => n.id !== action.payload)
    },
    edit: (state, action) => {
      state.labels = state.labels.map(n => n.id === action.payload.id ? action.payload : n)
    }
  }
})

// We export automatically generated actions, in order to access them
export const {set, add, remove, edit} = labelSlice.actions

export const fetchLabels = () => async dispatch => {
  try {
    const response = await labelService.getAll()
    dispatch(set(response))
  } catch (error) {
    console.log(error)
  }
}

export const createLabel = newLabel => async dispatch => {
  try {
    const response = await labelService.create(newLabel)
    dispatch(add(response))
  } catch (error) {
    console.log(error)
  }
}

export const removeLabel = labelId => async dispatch => {
  try {
    const response = await labelService.remove(labelId)
    dispatch(remove(labelId))
  } catch (error) {
    console.log(error)
  }
}

export const editLabel = editedLabel => async dispatch => {
  try {
    const response = await labelService.update(editedLabel)
    dispatch(edit(response))
  } catch (error) {
    console.log(error)
  }
}

export const selectLabels = state => state.label.labels

export default labelSlice.reducer
