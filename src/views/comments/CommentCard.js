import React from "react";
import { useSelector } from "react-redux";

import { selectUserById } from "../../store/users/usersSlice";
import CommentScoreControl from "./CommentScoreControl";

// Displays a single comment card
function CommentCard({comment, parent}) {

	const user = useSelector(state => selectUserById(state, comment.user))

	return (
		<article className="comment-card">
			
			<CommentScoreControl commentId={comment.id}/>

			<div className="comment-header">
				<img src={user.image.png} alt="" className="comment-picture"/>
				
				<span className="comment-username">{user.username}</span>

				<span className="comment-when">{comment.createdAt}</span>
			</div>

			<div className="comment-actions">
				<button className="btn btn-reply">
					Reply
				</button>
			</div>

			<p className="comment-content">
				{parent ? <span className="comment-parent">@{parent} </span> : "" }
				{comment.content}
			</p>
		</article>
	)
}

export default CommentCard
