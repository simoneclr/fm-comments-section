import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const commentsAdapter = createEntityAdapter()

const commentsSlice = createSlice({
	name: "comments",
	initialState: commentsAdapter.getInitialState(),
	reducers: {}
})

export default commentsSlice.reducer

export const {
	selectAll: selectAllComments,
	selectById: selectCommentById
} = commentsAdapter.getSelectors(state => state.comments)
