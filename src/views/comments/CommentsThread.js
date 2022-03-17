import React from "react";
import { useSelector } from "react-redux";
import { selectCommentById } from "../../store/comments/commentsSlice";

// Displays a comments thread
function CommentsThread({comment}) {
	// Select all comments replying to the root comment of this thread
	const replies = useSelector(state => 
		comment.replies.map(replyId => selectCommentById(state, replyId))	
	)

	return (
		<li>
			<article className="comment">
				{comment.content}
			</article>

			{
				replies.length > 0 ?

				<ul className="comments-thread replies-thread">
					{replies.map(c => <CommentsThread key={c.id} comment={c}/>)}
				</ul>

				: ""
			}
		</li>
	)
}

export default CommentsThread
