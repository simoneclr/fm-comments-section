import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { downvoteComment, selectCommentScoreById, upvoteComment } from "../../store/comments/commentsSlice";
import { selectLoggedUser } from "../../store/users/usersSlice";

import PATHS from "../../utils/paths";

// Displays a comment's score and allows the logged user to change their vote
function CommentScoreControl({commentId}) {

	const dispatch = useDispatch()

	const loggedUser = useSelector(selectLoggedUser)

	const score = useSelector(state => selectCommentScoreById(state, commentId))

	const userVote = score.voters[loggedUser]

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
			<button name="UPVOTE" onClick={onButtonClicked} 
							className={"btn btn-score" + (userVote === 1 ? " user-vote" : "")}>
				<img src={PATHS.iconPlus} alt="+"/>
			</button>

			<div>
				{score.value}
			</div>

			<button name="DOWNVOTE" onClick={onButtonClicked}
							className={"btn btn-score" + (userVote === -1 ? " user-vote" : "")}>
				<img src={PATHS.iconMinus} alt="-"/>
			</button>
		</div>
	)
}

export default CommentScoreControl
