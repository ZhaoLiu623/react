import React, { Component } from 'react';
import { FlatList, StyleSheet, TextInput, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.data = [{
			task: 'Try adding an element!'
		}],
		this.state = {
			tasks: [],
			text: ''
		}
	}

	componentDidMount() {
		this.setState({ tasks: [...this.data] })
	}

	addTasks = (desc) => {
		this.data.push({ task: desc });
		this.setState({ tasks: [...this.data] })
	}

	removeTask = (index) => {
		this.data.splice(index, 1);
		this.setState({ tasks: [...this.data] })
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>TODO</Text>
			<FlatList
				data={this.state.tasks}
				renderItem={ (item, index) => 
					<RadioButton.Item label={this.state.tasks[index].task} onPress={
						this.removeTask(index);
					}/>
				}
			/>
			<TextInput
				placeholder="Type here to add a task."
				onSubmitEditing={(text) => 
					
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
  	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
 	},
	item: {
		backgroudColor: 'grey',
		padding: 20,
		margin: 8,
	},
	title: {
		fontSize: 18,
	},
});
