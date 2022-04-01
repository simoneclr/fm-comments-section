import React from "react";
import { useSelector } from "react-redux";

import { selectLoggedUser } from "../../store/users/usersSlice";

import PATHS from "../../utils/paths";

// Display an action button
const ActionButton = ({name, isActive, handleClick}) => {
	// Holds information about each possible action
	const ACTIONS = {
		reply: {
			displayName: "Reply",
			className: "btn-reply",
			icon: PATHS.iconReply
		},
		edit: {
			displayName: "Edit",
			className: "btn-edit",
			icon: PATHS.iconEdit
		},
		delete: {
			displayName: "Delete",
			className: "btn-delete",
			icon: PATHS.iconDelete
		}
	}

	return (
		<button name={name} className={"btn btn-action " + ACTIONS[name].className} onClick={handleClick}>
			<img src={ACTIONS[name].icon} alt="" />
			<span>{isActive ? "Cancel" : ACTIONS[name].displayName}</span>
		</button>
	)
}

// Displays available actions for a comment
function CommentActions({commentId, userId, handleAction, replyFormActive, editFormActive}) {

	// Select username of the logged-in user
	const loggedIn = useSelector(selectLoggedUser)

	// Check if the logged in user is also the author of the comment this component acts upon
	const isAuthor = loggedIn === userId

	let renderedButtons = []

	// If the logged-in user is also the author, display edit and delete action buttons,
	// Else display a reply action button
	// If no user is logged in, do not display any action
	if (isAuthor) {
		renderedButtons = [
			// Delete button
			<ActionButton key={"comment-" + commentId + "-delete"} name={"delete"} 
										isActive={false} handleClick={handleAction}/>,
			// Edit button
			<ActionButton key={"comment-" + commentId + "-edit"} name={"edit"} 
										isActive={editFormActive} handleClick={handleAction}/>
		]
	} else if (loggedIn) {
		renderedButtons = [
			// Reply button
			<ActionButton key={"comment-" + commentId + "-reply"} name={"reply"} 
										isActive={replyFormActive} handleClick={handleAction}/>
		]
	}

	return (
		<div className="comment-actions">
			{renderedButtons.map(button => button)}
		</div>
	)
}

export default CommentActions
