import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Button, Icon } from 'native-base';
import t from 'tcomb-form-native'
import { signup, addUserToCommunity } from '../store/auth';
import customFormStyle from '../customFormStyle'


const JoinCommunityForm = t.struct({
  communityId: t.String,
})

const Form = t.form.Form

const options = {
  stylesheet: customFormStyle,
  fields: {
    communityId: {
      error: 'First name cannot be empty'
    },
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


class JoinCommunity extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      communityId: '',
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
  }

  handleSubmit = async () => {
    const form = this._form.getValue()
    if (form) this.props.signupSubmit(form.communityId, this.props.user)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.form}>
          <Text style={styles.title}>Enter your community ID</Text>
          <Form
            ref={c => {this._form = c}}
            type={JoinCommunityForm}
            options={options}
            />
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Join</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = (dispatch, ownProps) => {
  return {
    signupSubmit: (communityId, user) => {
      dispatch(addUserToCommunity(+communityId, user))
      ownProps.navigation.navigate('Tasks')
    }
  }
}

export default connect(mapState, mapDispatch)(JoinCommunity)
