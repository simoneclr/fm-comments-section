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

// Thunk function that reads the logged user from global state before adding a new comment
export const addComment = (content, parentId) => (dispatch, getState) => {
	const loggedUser = getState().users.loggedIn

	dispatch(commentAdded(loggedUser, content, parentId))
}

const commentsSlice = createSlice({
	name: "comments",
	initialState: commentsAdapter.getInitialState({
		latestId: 0
	}),
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
		},

		commentAdded: {
			reducer: (state, action) => {
				const {userId, content, parentId} = action.payload

				// Increase latest id
				// TODO: add proper id generation
				state.latestId++

				let repliesTo = parentId

				// If no parent id has been provided, set parentId to -1 to show the new comment is a root comment
				if (!parentId) {
					repliesTo = -1
				}

				// Create new comment
				const newComment = {
					"id": state.latestId,
					"user": userId,
					"content": content,
					"createdAt": "Just now",
					"score": {
						value: 0,
						voters: {}
					},
					"repliesTo": repliesTo,
					"replies": []
				}

				// Check if the new comment is replying to someone
				if (state.entities.hasOwnProperty(parentId)) {
					// Add new comment's id to parent's replies array
					state.entities[parentId].replies.push(newComment.id)
				}

				// Add new comment using the adapter function
				commentsAdapter.addOne(state, newComment)
			},
			prepare: (userId, content, parentId) => {
				return {
					payload: {
						userId,
						content,
						parentId
					}
				}
			}
		}
	}
})

export default commentsSlice.reducer

// Actions that are not exported because they are accessed via thunks
const {commentUpvoted, commentDownvoted, commentAdded} = commentsSlice.actions

export const {
	selectAll: selectAllComments,
	selectById: selectCommentById
} = commentsAdapter.getSelectors(state => state.comments)

// Select score of a given comment
export const selectCommentScoreById = (state, commentId) => state.comments.entities[commentId].score
