import React from 'react';
import { StyleSheet, Text, View, Slider } from 'react-native';
import { Container, Header, Content, List, ListItem, Button, Card, CardItem, Body } from 'native-base'

export default class FrequencySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 15,
    };
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }
  render() {
    const { value } = this.state
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                {`The value is ${this.state.value}`}
                </Text>
              </Body>
            </CardItem>
                <Slider
                  step={1}
                  maximumValue={30}
                  onValueChange={this.change.bind(this)}
                  value={value} />
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: '#fff',
  },
});