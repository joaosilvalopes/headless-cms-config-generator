import React from 'react';
import SettingsIcon from 'mdi-material-ui/Settings';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const CUBE_SIZE = 15;

const styles = ({ palette: { primary } }) => ({
	'@keyframes spin2d': {
		'0%': {
			transform: 'rotate(0deg)'
		},
		'100%': {
			transform: 'rotate(360deg)'
		}
	},
	'@keyframes spin': {
		'0%': {
			transform: 'rotate3d(1,0,0,-20deg) rotateY(0)'
		},
		'50%': {
			transform: 'rotate3d(1,0,0,-20deg) rotateY(180deg)'
		},
		'100%': {
			transform: 'rotate3d(1,0,0,-20deg) rotateY(360deg)'
		}
	},
	'@keyframes levitate': {
		to: {
			transform: 'translateY(-5rem)'
		}
	},
	'@keyframes grow': {
		from: {
			transform: 'rotateX(90deg) scale(1.1)'
		},
		to: {
			transform: 'rotateX(90deg) scale(1.3)'
		}
	},
	cubeWrapper: {
		animation: '$spin 3s infinite linear',
		transformStyle: 'preserve-3d'
	},
	cube: {
		animation: '$levitate 1s infinite alternate ease-in-out',
		position: 'relative',
		width: `${CUBE_SIZE}rem`,
		height: `${CUBE_SIZE}rem`,
		transformStyle: 'preserve-3d'
	},
	icon: {
		width: '100%',
		height: '100%',
		color: 'white',
		animation: '$spin2d 2s infinite linear'
	},
	iconWrapper: {
		position: 'absolute',
		backgroundColor: fade(primary.main, 0.5),
		width: '100%',
		height: '100%',
		'&:nth-child(1)': {
			transform: `translateZ(${CUBE_SIZE / 2}rem)`
		},
		'&:nth-child(2)': {
			transform: `translateZ(-${CUBE_SIZE / 2}rem)`
		},
		'&:nth-child(3)': {
			transform: `translateY(-${CUBE_SIZE / 2}rem) rotateX(90deg)`
		},
		'&:nth-child(4)': {
			transform: `translateY(${CUBE_SIZE / 2}rem) rotateX(90deg)`
		},
		'&:nth-child(5)': {
			transform: `translateX(-${CUBE_SIZE / 2}rem) rotateY(90deg)`
		},
		'&:nth-child(6)': {
			transform: `translateX(${CUBE_SIZE / 2}rem) rotateY(90deg)`
		}
	},
	wrapper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		minHeight: '40rem',
		width: '100%'
	},
	shadow: {
		position: 'absolute',
		animation: '$grow 1s infinite alternate ease-in-out',
		width: '100%',
		height: '100%',
		transform: 'rotateX(90deg)',
		backgroundColor: 'rgba(85, 85, 85, 0.5)',
		filter: 'blur(0.8rem)'
	}
});

function SettingsCube({ classes }) {
	return (
		<div className={classes.wrapper}>
			<div className={classes.cubeWrapper}>
				<div className={classes.cube}>
					{[...Array(6)].map((_, i) => (
						<div key={i} className={classes.iconWrapper}>
							<SettingsIcon className={classes.icon} />
						</div>
					))}
				</div>
				<div className={classes.shadow} />
			</div>
		</div>
	);
}

export default withStyles(styles)(SettingsCube);
