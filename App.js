import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';

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

  toggleCompleted = id => {
    const newList = this.state.tasks.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed }
      }
      return t;
    })
    this.setState(prevState => ({
      ...prevState,
      tasks: newList
    }))
  }

  handleSubmit = () => {
    if (this.state.newTask === "") return;
    const newObj = {
      id: Date.now(),
      text: this.state.newTask,
      completed: false
    }
    this.setState(prevState => ({
      ...prevState,
      tasks: [...this.state.tasks, newObj],
      newTask: ""
    }))
  }


  render() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>TO DO</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.inputField}
            value={this.state.newTask}
            name="newTask"
            onChangeText={(newTask) => this.setState({ newTask })}
          />
          <View style={styles.btnCtnr}>
            <TouchableHighlight style={styles.customBtn}>
              <Text style={styles.btnText}>clear completed</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.customBtn} onPress={this.handleSubmit}>
              <Text style={styles.btnText}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.container}>
          {this.state.tasks.map(x => {
            return (
              <Text key={x.id} style={x.completed ? styles.completedTask : styles.taskText} onPress={() => this.toggleCompleted(x.id)}>{x.text}</Text>
            )
          })}
        </View>
      </>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8F62E4'
  },
  form: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2B0D57"
  },
  container: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: "#2B0D57"
  },
  title: {
    fontSize: 50,
    color: "#01C7F8",
    fontWeight: "bold"
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
    fontSize: 18,
    width: '90%',
    margin: 5,
    padding: 5
  },
  btnCtnr: {
    flexDirection: 'row'
  },
  customBtn: {
    borderRadius: 3,
    backgroundColor: "#FF3285",
    width: '48%',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fafafa',
    textAlign: 'center',
    fontSize: 24
  },
  taskText: {
    borderRadius: 3,
    width: '90%',
    padding: 15,
    margin: 10,
    backgroundColor: '#FFB400',
    color: "#fafafa",
    fontSize: 18
  },
  completedTask: {
    borderRadius: 3,
    width: '90%',
    padding: 15,
    margin: 10,
    backgroundColor: '#01C7F8',
    color: "#fafafa",
    textDecorationLine: 'line-through',
    fontSize: 18
  }
});
