import { createStyles, fonts, scale, colors } from '../helpers/baseStyles';

const styles = createStyles({
  headerContainer: {
    height: scale(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray
  },

  headerColumn: {
    flex: 1
  },

  headerFormat: {
    fontSize: fonts.md,
    textAlign: 'center',
    fontWeight: '500'
  }
});

export default styles;
