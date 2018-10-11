import { createStyles, colors, padding, fonts } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: padding.sm,
    paddingRight: padding.sm
  },
  itemContainer: {
    paddingTop: padding.sm,
    paddingBottom: padding.sm,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray
  },
  label: {
    flexGrow: 1,
    fontSize: fonts.md
  },
  info: {
    flexGrow: 1,
    fontSize: fonts.md,
    textAlign: 'right'
  }
});

export default styles;
