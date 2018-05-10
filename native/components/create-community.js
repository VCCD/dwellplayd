import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Button, Icon } from 'native-base';
import t from 'tcomb-form-native'
import { signup } from '../store/auth';
import customFormStyle from '../customFormStyle'
import { createCommunityThunkerator } from '../store'


const CommunityForm = t.struct({
  name: t.String,
})

const Form = t.form.Form

const options = {
  stylesheet: customFormStyle,
  fields: {
    name: {
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


class CreateCommunity extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
    }
  }

  handleSubmit = async () => {
    const form = this._form.getValue()
    
    if (form) this.props.submitCreateCommunity(form.name, this.props.user)
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content style={styles.form}>
          <Text style={styles.title}>Create your dwelling</Text>
          <Form
            ref={c => {this._form = c}}
            type={CommunityForm}
            options={options}
            />
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = (dispatch, ownProps) => {
  return {
    submitCreateCommunity: (name, user) => {
      dispatch(createCommunityThunkerator(name, user))
      ownProps.navigation.navigate('SelectTasks')
    }
  }
}

export default connect(mapState, mapDispatch)(CreateCommunity)
