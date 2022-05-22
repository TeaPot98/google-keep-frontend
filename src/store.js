import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteSlice'
import labelReducer from './reducers/labelSlice'

export default configureStore({
  reducer: {
    note: noteReducer,
    label: labelReducer,
  }
})