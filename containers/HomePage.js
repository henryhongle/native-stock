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

import { stockService } from '../services/StockService';
import StockDetail from '../components/StockDetail';
import StockItem from '../components/StockItem';
import SearchBar from '../components/SearchBar';
import API from '../API';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            isLoading: false,
            suggestions: [],
            searchSelected: null
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

    _renderSuggestionItem = ({item, index}) => {
        return (
            <TouchableHighlight
                underlayColor='#dddddd'
                onPress={this._onSearchSelected.bind(null, item)} >
                <View>
                    <View style={styles.suggestionContainer}>
                        <Text style={styles.stock}>{item.symbol}</Text>
                        <Text style={styles.stock}>{item.name}</Text>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
            
        );
    }

    _onSearchSelected = (item) => {
        console.log('item', item);
        this.setState({
            searchSelected: item,
            suggestions: []
        });
    }

    _onPress = (index) => {
        this.props.navigation.navigate('Detail', { stock: this.state.stocks[index] });
    }

    _onLongPress = (index) => {
        var stockName = this.state.stocks[index].Symbol.toUpperCase();
        Alert.alert('', `Remove ${stockName}?`,
        [
            {text: 'Cancel'},
            {text: 'Delete', onPress: this._deleteStock.bind(this, index)}
        ]);
    }

    _keyExtractor = (item, index) => index;

    _updateSuggestion = (suggestions) => {
        this.setState({
            suggestions
        });
    }

    _updateTickers = (stocks) => {
        this.setState({
            stocks
        })
    } 

    render() {
        const spinner = this.state.isLoading ? <ActivityIndicator size='large' /> : null;
        return (
            <View style={styles.container}>
                <SearchBar
                    onSearchCompleted={this._updateSuggestion}
                    onItemSelected={this.state.searchSelected}
                    onItemAdded={this._updateTickers}
                />

                {spinner}
                { this.state.suggestions.length == 0 
                    && <View>
                        <FlatList
                            data={this.state.stocks}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            onRefresh={this._fetchStocks}
                            refreshing={false}
                        />
                    </View>
                }

                { this.state.suggestions.length != 0
                    && <View>
                        <FlatList
                            data={this.state.suggestions}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderSuggestionItem}
                        />
                    </View>
                }
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

    itemContainer: {
        padding: 5,
    },

    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },

    suggestionContainer: {
        padding: 5
    },

    stock: {
        fontSize: 14,
        paddingLeft: 10
    }
});