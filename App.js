import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [{
        id: 1,
        text: "clean the house",
        completed: false
      }, {
        id: 2,
        text: "bake some cookies",
        completed: false
      }, {
        id: 3,
        text: "make granola",
        completed: true
      }],
      newTask: ""
    }
  }



  handleSubmit = () => {
    const newObj = {
      id: Date.now(),
      text: this.state.newTask,
      completed: false
    }
    this.setState(prevState => ({
      ...prevState,
      tasks: [...this.state.tasks, newObj]
    }))
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>React Native To Do App!</Text>
        <TextInput
          placeholder="do something"
          style={styles.inputField}
          value={this.state.newTask}
          name="newTask"
          onChangeText={(newTask) => this.setState({ newTask })}
        />
        <Button onPress={this.handleSubmit} title="+" />

        {this.state.tasks.map(x => {
          return (
            <Text key={x.id}>{x.text}</Text>
          )
        })}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    borderColor: '#000',
    borderWidth: 0.5,
    borderRadius: 3,
    padding: 5,
    width: '90%'
  }
});
