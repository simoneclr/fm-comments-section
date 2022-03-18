import React from "react";
import { useSelector } from "react-redux";

import { selectUserById } from "../../store/users/usersSlice";

// Displays a single comment card
function CommentCard({comment, parent}) {

	const user = useSelector(state => selectUserById(state, comment.user))

	return (
		<article className="comment-card">
			<div className="comment-score">
				<button className="btn btn-score">
					<img src="./images/icon-plus.svg" alt="+"/>
				</button>

				<div>
					{comment.score}
				</div>

				<button className="btn btn-score">
					<img src="./images/icon-minus.svg" alt="-"/>
				</button>
			</div>

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
