import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { getAllUsers, getLoggedUserId } from "../../utils/localStorage";

const usersAdapter = createEntityAdapter({
	selectId: user => user.username
})

// Thunk function that loads user data from localStorage
export const loadUsers = () => (dispatch, getState) => {
	// Retrieve users from localStorage
	const users = getAllUsers()

	if (users) {
		// Load each user into the state
		users.forEach(user => dispatch(userLoaded(user)))
	}	

	// Retrieve username of the logged in user
	const loggedUserId = getLoggedUserId()

	// Update loggedIn state
	dispatch(userLoggedIn(loggedUserId))
}

const usersSlice = createSlice({
	name: "users",
	initialState: usersAdapter.getInitialState({
		loggedIn: undefined
	}),
	reducers: {
		userLoaded: {
			reducer: (state, action) => {
				const {user} = action.payload

				usersAdapter.addOne(state, user)
			},
			prepare: (user) => {
				return {
					payload: {
						user
					}
				}
			}
		},
		userLoggedIn: {
			reducer: (state, action) => {
				const {userId} = action.payload

				if (state.ids.includes(userId)) {
					state.loggedIn = userId
				}
			},
			prepare: (userId) => {
				return {
					payload: {
						userId
					}
				}
			}
		}
	}
})

export default usersSlice.reducer

// Actions not exported because accessed via thunks
const { userLoaded, userLoggedIn } = usersSlice.actions

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users)

export const selectLoggedUser = state => state.users.loggedIn
