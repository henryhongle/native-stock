import { createStyles, scale, colors } from '../helpers/baseStyles';

const styles = createStyles({
  separator: {
    height: 1,
    backgroundColor: colors.lightGray
  },

  suggestionContainer: {
    padding: scale(5)
  },

  stock: {
    fontSize: scale(14),
    paddingLeft: scale(10)
  },

  loadingIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
