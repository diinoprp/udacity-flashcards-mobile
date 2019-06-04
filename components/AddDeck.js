import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { gray, black, white, red } from '../utils/colors';
import CustomTextInput from '../components/CustomTextInput'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { submitDeck } from '../utils/api'
import uuid from "uuid"
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

export class AddDeck extends React.Component {
  state = {
    title: '',
    questions: []
  }

  submit = () => {
    const key = uuid.v4()
    const deck = this.state

    this.props.dispatch(addDeck({
      [key]: deck
    }))

    this.setState(() => ({
      title: '',
      questions: []
    }))

    this.toHome()

    submitDeck({ key, deck })

    this.setState({
      title: '',
      questions: []
    })
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddDeck'
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name='cards-outline' style={{ fontSize: 150 }} />
        <Text style={{ fontSize: 50, textAlign: 'center', margin: 30 }}>
          What is the title of your new deck?
        </Text>
        <CustomTextInput
          style={{ fontSize: 20, width: 350, height: 50, marginTop: 30 }}
          onChangeText={(title) => this.setState({ title })}
          value={this.state.title}
          placeholder='Deck Title' />
        <TouchableOpacity
          onPress={this.submit}
          style={[styles.submitButton, { marginTop: 30 }]}>
          <Text
            style={[styles.btnText, { color: white }]}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    paddingLeft: 6
  },
  submitButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
    borderColor: gray,
    borderRadius: 5,
    height: 50,
    width: 200,
    marginTop: 20,
    borderWidth: 1
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default connect()(AddDeck)