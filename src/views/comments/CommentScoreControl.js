import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { downvoteComment, selectCommentScoreById, upvoteComment } from "../../store/comments/commentsSlice";

// Displays a comment's score and allows the logged user to change their vote
function CommentScoreControl({commentId}) {

	const dispatch = useDispatch()

	const score = useSelector(state => selectCommentScoreById(state, commentId))

	// Handle button click
	const onButtonClicked = (e) => {
		if (e.currentTarget.name === "UPVOTE") {
			dispatch(upvoteComment(commentId))
		} else if (e.currentTarget.name === "DOWNVOTE") {
			dispatch(downvoteComment(commentId))
		}
	}

	return (
		<div className="comment-score">
			<button name="UPVOTE" className="btn btn-score" onClick={onButtonClicked}>
				<img src="./images/icon-plus.svg" alt="+"/>
			</button>

			<div>
				{score}
			</div>

			<button name="DOWNVOTE" className="btn btn-score" onClick={onButtonClicked}>
				<img src="./images/icon-minus.svg" alt="-"/>
			</button>
		</div>
	)
}

export default CommentScoreControl
