import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

const commentsAdapter = createEntityAdapter()

// Thunk function that reads the logged user from global state before upvoting the specified comment
export const upvoteComment = (commentId) => (dispatch, getState) => {
	const loggedUser = getState().users.loggedIn

	dispatch(commentUpvoted(commentId, loggedUser))
}

// Thunk function that reads the logged user from global state before downvoting the specified comment
export const downvoteComment = (commentId) => (dispatch, getState) => {
	const loggedUser = getState().users.loggedIn

	dispatch(commentDownvoted(commentId, loggedUser))
}

const commentsSlice = createSlice({
	name: "comments",
	initialState: commentsAdapter.getInitialState(),
	reducers: {
		commentUpvoted: {
			reducer: (state, action) => {
				const {commentId, userId} = action.payload

				state.entities[commentId].score[userId] = 1
			},
			prepare: (commentId, userId) => {
				return {
					payload: {
						commentId,
						userId
					}
				}
			}
		},

		commentDownvoted: {
			reducer: (state, action) => {
				const {commentId, userId} = action.payload

				state.entities[commentId].score[userId] = -1
			},
			prepare: (commentId, userId) => {
				return {
					payload: {
						commentId,
						userId
					}
				}
			}
		}
	}
})

export default commentsSlice.reducer

export const {commentUpvoted, commentDownvoted} = commentsSlice.actions

export const {
	selectAll: selectAllComments,
	selectById: selectCommentById
} = commentsAdapter.getSelectors(state => state.comments)

// Select score of a given comment
export const selectCommentScoreById = createSelector(
	[selectCommentById],
	comment => Object.entries(comment.score).reduce((sum, [username, vote]) => {
		return sum += vote
	}, 0)
)
