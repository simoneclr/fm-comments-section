import React from "react";
import { useSelector } from "react-redux";

import { selectLoggedUser } from "../../store/users/usersSlice";

// Display an action button
const ActionButton = ({name, isActive, handleClick}) => {
	// Holds information about each possible action
	const ACTIONS = {
		reply: {
			displayName: "Reply",
			className: "btn-reply",
			icon: "./images/icon-reply.svg"
		},
		edit: {
			displayName: "Edit",
			className: "btn-edit",
			icon: "./images/icon-edit.svg"
		},
		delete: {
			displayName: "Delete",
			className: "btn-delete",
			icon: "./images/icon-delete.svg"
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
function CommentActions({userId, handleAction, replyFormActive, editFormActive}) {

	// Select username of the logged-in user
	const loggedIn = useSelector(selectLoggedUser)

	// Check if the logged in user is also the author of the comment this component acts upon
	const isAuthor = loggedIn === userId

	let renderedButtons = []

	// If the logged-in user is also the author, display edit and delete action buttons,
	// Else display a reply action button
	if (isAuthor) {
		renderedButtons = [
			// Delete button
			<ActionButton name={"delete"} isActive={false} handleClick={handleAction}/>,
			// Edit button
			<ActionButton name={"edit"} isActive={editFormActive} handleClick={handleAction}/>
		]
	} else {
		renderedButtons = [
			// Reply button
			<ActionButton name={"reply"} isActive={replyFormActive} handleClick={handleAction}/>
		]
	}

	return (
		<div className="comment-actions">
			{renderedButtons.map(button => button)}
		</div>
	)
}

export default CommentActions
