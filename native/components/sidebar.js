import React from "react";

import { AppRegistry, Image, StatusBar, ImageBackground, StyleSheet } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Profile", "Tasks", "Scores"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container style={styles.menu}>
        <Content>
          <ImageBackground
            source={{
              uri: "https://banner.kisspng.com/20171207/797/gorgeous-color-smoke-background-5a29f96be548c2.5257235815127002679392.jpg"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Image
              circle
              style={{ height: 80, width: 80 }}
              source={{
                uri: "https://cdn4.iconfinder.com/data/icons/e-commerce-icon-set/48/Username-512.png"
              }}
            />
          </ImageBackground>
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  menu:{
    width: 300
    
  }





})