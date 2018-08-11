import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import styles from './Login.style';
import { renderBackButton } from '../components/Header';

class Login extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: renderBackButton(navigation),
    title: 'Login'
  });
  render() {
    return (
      <View style={styles.container}>
        <Button
          icon={
            <Feather
              name='facebook'
              size={24}
              color='white'
            />
          }
          buttonStyle={styles.button}
          title='Login with Facebook'
        />
      </View>
    );
  }
}

export default Login;
