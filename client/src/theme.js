import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
	headerHeight: '7rem',
	drawerWidth: '22rem',
	typography: {
		htmlFontSize: 10
	},
	palette: {
		primary: {
			main: '#546e7a',
			light: '#819ca9',
			dark: '#29434e'
		}
	},
	overrides: {
		MuiFormHelperText: {
			root: {
				textAlign: 'right'
			}
		}
	}
});
