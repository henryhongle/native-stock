import { createStyles, fonts, padding } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },

  searchIcon: {
    paddingLeft: padding.sm
  },

  clearIcon: {
    paddingRight: padding.sm
  },

  textInput: {
    fontSize: fonts.lg,
    padding: padding.xs,
    flex: 1
  }
});

export default styles;
