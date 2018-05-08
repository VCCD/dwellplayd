import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Button, Icon } from 'native-base';
import t from 'tcomb-form-native'
import { signup, addUserToCommunity } from '../store/auth';
import customFormStyle from '../customFormStyle'

const CommunityInput = t.struct({
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
  messageText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#D4F5F5',
  },
  form: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#D4F5F5',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
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


class NoCommunity extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      communityId: '',
    }
  }

  handleJoin = async () => {
    const form = this._form.getValue()
    if (form) this.props.joinCommunity(form.communityId, this.props.user)
    console.log('here', form)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.form}>
          <Text style={styles.messageText}>Would you like to create a community?</Text>
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </Button>
          </Content>
          <Content style={styles.form}>
          <Text style={styles.messageText}>You can also enter an invite code to join an existing community.</Text>
          <Form
            ref={c => {this._form = c}}
            type={CommunityInput}
            options={options}
            />
          <Button rounded onPress={this.handleJoin} style={styles.button}>
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
    joinCommunity: (communityId, user) => {
      dispatch(addUserToCommunity(communityId, user))
      ownProps.navigation.navigate('Tasks')
    }
  }
}

export default connect(mapState, mapDispatch)(NoCommunity)
