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
    Alert,
    Dimensions,
    Keyboard
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import { stockService } from '../services/StockService';
import StockDetail from '../components/StockDetail';
import StockItem from '../components/StockItem';
import SearchBar from '../components/SearchBar';
import FlashMessage from '../components/FlashMessage';
import { connect } from 'react-redux';
import { getStocks, addStock, deleteStock } from '../actions/stockActions';
import { scale } from '../helpers/Reponsive';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            searchSelected: null
        };
    }

    componentWillMount() {
        this.props.fetchStocks(true);
    }

    _onSearchSelected = (item) => {
        this.setState({
            searchSelected: item,
            suggestions: []
        });
    }

    _onPress = (index) => {
        this.props.navigation.navigate('Detail', { stock: this.props.stocks[index] });
    }

    _keyExtractor = (item, index) => index;

    _updateSuggestion = (suggestions) => {
        this.setState({
            suggestions
        });
    }

    _addStock = (ticker) => {
        this.props.addStock(ticker);
        Keyboard.dismiss();
    }

    _renderItem = ({item, index}) => {
        const swipeSettings = {
            autoClose: true,
            right: [
                { onPress:  this.props.deleteStock.bind(this, index), text: 'Delete', type: 'delete' }
            ],
            backgroundColor: 'transparent'
        };

        return (
            <Swipeout {...swipeSettings}
                backgroundColor= 'transparent'>
                <TouchableHighlight
                    onPress={this._onPress.bind(null, index)}
                    underlayColor='#dddddd' >
                    <View>
                        <StockItem
                            data={item}
                        />
                        <View style={styles.separator} />
                    </View>
                </TouchableHighlight>
            </Swipeout>
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

    render() {
        return (
            <View style={styles.container}>
                <FlashMessage />
                <SearchBar
                    onSearchCompleted={this._updateSuggestion}
                    onItemSelected={this.state.searchSelected}
                    onItemAdded={this._addStock}
                />

                { this.state.suggestions.length == 0 
                    && <View>
                        <FlatList style={styles.stocksContainer}
                            data={this.props.stocks}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                            onRefresh={this.props.fetchStocks}
                            refreshing={this.props.isFetching}
                        />
                    </View>
                }

                { this.state.suggestions.length != 0
                    && <View>
                        <FlatList
                            data={this.state.suggestions}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderSuggestionItem}
                            keyboardShouldPersistTaps='always'
                        />
                    </View>
                }
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        padding: scale(10)
    },

    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },

    suggestionContainer: {
        padding: scale(5)
    },

    stock: {
        fontSize: scale(14),
        paddingLeft: scale(10)
    }
});

const mapStatetoProps = (state) => {
    return {
        stocks: state.stocks.stocks,
        isFetching: state.stocks.isFetching
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStocks: () => {
            dispatch(getStocks());
        },

        addStock: (stock) => {
            dispatch(addStock(stock));
        },

        deleteStock: (index) => {
            dispatch(deleteStock(index));
        }
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);