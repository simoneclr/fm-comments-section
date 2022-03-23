import React from "react";
import { useSelector } from "react-redux";

import { selectCommentById } from "../../store/comments/commentsSlice";

import CommentCard from "./CommentCard";

// Displays a comments thread
function CommentsThread({commentId}) {
	// Select the root comment for this thread
	const comment = useSelector(state => selectCommentById(state, commentId))

	return (
		<li>
			{/* Display a card for the root comment of this thread */}
			<CommentCard commentId={commentId}/>

			{	/* If the root comment has any replies, display a new thread for each of them */
				comment.replies.length > 0 ?

				<ul className="comments-thread replies-thread">
					{comment.replies.map(replyId =>
						<CommentsThread key={replyId} commentId={replyId} parentId={commentId}/>
					)}
				</ul>

				: ""
			}
		</li>
	)
}

export default CommentsThread
