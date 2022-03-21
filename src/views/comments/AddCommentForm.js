import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../store/comments/commentsSlice";

import { selectLoggedUser, selectUserById } from "../../store/users/usersSlice";

function AddCommentForm({parentId}) {

	const loggedUserId = useSelector(selectLoggedUser)

	const user = useSelector(state => selectUserById(state, loggedUserId))

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
		<form className="comment-card add-comment-form" onSubmit={onSubmit}>
			<img src={user.image.png} alt="" className="comment-picture"/>
		
			<textarea name="commentContent" value={content} onChange={onContentChange} rows="3">
			</textarea>

			<button type="submit" className="btn btn-primary">Reply</button>
		</form>
	)
}

export default AddCommentForm
