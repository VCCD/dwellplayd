import React from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { Container, Content, Card, CardItem, Button } from 'native-base'
import { connect } from 'react-redux'
import { fetchCommunity } from '../store'
import { ImagePicker, Permissions, Camera } from 'expo'
import CONFIG from '../api-routes'

const apiURL = CONFIG.API_URL

const roundToTenths = num => {
  return Math.round(num * 10) / 10
}

class PlayerDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Player Detail',
      headerRight: (
        <Button
          transparent
          onPress={() => navigation.navigate('PlayerDetailEdit')}>
          <Text style={styles.edit}>
            Edit
          </Text>
        </Button>
      ),
    }
  }

  constructor(props){
    super(props)
    this.state = {
      image: null,
      hasCameraPermission: null,
    }
  }

  score = userId => {
    let score = 0;
    const { taskItems } = this.props.community
    taskItems.forEach(taskItem => {
      if (taskItem.userId === userId) score += taskItem.points
    })
    return roundToTenths(score)
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    console.log(result)

    const image = {
      uri: result.uri,
      type: 'image/jpeg',
      name: `user-${Date.now()}.jpg`
    }

    const imgBody = new FormData()
    imgBody.append('image', image)
    console.log('imgBody', imgBody)
    const url = `${apiURL}/cloud/image-upload`
    var res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: imgBody
    })
    console.log('res', res)
  }

  render() {
    const { user, community } = this.props
    return (
      <Container style={styles.list}>
        <Image style={styles.profileImg} source={require('../public/profile.jpg')}/>
        <Content>
          <Card>
            <CardItem bordered>
              <Text>
                Name: {`${user.firstName} ${user.lastName}`}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Email: {user.email}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Score: {this.score(user.id)}
              </Text>
            </CardItem>
            <CardItem bordered>
              <Text>
                Dwelling: {community.name}
              </Text>
            </CardItem>
          </Card>
        <Button onPress={this._pickImage}><Text>Pick Image</Text></Button>
        </Content>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    community: state.community,
    user: state.user,
  }
}

const mapDispatch = dispatch => {
  return {
    getCommunity: id => {
      dispatch(fetchCommunity(id))
    }
  }
}

export default connect(mapState, mapDispatch)(PlayerDetail)

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
  },
  edit: {
    marginRight: 20
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  }
});
