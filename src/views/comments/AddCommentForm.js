import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, selectCommentById } from "../../store/comments/commentsSlice";

import { selectLoggedUser, selectUserById } from "../../store/users/usersSlice";

function AddCommentForm({parentId, isActive, handleActiveChange}) {

	const loggedUserId = useSelector(selectLoggedUser)

	const user = useSelector(state => selectUserById(state, loggedUserId))

	const parent = useSelector(state => selectCommentById(state, parentId))

	// Static text showing the username the user is replying to
	const renderedParentName = "@" + parent.user + " "

	// State variable that controls the textarea
	const [content, setContent] = useState("")

	const dispatch = useDispatch()

	const onContentChange = (e) => {
		let text = (e.target.value)

		// Remove the static parent name from the text area value before updating state
		text = text.slice(renderedParentName.length)

		setContent(text)
	}

	const onSubmit = (e) => {
		e.preventDefault()

		if (isActive) {
			dispatch(addComment(content, parentId))

			setContent("")
		}

		handleActiveChange(false)
	}

	return (
		<form onSubmit={onSubmit} 
					className={"comment-card add-comment-form" + (isActive ? " active" : "")}>
			<img src={user.image.png} alt="" className="comment-picture"/>
		
			<textarea name="commentContent" value={renderedParentName + content} 
								onChange={onContentChange} rows="3">
			</textarea>

			<button type="submit" className="btn btn-primary" disabled={content.length <= 0}>Reply</button>
		</form>
	)
}

export default AddCommentForm
