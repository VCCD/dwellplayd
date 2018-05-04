import React from 'react'
import { connect } from 'react-redux'
import { auth, me } from '../store/auth'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Button, Icon } from 'native-base';
import t from 'tcomb-form-native'

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
        <Content>
          <Form
            ref={c => this._form = c}
            type={User} />
          <Button
            onPress={this.handleSubmit}><Text style={styles.titleText}>Sign in</Text></Button>
          <Button full onPress={() => console.log(state, 'state', this.props, 'this.props')} style={styles.button}>
            <Icon />
            <Text style={styles.titleText}>Sign in with Google</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'whitesmoke',
    alignItems: 'stretch',

  },

  titleText: {
    color: '#DBD56E',
    fontWeight: 'bold',
    fontSize: 14

  },
  button: {
    flex: 3,
    padding: 10,
    alignItems: "stretch",
    backgroundColor: '#403D58',
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
      ownProps.navigation.navigate('Home')
    },
  }
}
export default connect(mapLogin, mapDispatch)(LoginScreen)
