import React from "react";
import { useSelector } from "react-redux";
import { selectCommentById } from "../../store/comments/commentsSlice";
import CommentCard from "./CommentCard";

// Displays a comments thread
function CommentsThread({comment, parentId}) {
	// Select all comments replying to the root comment of this thread
	const replies = useSelector(state => 
		comment.replies.map(replyId => selectCommentById(state, replyId))	
	)

	return (
		<li>
			<CommentCard comment={comment} parentId={parentId}/>

			{
				replies.length > 0 ?

				<ul className="comments-thread replies-thread">
					{replies.map(c => <CommentsThread key={c.id} comment={c} parentId={comment.id}/>)}
				</ul>

				: ""
			}
		</li>
	)
}

export default CommentsThread
