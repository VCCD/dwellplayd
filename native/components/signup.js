import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Button } from 'native-base';
import t from 'tcomb-form-native'
import { signup } from '../store/auth';
import customFormStyle from '../customFormStyle'

const Email = t.refinement(t.String, email => {
  const reg = /[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?/; //or any other regexp
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
      label: `first name`,
      error: 'first name cannot be empty',
      autoCapitalize: 'none'
    },
    lastName: {
      label: `last name`,
      error: 'last name cannot be empty',
      autoCapitalize: 'none'
    },
    email: {
      label: `email`,
      error: 'please enter a valid email',
      autoCapitalize: 'none'
    },
    password: {
      label: `password`,
      error: 'password must be at least three characters',
      secureTextEntry: true,
      autoCapitalize: 'none'
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
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.form}>
          <Form
            ref={c => {this._form = c}}
            type={UserSignup}
            options={options}
            />
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>sign up</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapState = null

const mapDispatch = (dispatch, ownProps) => {
  return {
    signupSubmit: async (form) => {
      await dispatch(signup(form))
      ownProps.navigation.navigate('LoadingScreen')
    }
  }
}

export default connect(mapState, mapDispatch)(Signup)
