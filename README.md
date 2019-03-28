# Flashcard App - React Native

This app is build using React Native and it is tested on android device

#### About App

This app allows users to study collections of custom made flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

Initial display of this app will show list of all the decks (if any already present in database) from which user can goto to any particular deck by clicking on them.

User can toggle between deck list screen and add deck screen from tab navigator on the bottom of the screen

#### Add Deck Screen
Add screen will let user add a deck by simply submiting new deck title. It will then route to the individual deck screen from where user can add card, start quiz and delete option. If the title is already present in database then it will show card count based on previously added cards else will show zero cards on the screen.

User can even select any particular deck from initial deck list screen, next Screen will be again individaul deck screen from which user can add card, start quiz or delete that deck.

#### Individual Deck Screen

On the individual deck screen, user will have following options.

`Add Card` option will get you to a screen where user can add question and its answer and save it to that deck

`Start Quiz` option starts the quiz. During quiz you can toggle display to show question or answer. User will then select if the answer thought was correct or incorrect.

At the end of every quiz there is a `summary of quiz score` based on correct and incorrect answer

`Delete` button removes complete deck from the database


#### Notification as reminder

This app will keep track of user daily quiz attempt after first use of app. If user has not attempted atlease one quiz on any particular day. This app will remind user at 6pm that no quiz has attempted today.

### Download link directly on any android
Type the following link in your android device browser to download the app

https://expo.io/artifacts/de50ccc3-c5d8-44da-87f2-44ff4b9a0a74

Once download you can install it from your downloads

## Clone this app

Open Terminal / Command Prompt, then run:

#### `git clone https://github.com/aamirpinger/mobile-flashcards-React-Native-app.git`

#### `cd mobile-flashcards-React-Native-app`

## Available Scripts

In the project directory, you can run:

#### `npm install`   OR    `yarn install`

#### `npm start` OR `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`   OR `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`   OR `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`  OR `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
