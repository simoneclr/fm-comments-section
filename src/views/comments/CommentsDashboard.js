import React from "react";
import { useSelector } from "react-redux";

import { selectRootCommentsIds } from "../../store/comments/commentsSlice";

import AddCommentForm from "./AddCommentForm";
import CommentsThread from "./CommentsThread";
import FlatCommentsThread from "./FlatCommentsThread";

// Displays the main comments page
function CommentsDashboard() {
	// Select ids of all root comments
	const rootCommentIds = useSelector(selectRootCommentsIds)

	return (
		<section className="comments-dashboard">
			{/* Display a thread starting with each root comment */}
			<ul className="comments-thread root-thread">
				{/* Nested threads */}
				{/* {rootCommentIds.map(commentId => <CommentsThread key={commentId} commentId={commentId}/>)} */}

				{/* Flat threads */}
				{rootCommentIds.map(commentId => <FlatCommentsThread key={commentId} commentId={commentId}/>)}
			</ul>

			<AddCommentForm isActive={true} changeFormActive={(name, isActive) => true} />
		</section>
	)
}

export default CommentsDashboard
