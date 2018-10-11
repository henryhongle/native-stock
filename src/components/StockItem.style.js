import { createStyles, padding, fonts } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: padding.sm,
    paddingBottom: padding.sm,
    paddingLeft: padding.md,
    paddingRight: padding.md
  },
  primary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondary: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: padding.sm
  },
  column: {
    flex: 1
  },
  symbol: {
    textAlign: 'left',
    fontSize: fonts.md
  },
  afterHours: {
    textAlign: 'left',
    fontSize: fonts.sm,
    fontStyle: 'italic'
  },
  price: {
    textAlign: 'right',
    color: 'grey',
    fontSize: fonts.md
  },

  percent: {
    textAlign: 'right',
    fontSize: fonts.md
  },

  change: {
    textAlign: 'right',
    fontSize: fonts.md
  }
});

export default styles;
