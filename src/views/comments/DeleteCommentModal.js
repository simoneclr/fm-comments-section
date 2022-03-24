import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { commentDeleted } from "../../store/comments/commentsSlice";

// Displays a modal asking for confirmation when attempting to delete a comment
function DeleteCommentModal({commentId, isActive, changeModalActive}) {

	// When the modal is active, add modal-open class to body
	useEffect(() => {
		if (isActive) {
			document.body.classList.add("modal-open")
		} else {
			document.body.classList.remove("modal-open")
		}

		// Cleanup
		return () => {
			document.body.classList.remove("modal-open")
		}
	}, [isActive])

	const dispatch = useDispatch()

	// IDs for various elements of the modal used for event handling
	const MODAL_ID = "modal-delete-" + commentId
	const BTN_CONFIRM_ID = "modal-button-confirm-" + commentId
	const BTN_CANCEL_ID = "modal-button-cancel-" + commentId

	const onClick = (e) => {
		switch(e.target.id) {
			case MODAL_ID: 
			case BTN_CANCEL_ID:
				// If click outside the modal or click the cancel button, simply close the modal
				changeModalActive(false);
				break;
			
			case BTN_CONFIRM_ID:
				// If click on confirm button, dispatch delete action and then close the modal
				dispatch(commentDeleted(commentId))
				changeModalActive(false)
				break;

			default: break;
		}
	}

	return (
		<React.Fragment>
			{
				// Only display the modal when it's active
				isActive &&

				<div id={MODAL_ID} className="modal-container" onClick={onClick}>
					<div className="modal-content">
						<h2>Delete Comment</h2>

						<p>
							Are you sure you want to delete this comment? 
							This will remove the comment and cannot be undone.
						</p>

						<button id={BTN_CANCEL_ID} className="btn btn-primary btn-info">No, Cancel</button>
						<button id={BTN_CONFIRM_ID} className="btn btn-primary btn-danger">Yes, Delete</button>
					</div>
				</div>
			}
		</React.Fragment>
	)
}

export default DeleteCommentModal
