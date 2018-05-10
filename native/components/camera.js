import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {Icon, Button} from 'native-base'
import { Camera, Permissions } from 'expo';

class CameraComponent extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button transparent onPress={() => navigation.goBack()}>
          <Icon style={{color: '#D4F5F5'}} name="arrow-back" />
        </Button>
      )
    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1}} type={this.state.type} ratio={'4:3'}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  margin: 10,
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon name="sync" active style={{color: 'white', fontSize: 30}} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  margin: 7,
                }}
                onPress={async () => {
                  if(this.camera){
                    var res = await this.camera.takePictureAsync()
                    this.props.navigation.navigate('ConfirmImage', {
                      img: res.uri
                    })
                  }
                }}>
                <Icon name="camera" active style={{color: 'white', fontSize: 40}} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default CameraComponent
