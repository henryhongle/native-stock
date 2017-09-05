import React from 'React';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    Button,
    TouchableHighlight,
    Alert
} from 'react-native';

import StockService from './services/StockService';
import StockDetail from './components/StockDetail';
import StockItem from './components/StockItem'
import API from './API';

const stockService = new StockService();

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            isLoading: false,
            searchString: '',
        };
    }

    componentWillMount() {
        this.setState({ isLoading: true });
        this._fetchStocks();
    }

    _fetchStocks = () => {
        
        stockService.getTickers()
        .then(stocks => {
            this.setState({
                stocks: stocks,
                isLoading: false
            });
        });
    }

    _deleteStock(index) {
        stockService.removeTicker(index);
        var newStocks = this.state.stocks.filter((item, i) => { 
            return index != i;
        });
        this.setState({
            stocks: newStocks
        });
    }

    _renderItem = ({item, index}) => {
        return (
            <TouchableHighlight
                onPress={this._onPress.bind(null, index)}
                onLongPress={this._onLongPress.bind(null, index)}
                underlayColor='#dddddd' >
                <View>
                    <StockItem 
                        data={item}
                    />
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }

    _onPress = (index) => {
        this.props.navigation.navigate('Detail', { stock: this.state.stocks[index] });
    }

    _onLongPress = (index) => {
        var stockName = this.state.stocks[index].Symbol.toUpperCase();
        Alert.alert(`Remove ${stockName}?`, '',
        [
            {text: 'Cancel'},
            {text: 'Delete', onPress: this._deleteStock.bind(this, index)}
        ]);
    }

    _onAddPressed = () => {
        stockService.addTicker(this.state.searchString)
        .then(stocks => {
            this.setState({
                stocks: stocks,
                isLoading: false,
                searchString: ''
            });
        });
    }

    _onTextChanged = (event) => {
        this.setState({
            searchString: event.nativeEvent.text
        });
    }
    
    _keyExtractor = (item, index) => index;

    render() {
        const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.searchInput}
                        placeholder='APPL'
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        onChange={this._onTextChanged}
                    />
                    <Button
                        onPress={() => {}}
                        color='#48BBEC'
                        title='Add'
                        onPress={this._onAddPressed}
                    />
                </View>
                {spinner}
                <View>
                    <FlatList
                        data={this.state.stocks}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        onRefresh={this._fetchStocks}
                        refreshing={false}
                    />
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        padding: 5
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },

    searchInput: {
        padding: 5,
        margin: 5,
        height: 32,
        flexGrow: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC',
    },

    itemContainer: {
        padding: 5,
        
    },

    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    }
});