import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'native-base';
import t from 'tcomb-form-native'
import { addUserToCommunity } from '../store/auth';
import customFormStyle from '../customFormStyle'
import { fetchCommunities } from '../store';

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


class JoinCommunity extends React.Component {

  CommunityCode = t.refinement(t.String, code => {
    let valid = false;
    const { communities } = this.props
    const name = code.split('-')[0]
    const id = +code.split('-')[1]
    if (communities.find(community => community.id === id) && communities.find(community => community.id === id).name === name) valid = true
    return valid;
  });

  JoinCommunityForm = t.struct({
    communityId: this.CommunityCode,
  })

  Form = t.form.Form

  options = {
    stylesheet: customFormStyle,
    fields: {
      communityId: {
        label: ` `,
        error: 'not a valid dwelling code'
      },
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon style={{color: '#D4F5F5'}} name="arrow-back" />
        </Button>
      )
    }
  }

  handleSubmit = () => {
    const form = this._form.getValue()
    if (form) this.props.signupSubmit(form.communityId.split('-')[1], this.props.user)
  }

  componentDidMount = () => {
    this.props.getCommunities()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>enter your dwelling code</Text>
          <this.Form
            ref={c => {this._form = c}}
            type={this.JoinCommunityForm}
            options={this.options}
            />
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>join</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapState = ({ user, communities }) => ({ user, communities })

const mapDispatch = (dispatch, ownProps) => {
  return {
    signupSubmit: (communityId, user) => {
      dispatch(addUserToCommunity(+communityId, user))
      ownProps.navigation.navigate('LoadingScreen')
    },
    getCommunities: () => {
      dispatch(fetchCommunities())
    }
  }
}

export default connect(mapState, mapDispatch)(JoinCommunity)
