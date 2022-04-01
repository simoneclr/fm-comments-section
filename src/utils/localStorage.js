// Utilities for wroking with localStorage

import {sub} from "date-fns"

// Get localStorage
const STORAGE = window.localStorage

// Data for mock comments
const preloadedComments = {
	ids: [1, 2, 3, 4],
	entities: {
		"1": {
			"id": 1,
			"user": "amyrobson",
			"content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
			"createdAt": sub(new Date(), {months: 1}).toISOString(),
			"score": {
				value: 12,
				voters: {}
			},
			"repliesTo": -1,
			"replies": []
		},
		"2": {
			"id": 2,
			"user": "maxblagun",
			"content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
			"createdAt": sub(new Date(), {weeks: 2}).toISOString(),
			"score": {
				value: 5,
				voters: {}
			},
			"repliesTo": -1,
			"replies": [3]
		},
		"3": {
			"id": 3,
			"user": "ramsesmiron",
			"content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
			"createdAt": sub(new Date(), {weeks: 1}).toISOString(),
			"score": {
				value: 4,
				voters: {}
			},
			"repliesTo": 2,
			"replies": [4]
		},
		"4": {
			"id": 4,
			"user": "juliusomo",
			"content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library / framework. But the fundamentals are what stay constant.",
			"createdAt": sub(new Date(), {days: 2}).toISOString(),
			"score": {
				value: 2,
				voters: {}
			},
			"repliesTo": 3,
			"replies": []
		}
	},
	latestId: 4
}

// Data for mock users
const preloadedUsers = {
	ids: ["amyrobson", "maxblagun", "ramsesmiron", "juliusomo"],
	entities: {
		"amyrobson": {
			"image": { 
				"png": "fm-comments-section/images/avatars/image-amyrobson.png",
				"webp": "fm-comments-section/images/avatars/image-amyrobson.webp"
			},
			"username": "amyrobson"
		},
		"maxblagun": {
			"image": { 
				"png": "fm-comments-section/images/avatars/image-maxblagun.png",
				"webp": "fm-comments-section/images/avatars/image-maxblagun.webp"
			},
			"username": "maxblagun"
		},
		"ramsesmiron": {
			"image": { 
				"png": "fm-comments-section/images/avatars/image-ramsesmiron.png",
				"webp": "fm-comments-section/images/avatars/image-ramsesmiron.webp"
			},
			"username": "ramsesmiron"
		},
		"juliusomo": {
			"image": { 
				"png": "fm-comments-section/images/avatars/image-juliusomo.png",
				"webp": "fm-comments-section/images/avatars/image-juliusomo.webp"
			},
			"username": "juliusomo"
		},
	},
	loggedIn: "juliusomo"
}

// Object mapping localStorage keys
const storageKeys = {
	comments: {
		ids: "commentsIds",
		commentId: (id) => "commentsId" + id
	},
	users: {
		ids: "usersIds",
		loggedUser: "usersLoggedIn",
		userId: (id) => "usersId" + id
	}
}

// Check if the storage already contains data, and if it doesn't, insert mock data
const initStorage = () => {
	// Dev only
	// STORAGE.clear()

	// Check if storage is an instance of Storage
	if (STORAGE instanceof Storage) {

		// Check if storage already contains comments data
		if (!STORAGE.getItem(storageKeys.comments.ids)) {

			// If not, load mock data

			// List of all comments ids
			const commentsIds = []

			// For each comment, insert a new entry in the storage
			preloadedComments.ids.forEach(id => {
				// Conver comment object into json string
				const storedValue = JSON.stringify(preloadedComments.entities[id])

				// Push current storedIid in the list of all comments ids
				commentsIds.push(id)

				// Insert current comment in the storage
				STORAGE.setItem(storageKeys.comments.commentId(id), storedValue)
			})

			// Insert list of comment ids in the storage
			STORAGE.setItem(storageKeys.comments.ids, JSON.stringify(commentsIds))
		}

		// Check if storage already contains users data
		if (!STORAGE.getItem(storageKeys.users.ids)) {
			// If not, load mock data

			// List of all users id
			const usersIds = []

			// For each user, insert a new entry in the storage
			preloadedUsers.ids.forEach(id => {
				// Convert user object into JSON
				const storedValue = JSON.stringify(preloadedUsers.entities[id])

				// Push the id into usersIds list
				usersIds.push(id)

				// Insert user into storage
				STORAGE.setItem(storageKeys.users.userId(id), storedValue)
			})

			// Insert list of user ids into the storage
			STORAGE.setItem(storageKeys.users.ids, JSON.stringify(usersIds))

			// Insert username of the logged in user into the store
			STORAGE.setItem(storageKeys.users.loggedUser, preloadedUsers.loggedIn)
		}
	}
}

// Retrieve ids of all comments
const getCommentIds = () => {
	return JSON.parse(STORAGE.getItem(storageKeys.comments.ids))
}

// Retrieve comment data from storage, parsed as an object
const getAllComments = () => {
	const ids = getCommentIds()

	return ids.map(id => JSON.parse(STORAGE.getItem(storageKeys.comments.commentId(id))))
}

// Retrieve data of a specified comment by its id
const getCommentById = (commentId) => {
	return JSON.parse(STORAGE.getItem(storageKeys.comments.commentId(commentId)))
}

// Retrieve ids of all users
const getUserIds = () => {
	return JSON.parse(STORAGE.getItem(storageKeys.users.ids))
}

// Retrieve users data from storage, parsed as an object
const getAllUsers = () => {
	const ids = getUserIds()

	if (ids) {
		return ids.map(id => JSON.parse(STORAGE.getItem(storageKeys.users.userId(id))))
	} else {
		return []
	}
}

// Retrieve data of a specified user by its id
const getUserById = (userId) => {
	return JSON.parse(STORAGE.getItem(storageKeys.users.userId(userId)))
}

// Retrieve id of the logged in user
const getLoggedUserId = () => {
	return STORAGE.getItem(storageKeys.users.loggedUser)
}

export { initStorage, 
	getCommentIds, getAllComments, getCommentById, 
	getUserIds, getAllUsers, getUserById, getLoggedUserId
}
