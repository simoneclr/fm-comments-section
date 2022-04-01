import { configureStore } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

import commentsSlice from './comments/commentsSlice';
import usersSlice from './users/usersSlice';

const preloadedState = {
	// comments: {
	// 	ids: [1, 2, 3, 4],
	// 	entities: {
	// 		"1": {
	// 			"id": 1,
	// 			"user": "amyrobson",
	// 			"content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
	// 			"createdAt": sub(new Date(), {months: 1}).toISOString(),
	// 			"score": {
	// 				value: 12,
	// 				voters: {}
	// 			},
	// 			"repliesTo": -1,
	// 			"replies": []
	// 		},
	// 		"2": {
	// 			"id": 2,
	// 			"user": "maxblagun",
	// 			"content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
	// 			"createdAt": sub(new Date(), {weeks: 2}).toISOString(),
	// 			"score": {
	// 				value: 5,
	// 				voters: {}
	// 			},
	// 			"repliesTo": -1,
	// 			"replies": [3]
	// 		},
	// 		"3": {
	// 			"id": 3,
	// 			"user": "ramsesmiron",
	// 			"content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
	// 			"createdAt": sub(new Date(), {weeks: 1}).toISOString(),
	// 			"score": {
	// 				value: 4,
	// 				voters: {}
	// 			},
	// 			"repliesTo": 2,
	// 			"replies": [4]
	// 		},
	// 		"4": {
	// 			"id": 4,
	// 			"user": "juliusomo",
	// 			"content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library / framework. But the fundamentals are what stay constant.",
	// 			"createdAt": sub(new Date(), {days: 2}).toISOString(),
	// 			"score": {
	// 				value: 2,
	// 				voters: {}
	// 			},
	// 			"repliesTo": 3,
	// 			"replies": []
	// 		}
	// 	},
	// 	latestId: 4
	// },
	users: {
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
}

export default configureStore({
	reducer: {
		comments: commentsSlice,
		users: usersSlice
	},
	preloadedState
});
