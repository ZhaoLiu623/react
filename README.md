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
				}
			/>
		</View>
	}
}

const styles = StyleSheet.create(
	{
		list: {
			flex: 1
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

COMING SOON!

Adapted from [todo app with react native](https://codeburst.io/todo-app-with-react-native-f889e97e398e)

Last updated: 03/20/2020

Run `git pull` to update
