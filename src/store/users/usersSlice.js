import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const usersAdapter = createEntityAdapter({
	selectId: user => user.username
})

const usersSlice = createSlice({
	name: "users",
	initialState: usersAdapter.getInitialState({
		loggedIn: ""
	}),
	reducers: {}
})

export default usersSlice.reducer

export const {
	selectAll: selectAllUsers,
	selectById: selectUserById
} = usersAdapter.getSelectors(state => state.users)

export const selectLoggedUser = state => state.users.loggedIn
