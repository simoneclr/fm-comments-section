import React from "react";
import { useSelector } from "react-redux";
import { selectAllComments } from "../../store/comments/commentsSlice";

import CommentsThread from "./CommentsThread";

// Displays the main comments page
function CommentsDashboard() {
	const comments = useSelector(selectAllComments)

	// Select all root comments
	const rootComments = comments.filter(c => c.repliesTo === -1)

	return (
		<section className="comments-dashboard">
			{/* Display a thread starting with each root comment */}
			<ul className="comments-thread root-thread">
				{rootComments.map(c => <CommentsThread key={c.id} comment={c}/>)}
			</ul>
		</section>
	)
}

export default CommentsDashboard
