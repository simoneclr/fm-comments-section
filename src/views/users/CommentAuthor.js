import React from "react";
import { useSelector } from "react-redux";

import { selectLoggedUser, selectUserById } from "../../store/users/usersSlice";

// Displays information about the user who wrote a comment
function CommentAuthor({userId}) {
	// Select the user's data
	const user = useSelector(state => selectUserById(state, userId))

	const loggedUser = useSelector(selectLoggedUser)

	return (
		<div className="comment-author">
			<img src={user.image.png} alt="" className="comment-picture"/>
					
			<span className="comment-username">{user.username}</span>

			{	loggedUser === userId ?
				
				<span className="logged-in-tag">You</span>

				: ""
			}
		</div>
	)
}

export default CommentAuthor
