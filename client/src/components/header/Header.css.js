export default theme => ({
	appBar: {
		height: theme.headerHeight,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		display: 'flex',
		alignItems: 'center'
	},
	icon: {
		marginRight: '1rem'
	},
	logoutButton: {
		height: '100%',
		marginLeft: 'auto',
		color: 'white',
		textTransform: 'none',
		padding: '0.6rem 1.8rem'
	},
	logoutIcon: {
		marginLeft: '1rem'
	}
});
