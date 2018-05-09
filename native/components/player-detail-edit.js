import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Content, Button, Text } from 'native-base'
import t from 'tcomb-form-native'
import { connect } from 'react-redux'
import { updateUser } from '../store'
import customFormStyle from '../customFormStyle'
import { ImagePicker, Permissions, Camera } from 'expo'
import {NavigationActions} from 'react-navigation'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({
      routeName: 'DrawerStack'
    }),
  ]
})

const Email = t.refinement(t.String, email => {
  const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
  return reg.test(email);
});

const UserEdit = t.struct({
  firstName: t.String,
  lastName: t.String,
  email: Email,
})

const Form = t.form.Form

const options = {
  stylesheet: customFormStyle,
  fields: {
    firstName: {
      error: 'First name cannot be empty',
    },
    lastName: {
      error: 'Last name cannot be empty'
    },
    email: {
      error: 'Insert a valid email'
    },
  }
}

class PlayerDetailEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imgUrl: this.props.user.imgUrl
    }
  }
  static navigationOptions = {
    title: 'Edit'
  }

  componentWillMount(){
    let newImg = this.props.navigation.getParam('img')
    if (newImg) {
      this.setState({imgUrl: newImg})
    }
  }

  handleSubmit = async () => {
    const { id } = this.props.user
    const {user} = this.props
    const form = this._form.getValue()
    this._uploadToCloud(this.state.imgUrl)
    .then(res => res.json())
    .then(res => {
      var obj = {
        firstName: form.firstName || user.firstName,
        lastName: form.lastName || user.lastName,
        email: form.email || user.email,
        imgUrl: res.imgUrl
      }
      this.props.updateUserInfo(id, obj)
    })
  }

  value = {
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName,
    email: this.props.user.email,
  }

  _uploadToCloud = (uri) => {
    const image = {
      uri: uri,
      type: 'image/jpeg',
      name: `user-${Date.now()}.jpg`
    }

    const imgBody = new FormData()
    imgBody.append('image', image)
    const url = `${apiURL}/cloud/image-upload`
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: imgBody
    })
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    this.setState({imgUrl: result.uri})
  }

  _takePicture = () => {
    this.props.navigation.navigate('Camera')
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.form}>
        <Image style={styles.profileImg} source={{uri: this.state.imgUrl}} />
          <Form
            ref={c => { this._form = c }}
            type={UserEdit}
            value={this.value}
            options={options}
          />
          <Button onPress={this._pickImage}><Text>Pick Image</Text></Button>
          <Button onPress={this._takePicture}><Text>Take a picture</Text></Button>
        </Content>
          <Button rounded onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.titleText}>Update</Text>
          </Button>
      </Container>
    );
  }
}

const mapState = state => {
  const { user } = state
  return { user }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    updateUserInfo: (userId, form) => {
      dispatch(updateUser(userId, form))
      ownProps.navigation.navigate('PlayerDetail')
    }
  }
}

export default connect(mapState, mapDispatch)(PlayerDetailEdit)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C9A9E',
  },
  form: {
    margin: 20,
  },
  profileImg: {
    height: 140,
    width: 140,
    borderRadius: 70,
    alignSelf: 'center',
    margin: 15
  },
  titleText: {
    color: '#F5EE9E',
    fontWeight: 'bold',
    fontSize: 20,
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
  text: {
    color: '#747578',
    fontSize: 20,
  }
});
