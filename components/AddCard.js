import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CustomTextInput from './CustomTextInput'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { gray, white, black } from '../utils/colors'
import { addCard } from '../actions'
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { addCardToDeck } from '../utils/api';
import uuid from "uuid"

export class AddCard extends React.Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = () => {
    return {
      title: 'Add Card'
    }
  }

  submit = () => {
    const { deck } = this.props.navigation.state.params
    const deckKey = deck.title
    const card = this.state

    this.props.dispatch(addCard(card, deck))
    
    addCardToDeck(card, deck)

    this.setState({
      question: '',
      answer: '' 
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name='cards-outline' style={{ fontSize: 150 }} />
        <Text style={{ fontSize: 50, textAlign: 'center', margin: 30 }}>
          Create a new card!
        </Text>
        <CustomTextInput
          style={{ fontSize: 20, width: 350, height: 50, marginTop: 30 }}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
          placeholder='Question' 
          autoFocus={false} />

        <CustomTextInput
          style={{ fontSize: 20, width: 350, height: 50, marginTop: 30 }}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
          placeholder='Answer' />

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

export default connect()(AddCard)