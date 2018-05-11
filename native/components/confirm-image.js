import React, {Component} from 'react'
import {Image, StyleSheet} from 'react-native'
import { Container, Text, Content, Card, CardItem, Left, Right, Button, Icon} from 'native-base';
import CONFIG from '../api-routes'
import { connect } from 'react-redux'
import {completeTaskItem} from '../store'

const apiURL = CONFIG.API_URL

class ConfirmImage extends Component{
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
    this.props.navigate
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
                    this._uploadToCloud(this.img)
                    .then(res => res.json())
                    .then(res => {
                      this.task.completed = new Date()
                      this.task.imgUrl = res.imgUrl
                      this.props.completeTask(this.task)
                    })
                    this.props.navigation.navigate('Tasks')
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
