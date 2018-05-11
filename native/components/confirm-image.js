import React, {Component} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import { Container, Text, Content, Card, CardItem, Left, Right, Button, Icon} from 'native-base';
import CONFIG from '../api-routes'
import { connect } from 'react-redux'
import {completeTaskItem} from '../store'
import Modal from 'react-native-modal'

const apiURL = CONFIG.API_URL

class ConfirmImage extends Component{
  constructor(props){
    super(props)
    this.state = {
      modal: false
    }
  }
  componentWillMount(){
    this.img = this.props.navigation.getParam('img')
    this.action = this.props.navigation.getParam('action')
    this.task = this.props.navigation.getParam('task')
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

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <Text>You completed '{this.task.task.name}'</Text>
    </View>
  );

  render(){
    return (
    <Container>
      <Content>
        <Card style={styles.card}>
          <CardItem cardBody>
            <Image source={{uri: this.img}} style={styles.img} />
          </CardItem>
          <CardItem>
              <Left>
                <Button transparent onPress={ () => {
                  if (this.action === 'proof') {
                    this.setState({modal: true})
                    this._uploadToCloud(this.img)
                    .then(res => res.json())
                    .then(res => {
                      this.task.completed = new Date()
                      this.task.imgUrl = res.imgUrl
                      this.props.completeTask(this.task)
                      this.setState({modal: false})
                      this.props.navigation.navigate('Tasks')
                    })
                  }
                  else {
                    this.props.navigation.navigate('PlayerDetailEdit',
                    {img: this.img})
                  }
                  }}>
                  <Icon active name="thumbs-up" />
                  <Text>Use picture</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                  <Icon active name="camera" />
                  <Text>Take another</Text>
                </Button>
              </Right>
            </CardItem>
        </Card>
        <Modal
        isVisible={this.state.modal}
        animationInTiming={600}
        animationOutTiming={200}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
      </Content>
     </Container>
     )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 400,
  },
  img: {
    flex: 1,
    height: 400,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: '#8C9A9E',
  }
})

const mapState = null

const mapDispatch = dispatch => {
  return {
    completeTask: taskItem => {
      dispatch(completeTaskItem(taskItem))
    },
  }
}

export default connect(mapState, mapDispatch)(ConfirmImage)
