import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Button, Icon } from 'native-base';
import t from 'tcomb-form-native'
import { signup } from '../store/auth';
import customFormStyle from '../customFormStyle'

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const Password = t.refinement(t.String, password => {
  if (password.length < 3) return false
  else return true
})

const UserSignup = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: Email,
  password: Password,
})

const Form = t.form.Form

const options = {
  stylesheet: customFormStyle,
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
      error: 'Password must be at least 3 characters',
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
    color: '#D4F5F5',
  },
  form: {
    margin: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#8C9A9E',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#93B7BE',
  },
  buttonText: {
    color: '#D4F5F5',
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
        <Content style={styles.form}>
          <Text style={styles.title}>dwellcome home</Text>
          <Form
            ref={c => {this._form = c}}
            type={UserSignup}
            options={options}
            />
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Signup</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapState = null

const mapDispatch = (dispatch, ownProps) => {
  return {
    signupSubmit: (form) => {
      dispatch(signup(form))
      ownProps.navigation.navigate('Tasks')
    }
  }
}

export default connect(mapState, mapDispatch)(Signup)
