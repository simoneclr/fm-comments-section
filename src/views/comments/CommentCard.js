import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectCommentById } from "../../store/comments/commentsSlice";

import AddCommentForm from "./AddCommentForm";
import CommentScoreControl from "./CommentScoreControl";
import CommentAuthor from "../users/CommentAuthor.js"
import CommentActions from "./CommentActions";
import EditableCommentContent from "./EditableCommentContent";

// Displays a single comment card
function CommentCard({commentId, parentId}) {

	// State variable that controls access to the reply form
	const [replyFormActive, setReplyFormActive] = useState(false)

	// State variable that controls access to the edit form
	const [editFormActive, setEditFormActive] = useState(false)

	// Select the comment to display
	const comment = useSelector(state => selectCommentById(state, commentId))

	// Handles action buttons clicks
	const onActionButtonClick = (e) => {
		switch(e.currentTarget.name) {
			case "reply": setReplyFormActive(isActive => !isActive); 
				break;

			case "edit": setEditFormActive(isActive => !isActive);
				break;
			
			case "delete": ;
				break;
				
			default: break;
		}
	}

	// Allow nested components to change display status of their respective forms
	const changeFormsActive = (name, isActive) => {
		switch(name) {
			case "reply": setReplyFormActive(isActive); 
				break;

			case "edit": setEditFormActive(isActive);
				break;
			
			case "delete": ;
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

				<CommentActions userId={comment.user} handleAction={onActionButtonClick} 
												replyFormActive={replyFormActive} editFormActive={editFormActive}/>

				<EditableCommentContent commentId={commentId} isActive={editFormActive}
																changeFormActive={changeFormsActive}/>
			</article>

			<AddCommentForm parentId={commentId} isActive={replyFormActive}
											changeFormActive={changeFormsActive}/>
			
		</React.Fragment>
	)
}

export default CommentCard
