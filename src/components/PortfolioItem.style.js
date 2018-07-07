import { createStyles, fonts, colors, scale } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(48)
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
