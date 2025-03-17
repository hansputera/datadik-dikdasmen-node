import { DikdasmenClient } from './classes/client.js';
import { CookieFileStore } from './stores/cookie-file-store.js';

const dikdasmen = new DikdasmenClient(
	{
		email: process.env.EM ?? '',
		password: process.env.PW ?? '',
	},
	new CookieFileStore(),
);

dikdasmen.auth
	.login({
		anonymizeIp: true,
	})
	.then(() => {
		// dikdasmen.fetchWsProfile().then(console.log);
		// dikdasmen.fetchPtkData(2024).then(console.log);
		// dikdasmen.fetchSiswa('aktif').then(console.log);
		dikdasmen.fetchSarpras().then(console.log);
	});
