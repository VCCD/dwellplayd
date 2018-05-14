import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, ActionSheet, Icon } from 'native-base'
import t from 'tcomb-form-native'
import { connect } from 'react-redux'
import { updateUser } from '../store'
import customFormStyle from '../customFormStyle'
import { ImagePicker, Permissions, Camera } from 'expo'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const BUTTONS = [
  'Take photo',
  'Choose from Library',
  'Cancel'
]

const CANCEL_INDEX = 2;

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

class PlayerDetailEdit extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imgUrl: this.props.user.imgUrl,
      firstNameFocus: false,
      lastNameFocus: false,
      emailFocus: false,
    }
  }

  options = () => {
    return {
      stylesheet: customFormStyle,
      fields: {
        firstName: {
          label: `first name`,
          error: 'first name cannot be empty',
          autoFocus: this.state.firstNameFocus,
        },
        lastName: {
          label: `last name`,
          error: 'last name cannot be empty',
          autoFocus: this.state.lastNameFocus,
        },
        email: {
          label: `email`,
          error: 'please enter a valid email',
          autoFocus: this.state.emailFocus,
        },
      }
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

  changePicture = () => {
    ActionSheet.show({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    }, buttonIndex => {
      if (buttonIndex === 0) this._takePicture()
      if (buttonIndex === 1) this._pickImage()
    })
  }

  componentWillMount(){
    let newImg = this.props.navigation.getParam('img')
    if (newImg) {
      this.setState({imgUrl: newImg})
    }
    let focus = this.props.navigation.getParam('focus')
    if (focus === 'firstName') this.setState({firstNameFocus: true})
    if (focus === 'lastName') this.setState({lastNameFocus: true})
    if (focus === 'email') this.setState({emailFocus: true})
  }

  handleSubmit = () => {
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
        communityId: user.communityId,
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

    if (!result.cancelled) this.setState({imgUrl: result.uri})
  }

  _takePicture = () => {
    this.props.navigation.navigate('Camera')
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={styles.form}>
        <TouchableOpacity onPress={() => this.changePicture()}>
          <Image style={styles.profileImg} source={{uri: this.state.imgUrl}} />
        </TouchableOpacity>
          <Form
            ref={c => { this._form = c }}
            type={UserEdit}
            value={this.value}
            options={this.options}
          />
          <Button rounded style={styles.button} onPress={this.handleSubmit}><Text style={styles.text}>update</Text></Button>
        </Content>
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
    updateUserInfo: async (userId, form) => {
      await dispatch(updateUser(userId, form))
      ownProps.navigation.navigate('Profile')
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
    margin: 15,
    borderColor: '#D4F5F5',
    borderWidth: 1.5
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
    backgroundColor: '#D4F5F5',
  },
  text: {
    color: '#747578',
    fontSize: 20,
    fontWeight: `bold`
  },
  edit: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#D4F5F5',
    justifyContent: 'flex-end'
  },
});
