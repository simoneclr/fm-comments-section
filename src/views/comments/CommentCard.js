import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectCommentById } from "../../store/comments/commentsSlice";

import AddCommentForm from "./AddCommentForm";
import CommentScoreControl from "./CommentScoreControl";
import CommentAuthor from "../users/CommentAuthor.js"
import CommentActions from "./CommentActions";
import EditableCommentContent from "./EditableCommentContent";
import DeleteCommentModal from "./DeleteCommentModal";

// Displays a single comment card
function CommentCard({commentId}) {

	// State variable that controls access to the reply form
	const [replyFormActive, setReplyFormActive] = useState(false)

	// State variable that controls access to the edit form
	const [editFormActive, setEditFormActive] = useState(false)

	// Controls the deletion confirmation modal
	const [deleteModalActive, setDeleteModalActive] = useState(false)

	// Select the comment to display
	const comment = useSelector(state => selectCommentById(state, commentId))

	// Toggles the respective state variable when an action button is clicked
	const onActionButtonClick = (e) => {
		switch(e.currentTarget.name) {
			case "reply": setReplyFormActive(isActive => !isActive); 
				break;

			case "edit": setEditFormActive(isActive => !isActive);
				break;
			
			case "delete": setDeleteModalActive(isActive => !isActive);
				break;
				
			default: break;
		}
	}

	return (
		<React.Fragment>
			<article className="comment-card comment-card-grid">
				
				<CommentScoreControl commentId={commentId}/>

				<div className="comment-header">
					<CommentAuthor userId={comment.user} />

					<span className="comment-when">{comment.createdAt}</span>
				</div>

				<CommentActions commentId={commentId} userId={comment.user} handleAction={onActionButtonClick} 
												replyFormActive={replyFormActive} editFormActive={editFormActive}/>

				<EditableCommentContent commentId={commentId} isActive={editFormActive}
																changeFormActive={setEditFormActive}/>

				<DeleteCommentModal commentId={commentId} isActive={deleteModalActive}
														changeModalActive={setDeleteModalActive}/>
			</article>

			<AddCommentForm parentId={commentId} isActive={replyFormActive}
											changeFormActive={setReplyFormActive}/>
			
		</React.Fragment>
	)
}

export default CommentCard
