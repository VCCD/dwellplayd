import React from 'react';
import { Slider } from 'react-native';

const FrequencySlider = (props) => {
  return (
    <Slider
      style={{ marginLeft: 20, marginRight: 20 }}
      step={1}
      maximumValue={30}
      minimumValue={1}
      onTouchEnd={props.submitSlide}
      onValueChange={(value) => props.change(value)}
      value={props.value} />
  )
}

export default FrequencySlider
