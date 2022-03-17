import React from "react";
import { useSelector } from "react-redux";

// Displays a comments thread
function CommentsThread() {
	const comments = useSelector(state => state.comments)

	const renderedComments = comments.map(c => <li key={c}>{c}</li>)

	return (
		<ul>
			{renderedComments}
		</ul>
	)
}

export default CommentsThread
