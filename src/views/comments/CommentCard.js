import React from "react";

// Displays a single comment card
function CommentCard({comment, parent}) {

	console.log(parent)

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
				<img src={comment.user.image.png} alt="" className="comment-picture"/>
				
				<span className="comment-username">{comment.user.username}</span>

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
