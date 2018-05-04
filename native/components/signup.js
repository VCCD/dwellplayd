import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Button, Icon } from 'native-base';
import t from 'tcomb-form-native'
import { signup } from '../store/auth';

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const UserSignup = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: Email,
  password: t.String,
})

const Form = t.form.Form

const options = {
  fields: {
    firstName: {
      error: 'First name cannot be empty'
    },
    lastName: {
      error: 'Last name cannot be empty'
    },
    email: {
      error: 'Insert a valid email'
    },
    password: {
      error: 'Please enter a password',
      secureTextEntry: true
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3B9EA5',
    textShadowOffset: {width: 1, height: 1},
    textShadowColor: '#F5EE9E',
    textShadowRadius: 5
  },
  form: {
    margin: 20,
  },
  container: {
  },
  button: {
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B9EA5',
  },
  titleText: {
    color: '#F5EE9E',
    fontWeight: 'bold',
    fontSize: 20,
  },
})


class Signup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  }

  handleSubmit = async () => {
    const form = this._form.getValue()
    if (form) this.props.signupSubmit(form)
    console.log('here', form)
  }

  render() {
    return(
      <Container style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Welcome Home</Text>
          <Form
            ref={c => {this._form = c}}
            type={UserSignup}
            options={options}
            />
          <Button full onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.titleText}>Signup</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

const mapState = null

const mapDispatch = (dispatch, ownProps) => {
  return {
    signupSubmit: (form) => {
      dispatch(signup(form))
      ownProps.navigation.navigate('Home')
    }
  }
}

export default connect(mapState, mapDispatch)(Signup)
