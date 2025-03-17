import ky from 'ky';

export const fetchUtilities = {
	ky: ky.create({
		headers: {
			'User-Agent': 'DatadikdasmenSP/0.0.1',
		},
	}),
};
