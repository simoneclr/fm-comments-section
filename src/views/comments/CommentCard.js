import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectCommentById } from "../../store/comments/commentsSlice";
import { selectUserById } from "../../store/users/usersSlice";

import AddCommentForm from "./AddCommentForm";
import CommentScoreControl from "./CommentScoreControl";

// Displays a single comment card
function CommentCard({comment, parentId}) {

	// State variable that controls access to the reply form
	const [replyFormActive, setReplyFormActive] = useState(false)

	const user = useSelector(state => selectUserById(state, comment.user))

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
				
				<CommentScoreControl commentId={comment.id}/>

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

			<AddCommentForm parentId={comment.id} 
											isActive={replyFormActive} handleActiveChange={handleReplyFormActiveChange}/>
		</React.Fragment>
	)
}

export default CommentCard
