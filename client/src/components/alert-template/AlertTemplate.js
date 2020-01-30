import React from 'react';
import InfoIcon from 'mdi-material-ui/CheckBold';
import SuccessIcon from 'mdi-material-ui/CheckBold';
import ErrorIcon from 'mdi-material-ui/CheckBold';
import CloseIcon from 'mdi-material-ui/Close';

const alertStyle = {
	backgroundColor: '#546e7a',
	color: 'white',
	padding: '10px',
	borderRadius: '3px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	fontSize: '1.6rem',
	boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
	boxSizing: 'border-box'
};

const buttonStyle = {
	marginLeft: '20px',
	border: 'none',
	backgroundColor: 'transparent',
	cursor: 'pointer',
	color: '#FFFFFF'
};

const AlertTemplate = ({ message, options, style, close }) => {
	return (
		<div style={{ ...alertStyle, ...style }}>
			{options.type === 'info' && <InfoIcon />}
			{options.type === 'success' && <SuccessIcon style={{ color: 'lime' }} />}
			{options.type === 'error' && <ErrorIcon />}
			<span style={{ flex: 2, marginLeft: '2rem' }}>{message}</span>
			<button onClick={close} style={buttonStyle}>
				<CloseIcon />
			</button>
		</div>
	);
};

export default AlertTemplate;
