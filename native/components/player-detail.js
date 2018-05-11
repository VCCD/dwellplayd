import React from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Button, ActionSheet } from 'native-base'
import { connect } from 'react-redux'
import { fetchCommunity, fetchUserScores } from '../store'
import { ImagePicker, Permissions } from 'expo'

const BUTTONS = [
  'Take photo',
  'Choose from Library',
  'Cancel'
]

const CANCEL_INDEX = 2;

class PlayerDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Player Detail',
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

  _takePicture = () => {
    this.props.navigation.navigate('Camera')
  }

  _pickImage = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      this.props.navigation.navigate('PlayerDetailEdit', {
           img: result.uri
         })
    }
  }

  render() {
    const { user, navigation } = this.props
    return (
      <Container style={styles.list}>
        <Content>
        <View>
        <TouchableOpacity onPress={() => this.changePicture()}>
          <Image style={styles.profileImg} source={{uri: user.imgUrl}} />
        </TouchableOpacity>
        </View>
        <View>
          <Card>
            <TouchableOpacity onPress={() => navigation.navigate('PlayerDetailEdit', {focus: 'firstName'})}>
              <CardItem bordered style={styles.card}>
                <Text style={styles.descriptor}>First Name</Text>
                <Text style={styles.text}>
                  {user.firstName}
                </Text>
              </CardItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PlayerDetailEdit', {focus: 'lastName'})}>
            <CardItem bordered style={styles.card}>
              <Text style={styles.descriptor}>Last Name</Text>
              <Text style={styles.text}>
                {user.lastName}
              </Text>
            </CardItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PlayerDetailEdit', {focus: 'email'})}>
            <CardItem bordered style={styles.card}>
              <Text style={styles.descriptor}>Email</Text>
              <Text style={styles.text}>
                {user.email}
              </Text>
            </CardItem>
            </TouchableOpacity>
          </Card>
        </View>
        </Content>
      </Container>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
  }
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(PlayerDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#8C9A9E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#8C9A9E',
  },
  edit: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#D4F5F5'
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
    color: '#D4F5F5',
    fontSize: 20,
  },
  card: {
    backgroundColor: '#747578',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 60,
  },
  descriptor: {
    color: '#D9D9DA',
    fontSize: 12,
  },
});
