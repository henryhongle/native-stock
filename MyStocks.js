import React from 'React';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class MyStocks extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>My stocksss</Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});