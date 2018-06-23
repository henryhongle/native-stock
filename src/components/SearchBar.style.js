import { createStyles, scale, colors } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchInput: {
    padding: scale(5),
    height: scale(32),
    flex: 5,
    fontSize: scale(16),
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: scale(8),
    color: colors.blue,
    alignSelf: 'center'
  },

  addButtonContainer: {
    flex: 1
  }
});

export default styles;
