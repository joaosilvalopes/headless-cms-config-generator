import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { withStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import isValid from './validations';
import sdk from '../../sdk';

const styles = theme => ({
	dialogActions: {
		marginTop: '1rem',
		padding: 0,
		display: 'flex',
		justifyContent: 'space-between',
		width: '20rem'
	},
	dialogTitle: {
		color: theme.palette.primary.main,
		marginBottom: '1rem',
		padding: 0
	},
	divider: {
		marginBottom: '1rem',
		background: theme.palette.primary.main
	},
	field: {
		width: '20rem',
		whiteSpace: 'nowrap'
	},
	dialogContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: 0,
		overflowY: 'unset'
	},
	dialog: {
		width: '50%',
		maxWidth: '40rem',
		padding: '1.6rem 2.4rem'
	},
	button: {
		width: '9rem'
	}
});

const initialValues = {
	username: '',
	email: '',
	password: '',
	confirmPassword: ''
};

function RegisterButton({ classes, ...props }) {
	const alert = useAlert();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState(initialValues);
	const [errors, setErrors] = useState({});

	const handleValueChange = e => {
		const { name, value } = e.target;

		setValues(values => ({ ...values, [name]: value }));
		name !== 'confirmPassword' &&
			setErrors(errors => ({
				...errors,
				[name]: !isValid[name](value) && `Invalid ${name}`
			}));
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async () => {
		const newErrors = Object.keys(values).reduce(
			(newErrors, name) =>
				name !== 'confirmPassword'
					? {
							...newErrors,
							[name]:
								errors[name] ||
								(!isValid[name](values[name]) && `Invalid ${name}`)
					  }
					: {
							...newErrors,
							confirmPassword: values.confirmPassword !== values.password
					  },
			errors
		);

		setErrors(newErrors);

		if (Object.values(newErrors).every(e => !e)) {
			try {
				setLoading(true);
				await sdk.post('/register', values);
				setLoading(false);
				setOpen(false);
				alert.success(
					'A verification email has been sent to your email account'
				);
			} catch (e) {
				setLoading(false);
				const { error } = e;

				if (error === 'A user with this email is already registered.') {
					setErrors(errors => ({ ...errors, email: error }));
				} else if (
					error === 'A user with this username is already registered.'
				) {
					setErrors(errors => ({ ...errors, username: error }));
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
				Register
			</Button>
			<Dialog
				open={open}
				classes={{ paperScrollPaper: classes.dialog }}
				onClose={handleClose}
			>
				<DialogTitle className={classes.dialogTitle}>Register</DialogTitle>
				<Divider className={classes.divider} />
				<DialogContent className={classes.dialogContent}>
					<TextField
						error={!!errors.username}
						helperText={errors.username || ' '}
						className={classes.field}
						autoFocus
						name="username"
						onChange={handleValueChange}
						label="Username"
						type="text"
					/>
					<TextField
						error={!!errors.email}
						helperText={errors.email || ' '}
						className={classes.field}
						autoFocus
						name="email"
						onChange={handleValueChange}
						label="Email Address"
						type="email"
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
					<TextField
						error={values.password !== values.confirmPassword}
						helperText={
							values.password !== values.confirmPassword
								? 'Password and confirm password must match'
								: ' '
						}
						className={classes.field}
						autoFocus
						name="confirmPassword"
						onChange={handleValueChange}
						label="Confirm Password"
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
						{loading ? <CircularProgress size={24} /> : 'Register'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default withStyles(styles)(RegisterButton);
