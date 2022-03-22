import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectCommentById } from "../../store/comments/commentsSlice";
import { selectUserById } from "../../store/users/usersSlice";

import AddCommentForm from "./AddCommentForm";
import CommentScoreControl from "./CommentScoreControl";

// Displays a single comment card
function CommentCard({commentId, parentId}) {

	// State variable that controls access to the reply form
	const [replyFormActive, setReplyFormActive] = useState(false)

	// Select the comment to display
	const comment = useSelector(state => selectCommentById(state, commentId))

	// Select information about the user who posted the comment to display
	const user = useSelector(state => selectUserById(state, comment.user))

	// Select information about the comment this comment is replying to (if any) 
	const parent = useSelector(state => selectCommentById(state, parentId))

	const onReplyButtonClick = (e) => {
		setReplyFormActive(isActive => !isActive)
	}

	const handleReplyFormActiveChange = (isActive) => {
		setReplyFormActive(isActive)
	}

	return (
		<React.Fragment>
			<article className="comment-card comment-card-grid">
				
				<CommentScoreControl commentId={commentId}/>

				<div className="comment-header">
					<img src={user.image.png} alt="" className="comment-picture"/>
					
					<span className="comment-username">{user.username}</span>

					<span className="comment-when">{comment.createdAt}</span>
				</div>

				<div className="comment-actions">
					<button className="btn btn-reply" onClick={onReplyButtonClick}>
						{replyFormActive ? "Cancel" : "Reply"}
					</button>
				</div>

				<p className="comment-content">
					{parent ? <span className="comment-parent">@{parent.user} </span> : "" }
					{comment.content}
				</p>
			</article>

			<AddCommentForm parentId={commentId} isActive={replyFormActive}
											handleActiveChange={handleReplyFormActiveChange}/>
			
		</React.Fragment>
	)
}

export default CommentCard
