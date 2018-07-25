import { createStyles, scale, fonts, padding } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },

  suggestionContainer: {
    padding: scale(5)
  },

  emptyDescription: {
    alignSelf: 'center'
  },

  emptyText: {
    fontSize: fonts.lg,
    paddingTop: padding.xl,
    color: 'gray'
  }
});

export default styles;
