import React from "react";
import { useSelector } from "react-redux";

import { selectSortedRepliesToId } from "../../store/comments/commentsSlice";

import CommentCard from "./CommentCard";

// Displays a comments thread
function CommentsThread({commentId, className}) {
	
	// Select sorted replies to commentId
	const replies = useSelector(state => selectSortedRepliesToId(state, commentId))

	return (
		<li>
			{/* Display a card for the root comment of this thread */}
			<CommentCard commentId={commentId}/>

			{	/* If the root comment has any replies, display a new thread for each of them */
				replies.length > 0 ?

				<ul className={"comments-thread replies-thread " + className}>
					{replies.map(replyId =>
						<CommentsThread key={replyId} className={className} commentId={replyId}/>
					)}
				</ul>

				: ""
			}
		</li>
	)
}

export default CommentsThread
