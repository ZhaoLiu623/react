import * as React from 'react';
import { Text, View, FlatList, Button, TextInput, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [{ text: "Start by adding a task!" }],
      text: "",
      loaded: false
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
        },
        async () => await AsyncStorage.setItem("TASKS", JSON.stringify(this.state.tasks))
      );
    }
  }

  deleteTask = i => {
    this.setState(
      (prevState) => {
        let newState = prevState.tasks.slice()
        newState.splice(i, 1);
        return { tasks: newState };
      },
      async () => await AsyncStorage.setItem("TASKS", JSON.stringify(this.state.tasks))
    );
  }

  async componentDidMount() {
    await AsyncStorage.getItem("TASKS",
      (err, item) => {
        if (item !== null) {
          this.setState({tasks: JSON.parse(item)});
        }
        this.setState({loaded: true});
      }
    );
  }

  render() {
    if (!this.state.loaded) {
      return <ActivityIndicator/>
    }
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
