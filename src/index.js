import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import './index.css';
import "./styles-responsive.css"

import App from './App';

import { loadComments } from './store/comments/commentsSlice';

import { initStorage } from './utils/localStorage';
import { loadUsers } from './store/users/usersSlice';

// Initialize local storage
initStorage()

// Laod comments from localStorage into redux store
store.dispatch(loadComments())

// Load comments from localStorage into redux store
store.dispatch(loadUsers())



ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
