# Frontend Mentor - Interactive comments section

![Design preview for the Interactive comments section coding challenge](./design/desktop-preview.jpg)

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

[Live Demo](https://simoneclr.github.io/fm-comments-section)

## The challenge

Your challenge is to build out this interactive comments section and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data in a local `data.json` file, so use that to populate the content on the first load. If you want to take it up a notch, feel free to build this as a full-stack CRUD application!

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Expected behaviour

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
- You can only edit or delete your own comments and replies.

## Built With

- HTML5
- CSS
	- Responsive layout built with Grid and Flexbox
- [React](https://reactjs.org/) - Frontend Framework
- [Create React App](https://create-react-app.dev/) - Initial Setup
- [Redux](https://redux.js.org/) - State Management Library
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Redux](https://react-redux.js.org/) - Official React bindings for Redux
- [gh-pages](https://github.com/gitname/react-gh-pages) - Deploy Live Demo to gh-pages
