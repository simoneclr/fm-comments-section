import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addComment, selectCommentById } from "../../store/comments/commentsSlice";
import { selectLoggedUser, selectUserById } from "../../store/users/usersSlice";

function AddCommentForm({parentId, isActive, changeFormActive}) {

	// Select the username of the user currently logged in
	const loggedUserId = useSelector(selectLoggedUser)

	// Select the information of the logged in user
	const user = useSelector(state => selectUserById(state, loggedUserId))

	// Select information obout the comment the form is replying to (if any)
	const parent = useSelector(state => selectCommentById(state, parentId))

	// If the comment is a reply, build Static text showing the username the user is replying to
	let renderedParentName = ""
 
	if (parent) {
		renderedParentName = "@" + parent.user + " "
	}

	// State variable that controls the textarea
	const [content, setContent] = useState("")

	const dispatch = useDispatch()

	// Handles content changes in the text area
	const onContentChange = (e) => {
		let text = (e.target.value)

		// Remove the static parent name from the text area value before updating state
		text = text.slice(renderedParentName.length)

		setContent(text)
	}

	// Handles form submission
	const onSubmit = (e) => {
		e.preventDefault()

		if (isActive) {
			dispatch(addComment(content, parentId))

			setContent("")
		}

		changeFormActive(false)
	}

	return (
		<form onSubmit={onSubmit} 
					className={"comment-card add-comment-form" + (isActive ? " active" : "")}>
			<img src={user.image.png} alt="" className="comment-picture"/>
		
			<textarea name="commentContent" value={renderedParentName + content} onChange={onContentChange}
								className="comment-content-input" placeholder="Add a new comment..." rows="3">
			</textarea>

			<button type="submit" className="btn btn-primary" disabled={content.length <= 0}>
				{parent ? "Reply" : "Send"}
			</button>
		</form>
	)
}

export default AddCommentForm
