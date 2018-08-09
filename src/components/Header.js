import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

export const renderBackButton = navigation => (
  <View style={{ paddingLeft: 10 }}>
    <Icon
      name='arrow-back'
      onPress={() => navigation.goBack()}
    />
  </View>
);

export default {
  renderBackButton
};
