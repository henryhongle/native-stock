import { createStyles, scale } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    padding: scale(10),
    flex: 1,
    height: scale(36),
    flexDirection: 'row'
  },

  symbol: {
    flexGrow: 1,
    fontSize: scale(14),
    alignSelf: 'center'
  },

  priceContainer: {
    flexGrow: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  defaultContainer: {
    minWidth: scale(45),
    marginLeft: scale(30)
  },

  price: {
    color: 'grey',
    textAlign: 'right',
    fontSize: scale(14)
  },

  percent: {
    textAlign: 'right',
    fontSize: scale(14)
  },

  change: {
    textAlign: 'right',
    fontSize: scale(14)
  }
});

export default styles;
