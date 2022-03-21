import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/comments/commentsSlice";

import { selectLoggedUser } from "../../store/users/usersSlice";

function AddCommentForm({parentId}) {

	const loggedUser = useSelector(selectLoggedUser)

	// State variable that controls the textarea
	const [content, setContent] = useState("")

	const dispatch = useDispatch()

	const onContentChange = (e) => {
		setContent(e.target.value)
	}

	const onSubmit = (e) => {
		e.preventDefault()

		dispatch(addComment(content, parentId))

		setContent("")
	}

	return (
		<div className="add-comment-form">
			<form onSubmit={onSubmit}>
				<textarea name="commentContent" value={content} onChange={onContentChange}>
				</textarea>

				<button type="submit">Reply</button>
			</form>
		</div>
	)
}

export default AddCommentForm
