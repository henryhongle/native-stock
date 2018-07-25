import { createStyles, buttons, padding } from '../helpers/baseStyles';

const styles = createStyles({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  inputContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },

  buttonContainer: {
    width: '100%'
  },

  button: {
    height: buttons.lg,
    borderRadius: 0,
    backgroundColor: 'green'
  },

  datePicker: {
    width: '90%',
    marginTop: padding.sm
  }
});

export default styles;
