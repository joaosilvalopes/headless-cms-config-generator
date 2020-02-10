import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import { useAlert } from 'react-alert';

import { actions } from '../../redux/redux-user';
import sdk from '../../sdk';
import isValid from '../register-button/validations';

const styles = theme => ({
	dialogTitle: {
		color: theme.palette.primary.main,
		padding: '0',
		marginBottom: '1rem'
	},
	dialogActions: {
		marginTop: '1rem',
		padding: 0,
		display: 'flex',
		justifyContent: 'space-between',
		width: '20rem'
	},
	divider: {
		marginBottom: '1rem',
		background: theme.palette.primary.main
	},
	dialog: {
		width: '50%',
		maxWidth: '40rem',
		padding: '1.6rem 2.4rem'
	},
	dialogContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: 0,
		overflowY: 'unset'
	},
	field: {
		width: '20rem',
		whiteSpace: 'nowrap'
	},
	button: {
		width: '9rem'
	}
});

function LoginButton({ classes, onLogin, ...props }) {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});
	const [errors, setErrors] = useState({});
	const alert = useAlert();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleValueChange = e => {
		const { name, value } = e.target;

		setValues(values => ({ ...values, [name]: value }));

		if (name === 'login') {
			setErrors(errors => ({
				...errors,
				login:
					!(isValid.username(value) || isValid.email(value)) &&
					'Invalid email or username'
			}));
		} else if (name === 'password') {
			setErrors(errors => ({
				...errors,
				password: !isValid.password(value) && 'Invalid password.'
			}));
		}
	};

	const handleSubmit = async () => {
		const newErrors = { ...errors };

		if (!(isValid.username(values.login) || isValid.email(values.login))) {
			newErrors.login = 'Invalid email or username.';
		}

		if (!isValid.password(values.password)) {
			newErrors.password = 'Invalid password.';
		}

		setErrors(newErrors);

		if (Object.values(newErrors).every(e => !e)) {
			try {
				setLoading(true);
				const res = await sdk.post('/login', values);

				setLoading(false);
				setOpen(false);
				localStorage.setItem('auth', JSON.stringify(res));
				dispatch(actions.login(res));
				alert.success('Logged in sucessfully');
				onLogin();
			} catch ({ error }) {
				setLoading(false);
				if (error === 'User not verified.' || error === "User doesn't exist.") {
					setErrors(errors => ({ ...errors, login: error }));
				} else if (error === 'Wrong password.') {
					setErrors(errors => ({ ...errors, password: error }));
				}
			}
		}
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				size="large"
				variant="outlined"
				color="primary"
				{...props}
			>
				Login
			</Button>
			<Dialog
				open={open}
				classes={{ paperScrollPaper: classes.dialog }}
				onClose={handleClose}
			>
				<DialogTitle className={classes.dialogTitle}>Login</DialogTitle>
				<Divider className={classes.divider} />
				<DialogContent className={classes.dialogContent}>
					<TextField
						error={!!errors.login}
						helperText={errors.login || ' '}
						className={classes.field}
						autoFocus
						name="login"
						onChange={handleValueChange}
						label="Email or username"
						type="text"
					/>
					<TextField
						error={!!errors.password}
						helperText={errors.password || ' '}
						className={classes.field}
						autoFocus
						name="password"
						onChange={handleValueChange}
						label="Password"
						type="password"
					/>
				</DialogContent>
				<DialogActions className={classes.dialogActions}>
					<Button
						onClick={handleClose}
						className={classes.button}
						variant="outlined"
						color="secondary"
					>
						Cancel
					</Button>
					<Button
						onClick={handleSubmit}
						className={classes.button}
						variant="outlined"
						color="primary"
					>
						{loading ? <CircularProgress size={24} /> : 'Login'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default withStyles(styles)(LoginButton);
