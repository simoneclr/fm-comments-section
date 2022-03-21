import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

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
				
				// Ckeck what the user has previously voted
				const previousVote = state.entities[commentId].score.voters[userId]

				if (previousVote === -1) {
					// If the user previously downvoted the comment, increase the score by 2
					state.entities[commentId].score.value += 2
				} else if (previousVote === 0 || !previousVote) {
					// If the user has yet to vote, increase score by 1 
					state.entities[commentId].score.value += 1
				}

				// Store that the user has now upvoted the comment
				state.entities[commentId].score.voters[userId] = 1
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

				// Ckeck what the user has previously voted
				const previousVote = state.entities[commentId].score.voters[userId]

				if (previousVote === 1) {
					// If the user previously upvoted the comment, decrease the score by 2
					state.entities[commentId].score.value -= 2
				} else if (previousVote === 0 || !previousVote) {
					// If the user has yet to vote, decrease score by 1 
					state.entities[commentId].score.value -= 1
				}

				// Store that the user has now downvoted the comment
				state.entities[commentId].score.voters[userId] = -1
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
export const selectCommentScoreById = (state, commentId) => state.comments.entities[commentId].score
