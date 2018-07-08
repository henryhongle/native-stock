import { createStyles, fonts, colors, scale } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(48),
    backgroundColor: colors.lightGray
  },

  column: {
    flex: 1
  },

  primary: {
    textAlign: 'center',
    fontSize: fonts.md
  },

  secondary: {
    textAlign: 'center',
    fontSize: fonts.md,
    color: colors.gray
  }
});

export default styles;
