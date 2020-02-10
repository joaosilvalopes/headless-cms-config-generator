import buildFormData from './buildFormData';

const API_URL = 'http://localhost:5000/api';

const serializeBody = {
	'application/json': JSON.stringify,
	'multipart/form-data': buildFormData
};

export default ['post', 'get', 'delete', 'put'].reduce(
	(acc, method) => ({
		...acc,
		[method]: async (url, body, contentType = 'application/json') => {
			const auth = localStorage.getItem('auth');
			const token = auth && JSON.parse(auth).token;
			const res = await fetch(`${API_URL}${url}`, {
				method,
				headers:
					contentType === 'multipart/form-data'
						? {
								Authorization: token && `Bearer ${token}`
						  }
						: {
								Authorization: token && `Bearer ${token}`,
								'Content-Type': contentType
						  },
				body: serializeBody[contentType](body)
			});
			const json = await res.json();

			if (res.status !== 200) {
				throw json;
			}

			return json;
		}
	}),
	{}
);
