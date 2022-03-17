import { createSlice } from "@reduxjs/toolkit";

const initialState = [
	"Hello World!", "Ciao a tutti"
]

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducers: {}
})

export default commentsSlice.reducer
