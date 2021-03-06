import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'native-base';
import t from 'tcomb-form-native'
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
      label: ` `,
      error: 'first name cannot be empty'
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
    backgroundColor: '#8C9A9E',
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

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon style={{color: '#D4F5F5'}} name="arrow-back" />
        </Button>
      )
    }
  }

  handleSubmit = async () => {
    const form = this._form.getValue()
    if (form) this.props.submitCreateCommunity(form.name, this.props.user)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>name your dwelling</Text>
          <Form
            ref={c => {this._form = c}}
            type={CommunityForm}
            options={options}
            />
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>create</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = (dispatch, ownProps) => {
  return {
    submitCreateCommunity: async (name, user) => {
      await dispatch(createCommunityThunkerator(name, user))
      ownProps.navigation.navigate('LoadingScreen')
    }
  }
}

export default connect(mapState, mapDispatch)(CreateCommunity)
