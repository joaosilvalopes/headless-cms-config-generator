import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import kebabCase from 'lodash/kebabCase';
import lowerCase from 'lodash/lowerCase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';

import { actions } from '../../../../redux/redux-app';

const styles = theme => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '3rem',
		paddingLeft: '2rem',
		alignItems: 'flex-start',
		width: '22.1rem'
	},
	divider: {
		width: '100%',
		height: '0.2rem',
		marginBottom: '1rem',
		background: theme.palette.primary.main
	},
	title: {
		color: theme.palette.primary.main,
		marginBottom: '1rem',
		fontSize: '3.5rem'
	},
	field: {
		width: '100%',
		marginBottom: '0.5rem'
	},
	helperText: {
		whiteSpace: 'nowrap'
	},
	button: {
		width: '9rem'
	},
	buttons: {
		marginTop: '2rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between'
	}
});

const initialValues = {
	name: '',
	slug: '',
	connectionString: ''
};

function NewApp({ classes }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const alert = useAlert();
	const slugTouchedRef = useRef(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState(initialValues);

	const setValue = (name, value) => {
		setErrors(errors => ({
			...errors,
			[name]: undefined
		}));

		setValues(values => ({
			...values,
			[name]: value
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const clientErrors = Object.keys(values).reduce(
			(errors, key) => ({
				...errors,
				[key]: values[key] ? undefined : `Invalid ${lowerCase(key)}`
			}),
			{}
		);

		if (Object.values(clientErrors).some(Boolean)) {
			setErrors(clientErrors);
			return;
		}

		try {
			setLoading(true);
			await dispatch(actions.create(values));
			alert.success('New app created successfully');
			history.push('/hub');
		} catch (e) {
			if (e.error === 'An app with this slug is already registered.') {
				setErrors(errors => ({
					...errors,
					slug: e.error
				}));
			}
			setLoading(false);
		}
	};

	return (
		<form className={classes.form} onSubmit={handleSubmit}>
			<Typography variant="h1" className={classes.title}>
				New App
			</Typography>
			<Divider className={classes.divider} />
			<TextField
				error={!!errors.name}
				helperText={
					<span className={classes.helperText}>{errors.name || ' '}</span>
				}
				className={classes.field}
				label="Name"
				onChange={e => {
					if (!slugTouchedRef.current) {
						setValue('slug', kebabCase(e.target.value));
					}

					setValue('name', e.target.value);
				}}
				value={values.name}
				type="text"
			/>
			<TextField
				error={!!errors.slug}
				helperText={
					<span className={classes.helperText}>{errors.slug || ' '}</span>
				}
				className={classes.field}
				label="Slug"
				type="text"
				onChange={e => {
					slugTouchedRef.current = true;
					setValue('slug', e.target.value);
				}}
				value={values.slug}
			/>
			<TextField
				error={!!errors.connectionString}
				helperText={
					<span className={classes.helperText}>
						{errors.connectionString || ' '}
					</span>
				}
				className={classes.field}
				name="connectionString"
				label="Connection String"
				onChange={e => {
					setValue('connectionString', e.target.value);
				}}
				value={values.connectionString}
				type="text"
			/>
			<div className={classes.buttons}>
				<Button
					variant="outlined"
					onClick={() => history.push('/hub')}
					color="secondary"
					className={classes.button}
				>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="outlined"
					color="primary"
					className={classes.button}
				>
					{loading ? <CircularProgress size={24} /> : 'Save'}
				</Button>
			</div>
		</form>
	);
}

export default withStyles(styles)(NewApp);
