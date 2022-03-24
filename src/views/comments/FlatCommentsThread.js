import React from "react";
import { useSelector } from "react-redux";

import { selectCommentTreeFromRootId } from "../../store/comments/commentsSlice";

import CommentCard from "./CommentCard";

// Displays a thread of comments with a single root comment and 
// all replies to it and its child comments "flattened" in a single list of replies
function FlatCommentsThread({commentId}) {

	// Select the comment tree originating from the root comment
	const commentTree = useSelector(state => selectCommentTreeFromRootId(state, commentId))

	// Flatten the tree to get an array of replies
	const replies = commentTree.flat(Infinity)

	return (
		<li>
			{/* Display a card for the root comment */}
			<CommentCard commentId={commentId}/>

			{	/* If the root comment has any replies, map them to an indented list of cards */
				replies.length > 0 ?

				<ul className="comments-thread replies-thread">
					{replies.map(replyId =>	<CommentCard key={replyId} commentId={replyId}/>)}
				</ul>

				: ""
			}
		</li>
	)
}

export default FlatCommentsThread
