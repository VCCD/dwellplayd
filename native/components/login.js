import React from 'react'
import { connect } from 'react-redux'
import store, { auth, me } from '../store'
import { StyleSheet, Text, View, Button as ReactNativeButton } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Button, Icon } from 'native-base';
import CONFIG from '../api-routes'
import customFormStyle from '../customFormStyle'
import t from 'tcomb-form-native'

const options = {
  stylesheet: customFormStyle,
  fields: {
    email: {
      error: 'Please enter a valid email',
      autoCapitalize: 'none'
    },
    password: {
      error: 'Please enter correct password',
      secureTextEntry: true,
      autoCapitalize: 'none',
    }
  }
}

const User = t.struct({
  email: t.String,
  password: t.String,
})
const Form = t.form.Form

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = () => {
    const form = this._form.getValue()
    this.props.loginSubmit(form)
  }

  render() {
    const { name, loginSubmit } = this.props
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.form}>
          <Form
            ref={c => this._form = c}
            type={User}
            options= {options}
            />
          <Button
            rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.text}>Sign in</Text>
            </Button>
          <Button
            rounded onPress={() => {
            store.dispatch(auth(CONFIG.LOGIN))
          }} style={styles.button}>
            <Text style={styles.text}>Dev Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8C9A9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    height: 600,
  },
  titleText: {
    color: '#DBD56E',
    fontWeight: 'bold',
    fontSize: 14
  },
  button: {
    padding: 10,
    margin: 10,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D4F5F5',
  },
  text: {
    color: '#747578',
    fontSize: 20,
  }
});

//mapLogin = null
//mapDispatch = null

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    //error: state.user.error
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loginSubmit: async (form) => {
      await dispatch(auth(form))
    },
  }
}
export default connect(mapLogin, mapDispatch)(LoginScreen)
