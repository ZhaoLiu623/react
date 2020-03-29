import * as React from 'react';
import { Text, View, FlatList, Button, TextInput, StyleSheet } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{ text: "Start by adding a task!" }],
      text: ""
    };
  }
  
  updateText = (text) => {
    this.setState({ text: text });
  }

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

  deleteTask = i => {
    this.setState(
      (prevState) => {
        let newState = prevState.tasks.slice()
        newState.splice(i, 1);
        return { tasks: newState };
      }
    );
  }

  render() {
    return (
      <View>
        <Text style={styles.title}>Todo List</Text>
        <FlatList
          style={styles.list}
          data={this.state.tasks}
          renderItem={
            ({ item, index }) =>
            <View style={styles.item}>
              <Text style={styles.item}>{item.text}</Text>
              <Button title="x" onPress={ () => this.deleteTask(index) } />
            </View>
          }
        />
        <TextInput
          style={styles.item}
          onChangeText={this.updateText}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Type to add a task!"
          returnKeyLabel="done"
          returnKeyType="done"
        />
      </View>
    );
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
