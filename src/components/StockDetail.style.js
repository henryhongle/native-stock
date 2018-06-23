import { createStyles, scale } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flex: 1,
    marginRight: scale(10),
    marginLeft: scale(0)
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
    backgroundColor: '#dddddd'
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
