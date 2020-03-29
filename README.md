# React Native Todo App

This is a tutorial for creating a todo list android application using React Native as part of a series of workshops.

## Where do I start?

Right here.

### Part 0: Getting this repo on your computer

1. [Get familiar with git and Github if you aren't already!](https://nathanielbd.github.io/blog/git-familiar-with-git)
2. Clone this repo. You can do this by running `git clone https://github.umn.edu/app-developers-club/react-native-todo`. Then you can type `cd react-native-todo` and all of this will be in your working directory!
3. Follow the rest of this tutorial.
4. If you think you made a mistake, check out the `src` directory for the completed project.

## Tutorial

### Part 1: Prerequisites

Make sure you familiarize with [the build/test tools](https://nathanielbd.github.io/blog/getting-started-with-react-native) as well as [the basics of React Native](https://nathanielbd.github.io/blog/react-native-basics) before getting started.

- How do you create a blank project?
- Can you change a headline on [news.google.com](https://news.google.com) to make it seem like a headline from The Onion and change its link to rickroll when clicked? (Hint: the `href` attribute of an `a` tag controls the destination of a link)
- What's the difference between prop and state?

### Part 2: Components, Styling, and Testing

1. Create a blank project. You can do this at [snack.expo.io](https://snack.expo.io), but I recommend doing this through the expo CLI. Working from the command line will make deployment and github integration much easier.
2. Open `App.js`, which is the entrypoint to your app.
3. Let's start with importing our dependencies
```javascript
import * as React from 'react';
import { Text, View, FlatList, Button, TextInput, StyleSheet } from 'react-native';
```
- We need to import anything that isn't part of the JavaScript language
- The `*` is pronounced 'wildcard' and means everything in a certain module.
- The `as` keyword allows you to give a chosen name to the import. This is called aliasing.
- Unless you're using a library like [react-native-paper](https://github.com/callstack/react-native-paper), you can generally find a component's documentation [here](https://reactnative.dev/docs/components-and-apis#basic-components).
4. Entrypoint boilerplate or: How I learned to stop pasting boilerplate and remember the syntax
```javascript
export default class App extends React.Component {
...
}
```
- This part should have already been written for you by the expo CLI or snack
- The `export` statement is used to create a JavaScript module that can then be imported for use in other apps. We could have created another component with `export default class MyComponent extends React.Component` in a file `./MyComponent.js` and imported that in `App.js` with `import MyComponent from './MyComponent'`. This is what you would do when creating a larger project.
- `default` makes a more subtle difference. It names the module so that you do not need to give it a name on import like in `import { MyComponent } from './MyComponent`.
- All components must extend the `React.Component` interface and implement its `render()` method.
5. Let's implement `render()`
```javascript
export default class App extends React.Component {
	render() {
		<View>
			<Text>Todo List</Text>
			<FlatList/>
			<TextInput/>
		</View>
	}
}
```
- Here, `View` is needed as a container since render can only return one JSX element. Think of it as an invisible rectangular container that can hold components.
- `FlatList` will eventually hold the entries of our list.
- `TextInput` will be the user's mechanism of submitting a new entry.
6. Create our initial list.
```javascript
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [{ text: "Start by adding a task!" }],
			text: ""
		};
	}

	render() {	
		<View>
			<Text>Todo List</Text>
			<FlatList
				data={this.state.tasks}
				renderItem={ ({item, index}) =>
					<View>
						<Text>{item.text}</Text>
					</View>
				}
			/>
			<TextInput/>
		</View>
	}
}
```
- Constructors have a similar function in React as in other programming languages. They serve as initialization methods. `super(props);` is required inside of `constructor`.
- State serves as a mutable data store that can change over time. We will update it as we add new tasks to the list. It's in [JSON](https://www.json.org/json-en.html) format, where objects are enclosed with `{}` and have `key:value, key2:value2` pairs while arrays are comma-separated like this: `[0,1,2,3]`.
- `FlatList` requires data in the form of an array. You must also implement the `renderItem` function as a prop. The function iterates over each element in the array (taking the element's value and index as an argument) and renders a component for it in the list.
- When you reference JavaScript code in JSX, it must be surrounded by `{}`.
- `this` is a notoriously confusing keyword. It refers to the class surrounding the current block of code. In this case, the class is `App` which is a component since it extends `React.Component`.
7. Making things pretty.
```javascript
export default class App extends React.Component {
	...
	render() {
		<View>
			<Text style={styles.title}>Todo List</Text>
			<FlatList
				style={styles.list}
				data={this.state.tasks}
				renderItem={ ({item, index}) =>
					<View style={styles.item}>
						<Text style={styles.item}>{item.text}</Text>
					</View>
				}
			/>
			<TextInput
				style={styles.item}
				placeholder="Type to add a task!"	
			/>
		</View>
	}
}

const styles = StyleSheet.create(
	{
		list: {
			width: '100%'
		},
		title: {
			fontSize: 32,
			textAlign: 'center',
			margin: 20
		},
		item: {
			padding: 8,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between'
		}
	}
)
```
- We use [CSS syntax](https://www.w3schools.com/css/css_intro.asp) for stylesheets.
- `flex` is a feature in CSS that's heavily used when designing user interfaces for mobile devices. [This guide](https://reactnative.dev/docs/flexbox) can explain it much better than I can, but it is essentially describing what proportion of the screen a component should cover. For example, if there are two components inside of a `<View>` when one has `flex: 2` and the other has `flex: 1`, then they will cover 2/3 and 1/3 of the view, respectively.
- The difference between padding and margin is also notoriously confusing. Padding can be described as the distance between the content and the border of a component. Margin can be thought as the distance between the border of a component and the border of another component. The following image illustrates this:

![Margin vs. Padding](https://miro.medium.com/max/1157/1*xOn6MsNhUcju7Did367ssQ.jpeg)
- Notice how we can define a `const` outside of the component and reference it inside.
8. Test it out to see your app in action!
- Run `expo start` in the directory that has `App.js`. This should bring you to a page with the Metro bundler, the tool Facebook created for building and testing React Native apps. Here's what you should see:

![Metro bundler in the terminal](https://i.gyazo.com/372ca0e75e5604db33af9d7b7f0bf71b.png)

![Metro bundler in the browser](https://www.bignerdranch.com/wp-content/uploads/2019/12/2-metro-bundler.png)

- You will know your app is finished building when there's a log saying `Building JavaScript bundle: finished in XXXms` on both the terminal and the browser page.
- At this point, you may scan the QR code (using the camera app on iOS or the expo app on Android) and you will see the results in the expo app.
- If you're using snack, you can see the app's output on the right-hand side.

### Part 3: Data Manipulation and State Handling

1. Let's start by making sure the text in our `TextInput` updates our app's state.
```javascript
export default class App extends React.Component {
	constructor(props) {
		...
	}

	updateText = (text) => {
		this.setState({ text: text });
	}

	render() {
		<View>
			...
			<TextInput
				style={styles.item}
				onChangeText={this.updateText}
				value={this.state.text}
				placeholder="Type to add a task!"
			/>
		</View>
	}
}
```
- The `(param) => { }` syntax is just another way to define a method. We could also write `updateText(text) { }`.
- `setState` is a method you can use for any React Component. It updates the state. Note that this is different than saying `this.state = { text: text }`, because initially our state has two keys: tasks (an array of JSON objects) and text (a string). This call to `setState` only updates the value associated with the `text` key.
- `value` and `onChangeText` are props of `TextInput`. To make use of them and fully understand how they work, you have to look at [the documentation](https://reactnative.dev/docs/textinput.html). This is what you'll have to do when you use a component you didn't create from scratch.
2. Now that we can keep track of what's in the `TextInput`, we need to handle our app's behavior when the user submits it.
```javascript
export default class App extends React.Component {
	...
	updateText = (text) => {
		...
	}
	
	addTask = () => {
		let isEmpty = this.state.text.trim().length == 0;
		
		if (!isEmpty) {
		}	
	}

	render() {
	}
}
```
- `let` declares a variable that can be seen inside of its code block. Here, we look at `this.state.text` (what the user typed in the `TextInput` and we remove trailing whitespace with `trim()` then count how many characters are in the string. If the string is empty, then there will be 0 characters and the comparison with 0 will yield `true`.
- `!` is pronounced 'bang'. It inverts a Boolean variable (one that is `true` or `false`) like `isEmpty`. If `isEmpty` is `true`, then `!isEmpty` is `false` and vice versa.
- We don't want to add a task if the user submits nothing or submits a bunch of spaces. That's why we have this `if` statement.
3. We need to add functionality for adding tasks
```javascript
...
addTask = () => {
	let isEmpty = this.state.text.trim().length == 0;

	if (!isEmpty) {
		this.setState(
			(prevState) => {
				let { tasks, text } = prevState;
				return {
					tasks: tasks.concat({ index: tasks.length, text: text }),
					text: ""
				};
			}
		);
	}
}
...
```
- There's a lot going on here. At the top level, we're using `setState` again, but not in the way we used before. Previously, we gave it a JSON object and it would update the state. This time we give it a function which it will evaluate by passing it the previous state. Note that the choice of naming the parameter of the function `prevState` doesn't change the behavior of the program. We could have named the parameter `Charles` and `setState` will still give our function the previous state of `App`.
- One level down, we define our function. `prevState` is a JavaScript object with two keys. Using the nifty syntax `let { tasks, text } = prevState;`, we can 'unpack' that object so we have two variables in our scope: one for each key.
- Finally, we have the return statement of our function. The output of our function should be a JavaScript object so that `setState` can update our app's state. 
- We assign a value to the `tasks` key: `tasks: tasks.concat({ index: tasks.length, text: text })`. The `tasks` on the right-hand side refers to the variable we created when we 'unpacked' the previous state. The `text` on the right-hand side is the other variable created when unpacking. So the value that ends up being associated with the `tasks` key is just the previous state with another object added (concatenated) to the end of the array. We want the `index` of the new object to be equal to the number of stasks above it so that the 2nd element is at index 1 and so on.
- We still need to update what's rendered in our app.
```javascript
render() {
	<View>
		...
		<TextInput
			...
			onSubmitEditing={this.addTask}
			returnKeyLabel="done"
			returnKeyType="done"
		/>
	</View>
}
```
- `returnKeyLabel` and `returnKeyType` are simply to make the `TextInput` compatible with both Android and iOS. "done" just happens to be an action both platforms support.
4. Let's implement removing tasks.
```javascript
...
addTask = () => {
	...
}

deleteTask = i => {
	this.setState(
		(prevState) => {
			let newState = prevState.tasks.slice();
			newState.splice(i, 1);
			return { tasks: newState };
		}
	);
}

render() {
...
}
```
- We're using the same approach as `addTask`: giving `setState` a function to evaluate given the previous state.
- `slice` gives us a copy of the `tasks` array so that we can modify it before returning.
- `splice` removes 1 element at index `i`.
- We update the state with the list of tasks minus the one we just deleted
- The user still needs a way to delete a specific task
```javascript
render() {
	return (
		...
		<FlatList
			renderItem = {
				({ item, index }) =>
				<View style={styles.item}>
					<Text style={styles.item}>{item.text}</Text>
					<Button title="x" onPress={ () => this.deleteTask(index) } />
				</View>
			}
		/>
		...
	);
}
```

And we're done! Test the app out. It should look like [this](https://snack.expo.io/@nathanielbd/todotorial) when it's in action.

### Part 4: Persistent Lists using AsyncStorage

- Todo lists aren't very useful if they go away after you exit the app.

MORE COMING SOON!

### Part 5: Deployment to Google Play Store

- Make sure the app works by running `expo start` and trying it out on your smartphone. You can also import your code to [snack.expo.io](https://snack.expo.io) to test on android if you don't have an android device.
- The following steps are based off of Expo's documentation on [building](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/) and [deploying](https://docs.expo.io/versions/latest/distribution/app-stores/). You should consult these if something goes wrong.
- Run `expo publish`. This uploads your code to Expo's content delivery network (CDN) for hosting. Go to the URL it outputs and save the address bar to your clipboard.
- Let's configure our `app.json` for the Google Play Store
```
{
  "expo": {
    "name": "todotorial",
    "description": "Todo list",
    "slug": "https://expo.io/@nathanielbd/snack-f66219c2-eb0d-44c2-9d03-166dd07f8c52",
    "sdkVersion": "36.0.0",
    "version": "1.0.0",
    "orientation": "portrait",
    "primaryColor": "#cccccc",
    "icon": "https://d1wp6m56sqw74a.cloudfront.net/~assets/c9aa1be8a6a6fe81e20c3ac4106a2ebc",
    "ios": {
      "bundleIdentifier": "com.adc.todotorial",
      "bundleNumber": "1.0.0",
      "supportsTablet": true
    },
    "android": {
      "package": "com.adc.todotorial",
      "versionCode": 1
    }
  }
}
```
- `name`, `icon`, and `version` are required
- Under `slug`, you should paste the CDN url of the code you published. It should look like `https://expo.io/@username/project`.
- 

MORE COMING SOON!

---

Adapted from [todo app with react native](https://codeburst.io/todo-app-with-react-native-f889e97e398e)

Last updated: 03/26/2020

Run `git pull` to update
