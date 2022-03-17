import React from "react";
import { useSelector } from "react-redux";
import { selectAllComments } from "../../store/comments/commentsSlice";

// Displays a comments thread
function CommentsThread() {
	const comments = useSelector(selectAllComments)

	const renderedComments = comments.map(c => <li key={c.id}>{c.content}</li>)

	return (
		<ul className="comments-thread">
			{renderedComments}
		</ul>
	)
}

export default CommentsThread
