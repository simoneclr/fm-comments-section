import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

import { addNewComment, getAllComments } from "../../utils/localStorage";

const commentsAdapter = createEntityAdapter({
	// Sort comments by score (highest first)
	// NOTE: Only works when state is changed by CRUD functions provided by entity adapter
	sortComparer: (a, b) => a.score.value - b.score.value
})

// Thunk function that loads comment data from localStorage
export const loadComments = () => (dispatch, getState) => {
	// Retrieve comments from the localStorage
	const comments = getAllComments()

	if (comments) {
		// Load each comment into the state
		comments.forEach(comment => dispatch(commentLoaded(comment)))
	}	
}

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
	// Read logged user's username
	const loggedUser = getState().users.loggedIn

	// Add to comment to localStorage
	const newComment = addNewComment(loggedUser, content, parentId)

	// Update state with the new comment
	dispatch(commentAdded(newComment))
}

const commentsSlice = createSlice({
	name: "comments",
	initialState: commentsAdapter.getInitialState(),
	reducers: {
		commentLoaded: {
			reducer: (state, action) => {
				const {comment} = action.payload

				commentsAdapter.addOne(state, comment)
			},
			prepare: (comment) => {
				return {
					payload: {
						comment
					}
				}
			}
		},

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
				const {newComment} = action.payload

				let parentId = newComment.repliesTo

				// Check if the new comment is replying to someone
				if (state.entities.hasOwnProperty(parentId)) {
					// Add new comment's id to parent's replies array
					state.entities[parentId].replies.push(newComment.id)
				}

				// Add new comment using the adapter function
				commentsAdapter.addOne(state, newComment)
			},
			prepare: (newComment) => {
				return {
					payload: {
						newComment
					}
				}
			}
		},

		commentEdited: {
			reducer: (state, action) => {
				const {commentId, content} = action.payload

				const existingComment = state.entities[commentId]

				if (existingComment) {
					existingComment.content = content
				}
			},
			prepare: (commentId, content) => {
				return {
					payload: {
						commentId,
						content
					}
				}
			}
		},

		commentDeleted: {
			reducer: (state, action) => {
				const {commentId} = action.payload

				const comment = state.entities[commentId]

				// If the comment being deleted is a reply, remove it from the replies array of its parent
				const parentComment = state.entities[comment.repliesTo]

				if (parentComment) {
					parentComment.replies = parentComment.replies.filter(replyId => replyId !== commentId)
				}

				// Remove all replies to the comment being removed
				// TODO: Handle this more graciously
				commentsAdapter.removeMany(state, comment.replies)

				// Remove the comment
				commentsAdapter.removeOne(state, commentId)
			},
			prepare: (commentId) => {
				return {
					payload: {
						commentId
					}
				}
			}
		}
	}
})

export default commentsSlice.reducer

// Actions that are not exported because they are accessed via thunks
const {commentLoaded, commentUpvoted, commentDownvoted, commentAdded} = commentsSlice.actions

// Exported actions
export const {commentEdited, commentDeleted} = commentsSlice.actions

export const {
	selectIds: selectCommentIds,
	selectAll: selectAllComments,
	selectById: selectCommentById
} = commentsAdapter.getSelectors(state => state.comments)

// Select ids of root comments, sorted by score (descending)
export const selectRootCommentsIds = createSelector(
	[selectAllComments],
	comments => comments.filter(c => c.repliesTo === -1).sort((a, b) =>
		b.score.value - a.score.value
	).map(c => c.id)
)

// Select ids of replies to a specified commentId, and sort them oldest to newest
export const selectSortedRepliesToId = createSelector(
	[(state, commentId) => state.comments.entities, 
		(state, commentId) => state.comments.entities[commentId].replies],
	
	(comments, replies) => replies.slice().sort((ida, idb) => {
		let a = comments[ida]
		let b = comments[idb]

		return a.createdAt.localeCompare(b.createdAt)
	})
)

// Select score of a given comment
export const selectCommentScoreById = (state, commentId) => state.comments.entities[commentId].score
