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
      label: `email`,
      autoCapitalize: 'none',
      error: 'Please enter a valid email'
    },
    password: {
      label: `password`,
      secureTextEntry: true,
      error: 'Please enter the correct password',
      autoCapitalize: 'none',
    }
  }
}

const emailVal = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return reg.test(email)
  })

  const passwordVal = t.refinement(t.String, password => {
    return !(password.length < 3)
  })

const User = t.struct({
    email: emailVal,
    password: passwordVal,
  })
const Form = t.form.Form

class LoginScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      incorrect: false,
    }
  }

  handleSubmit = async () => {
    const form = this._form.getValue()
    if (form){
      this.props.error = null
      let login = await this.props.loginSubmit(form)
      if (!login) {
        this.setState({incorrect: true})
      }
    }
    else {
      this.setState({incorrect: false})
    }
  }

  render() {
    const { name, loginSubmit } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Form
            ref={c => this._form = c}
            type={User}
            options= {options}
            />
            {this.state.incorrect ? <Text style={styles.error}>Invalid Login credentials</Text> : ''}
          <Button
            rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.text}>log in</Text>
            </Button>
          <Button
            rounded onPress={() => {
            store.dispatch(auth(CONFIG.LOGIN))
          }} style={styles.button}>
            <Text style={styles.text}>dev login</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column',
    backgroundColor: '#8C9A9E',
    //justifyContent: 'center',
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
    fontWeight: `bold`
  },
  error: {
    color: '#a94442',
    fontSize: 20,
  }
});

//mapLogin = null
//mapDispatch = null

const mapLogin = (state) => {
  return {
    error: state.user.error
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loginSubmit: async (form) => {
      let result = await dispatch(auth(form))
      return result
    },
  }
}
export default connect(mapLogin, mapDispatch)(LoginScreen)
