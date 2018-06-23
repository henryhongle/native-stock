import { createStyles, scale, colors, padding, fonts } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    position: 'absolute',
    zIndex: 10,
    flex: 1,
    flexDirection: 'row',
    marginRight: -padding.md
  },

  flashContainer: {
    flex: 1,
    height: scale(42),
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center'
  },

  message: {
    paddingLeft: padding.sm,
    textAlign: 'center',
    color: 'white',
    fontSize: fonts.md
  }
});

export default styles;
