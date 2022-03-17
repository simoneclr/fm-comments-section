import { configureStore } from '@reduxjs/toolkit';

import commentsSlice from './comments/commentsSlice';

export default configureStore({
	reducer: {
		comments: commentsSlice
	}
});
