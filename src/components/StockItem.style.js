import { createStyles, scale, padding } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flex: 1,
    padding: padding.md,
    height: scale(36),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  column: {
    flex: 1
  },

  symbol: {
    textAlign: 'left',
    fontSize: scale(14)
  },

  price: {
    textAlign: 'right',
    color: 'grey',
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
