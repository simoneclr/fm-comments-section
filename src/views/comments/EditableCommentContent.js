import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editComment, selectCommentById } from "../../store/comments/commentsSlice";

// Displays a comment's content and allows to edit it when appropriate
function EditableCommentContent({commentId, isActive, changeFormActive}) {

	const dispatch = useDispatch()

	// Select the comment to display
	const comment = useSelector(state => selectCommentById(state, commentId))

	// Select the comment this comment is replying to (if any)
	const parent = useSelector(state => selectCommentById(state, comment.repliesTo))
	
	// State variable that controls the textarea
	const [content, setContent] = useState(comment.content) 

	// If the comment is replying to someone, display their username
	let renderedParentName = ""

	if (parent) {
		renderedParentName = "@" + parent.user + " "
	}

	// Handles textarea value changes
	const onContentChange = (e) => {
		let text = e.target.value

		// Remove the static parent name from the text area value before updating state
		text = text.slice(renderedParentName.length)
		
		setContent(text)
	}

	// Handles form submission
	const onSubmit = (e) => {
		// Prevent page refresh
		e.preventDefault()

		// If the form is active, dispatch an edit action
		if (isActive) {
			dispatch(editComment(commentId, content))
		}

		// Close the edit form
		changeFormActive(false)
	}

	return (
		<div className="comment-content">
			{
				isActive ?

				// If the edit form is active, display a textarea that allows to edit the comment's content
				<form onSubmit={onSubmit} className="edit-comment-form">
					<textarea name="commentContent" value={renderedParentName + content} onChange={onContentChange}
						className="comment-content-input" rows="4">
					</textarea>

					<button type="submit" className="btn btn-primary" 
									disabled={content.length <= 0}>
						Update
					</button>
				</form>

				:

				// If the edit form is not active, display a normal paragraph
				<p>
					<span className="comment-parent">{renderedParentName}</span>{comment.content}
				</p>
			}
		</div>		
	)
}

export default EditableCommentContent
