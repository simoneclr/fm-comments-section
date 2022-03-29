import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

// Displays how much time ago a comment was created
function CommentTimeAgo({timestamp}) {
	let timeAgo = ""

	if (timestamp) {
		const date = parseISO(timestamp)
		const timePeriod = formatDistanceToNow(date)
		timeAgo = timePeriod + " ago."
	}

	return (
		<span className="comment-when">{timeAgo}</span>
	)
}

export default CommentTimeAgo
