import React from "react";
import { useSelector } from "react-redux";

import { selectRootCommentsIds } from "../../store/comments/commentsSlice";
import { selectLoggedUser } from "../../store/users/usersSlice";

import AddCommentForm from "./AddCommentForm";
import CommentsThread from "./CommentsThread";

// Displays the main comments page
function CommentsDashboard() {
	// Select ids of all root comments
	const rootCommentIds = useSelector(selectRootCommentsIds)

	// Select logged user id
	const loggedUserId = useSelector(selectLoggedUser)

	return (
		<section className="comments-dashboard">
			{/* Display a thread starting with each root comment */}
			<ul className="comments-thread root-thread">
				{rootCommentIds.map(commentId => 
					<CommentsThread key={commentId} className="replies-flat" commentId={commentId}/>
				)}
			</ul>

			{ /* If a user is logged in, display a form to add a new comment */
				loggedUserId &&
				<AddCommentForm isActive={true} changeFormActive={(name, isActive) => true} />
			}
		</section>
	)
}

export default CommentsDashboard
