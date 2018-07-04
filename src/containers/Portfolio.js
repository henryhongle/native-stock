import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import styles from './Portfolio.style';

class Portfolio extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Porfolio</Text>
      </View>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Portfolio);
