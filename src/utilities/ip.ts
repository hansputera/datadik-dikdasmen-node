import { fetchUtilities } from './fetch.js';

export const getCurrentIpAddress = async (): Promise<string> => {
	const response = await fetchUtilities.ky
		.get<{
			ip: string;
		}>('https://api.ipify.org?format=json')
		.json();
	return response.ip;
};

export const getRandomIpAddresses = (): string =>
	Array(4)
		.fill(0)
		.map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
		.join('.');
