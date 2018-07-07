import { createStyles, scale, colors } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingRight: scale(10)
  },
  itemContainer: {
    padding: scale(5),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scale(36)
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray
  },
  label: {
    paddingLeft: 10,
    flexGrow: 1,
    fontSize: scale(14)
  },
  info: {
    flexGrow: 1,
    fontSize: scale(14),
    justifyContent: 'flex-end',
    textAlign: 'right'
  }
});

export default styles;
