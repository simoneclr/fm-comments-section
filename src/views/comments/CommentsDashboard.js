import React from "react";
import { useSelector } from "react-redux";

import { selectRootCommentsIds } from "../../store/comments/commentsSlice";

import AddCommentForm from "./AddCommentForm";
import CommentsThread from "./CommentsThread";

// Displays the main comments page
function CommentsDashboard() {
	// Select ids of all root comments
	const rootCommentIds = useSelector(selectRootCommentsIds)

	return (
		<section className="comments-dashboard">
			{/* Display a thread starting with each root comment */}
			<ul className="comments-thread root-thread">
				{rootCommentIds.map(commentId => <CommentsThread key={commentId} commentId={commentId}/>)}
			</ul>

			<AddCommentForm isActive={true} handleActiveChange={(isActive) => true} />
		</section>
	)
}

export default CommentsDashboard
