import React, {Component} from 'react'
import {Image, StyleSheet} from 'react-native'
import { Container, Text, Content, Card, CardItem, Left, Right, Button, Icon} from 'native-base';

class ConfirmImage extends Component{
  componentWillMount(){
    this.img = this.props.navigation.getParam('img')
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
                <Button transparent onPress={() => {
                  this.props.navigation.navigate('PlayerDetailEdit',
                  {img: this.img})
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

export default ConfirmImage
