const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
	// Validation
	username: username =>
		!!(username && username.length > 3 && username.length < 16),
	email: email => EMAIL_REGEX.test(String(email).toLowerCase()),
	password: password =>
		!!(password && password.length > 6 && password.length < 255)
};
