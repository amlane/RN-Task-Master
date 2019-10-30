import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
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

  clearCompleted = () => {
    const newList = this.state.tasks.filter(t => {
      return !t.completed
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
          <Text style={styles.subtitle}>a remindery app</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            placeholder="What are your goals..."
            style={styles.inputField}
            value={this.state.newTask}
            name="newTask"
            onChangeText={(newTask) => this.setState({ newTask })}
          />
          <View style={styles.btnCtnr}>
            <TouchableHighlight style={styles.clearCompletedBtn} onPress={this.clearCompleted}>
              <Text style={styles.clearCompletedBtnText}>clear completed</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.addBtn} onPress={this.handleSubmit}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.container}>
          {this.state.tasks.map(x => {
            return (
              <View key={x.id} style={x.completed ? styles.completedTaskBox : styles.taskTextBox}>
                <Text onPress={() => this.toggleCompleted(x.id)} style={x.completed ? styles.completedTaskText : styles.taskText}>{x.text}</Text>
              </View>
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
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#2B0D57"
  },
  container: {
    flex: 5,
    alignItems: 'center',
    backgroundColor: "#2B0D57",
    overflow: "scroll"
  },
  title: {
    fontSize: 54,
    color: "#01C7F8",
    fontWeight: "bold"
  },
  subtitle: {
    fontSize: 20,
    color: "#d3d3d3"
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
    fontSize: 18,
    width: '90%',
    margin: 5,
    padding: 10
  },
  btnCtnr: {
    flexDirection: 'row'
  },
  addBtn: {
    borderRadius: 3,
    backgroundColor: "#FF3285",
    width: '15%',
    margin: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addBtnText: {
    color: '#fafafa',
    textAlign: 'center',
    fontSize: 30
  },
  clearCompletedBtn: {
    borderRadius: 3,
    backgroundColor: "#8C5FE1",
    width: '73%',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  clearCompletedBtnText: {
    color: '#fafafa',
    textAlign: 'center',
    fontSize: 20
  },
  taskTextBox: {
    borderRadius: 3,
    width: '90%',
    padding: 15,
    margin: 10,
    backgroundColor: '#FFB400'
  },
  completedTaskBox: {
    borderRadius: 3,
    width: '90%',
    padding: 15,
    margin: 10,
    backgroundColor: '#01C7F8'
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: "#fafafa",
    fontSize: 18
  },
  taskText: {
    color: "#fafafa",
    fontSize: 18
  }
});
