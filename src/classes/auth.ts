import { REGEXES_SSO_AUTH_URL, REGEXES_VHSI, SP_DATADIK_URL } from '@/constants.js';
import { getAuthSsoUrl } from '@/parsers/auth.js';
import type { AuthCookieStorage, AuthLoginParams, AuthLoginPayload } from '@/types/auth.js';
import { fetchUtilities } from '@/utilities/fetch.js';
import { getCurrentIpAddress, getRandomIpAddresses } from '@/utilities/ip.js';

/**
 * @class DikdasmenAuthClient
 */
export class DikdasmenAuthClient {
	// I dont know what the fuck it is data, but required in some requests
	#vhsidata = {
		vhsi: '',
		fetched_at: 0,
	};

	/**
	 * @constructor
	 * @param credentials SSO Credential Parameters for login
	 * @param cookieStore Authentication cookie storage
	 */
	constructor(
		private readonly credentials: AuthLoginPayload,
		private readonly cookieStore: AuthCookieStorage,
	) {}

	public async login(options: AuthLoginParams): Promise<void> {
		const htmlResponse = await fetchUtilities.ky.get<string>(SP_DATADIK_URL).text();
		const authSsoUrl = await getAuthSsoUrl(htmlResponse);

		if (authSsoUrl) {
			const authResponse = await fetchUtilities.ky
				.post(authSsoUrl, {
					body: new URLSearchParams({
						usrname: this.credentials.email,
						passwd: this.credentials.password,
						usraddr: options.anonymizeIp
							? getRandomIpAddresses()
							: await getCurrentIpAddress(), // Does it needed?
						'g-recaptcha-response': '', // This field is empty when I sniff the network page.
					}),
				})
				.text();

			const ssoUrl = REGEXES_SSO_AUTH_URL.exec(authResponse)?.at(0);
			if (!ssoUrl) {
				throw new Error('Failed to get SSO URL');
			}

			const ssoResponse = await fetchUtilities.ky.get(ssoUrl);
			await this.cookieStore.writeCookie(ssoResponse.headers.getSetCookie().join('; '));
		}
	}

	public async getVhsi(): Promise<string> {
		const difftime = Date.now() - this.#vhsidata.fetched_at;

		// If the fetched time after 5 minutes
		if (difftime >= 60_000 * 5) {
			const response = await fetchUtilities.ky
				.get(new URL('./app/', SP_DATADIK_URL), {
					headers: {
						Cookie: await this.cookieStore.readCookie(),
					},
				})
				.text();
			const vhsihash = REGEXES_VHSI.exec(response)?.at(1);

			/**
				NEED TO FIX ASAP (CAPTCHA CHALLANGE)

				Response sample:
				<html><body style="font-family:times;color:white;font-size:15px;" bgcolor="#405f8d"><title>Validation request</title><h3 align="center">User validation required to continue..</h3><hr>Please type the text you see in the image into the text box and submit<p><img src = "/captcha.gif"></p><form name="input" action="/captcha_resp" method="POST" enctype="application/x-www-form-urlencoded"><input type="text" name="captcha_resp_txt" /><input type="submit" value="Submit" /></form></p></body></html><p>[Refresh the page to generate a new image. ]</p><p>Note:<ul><li>If you get here while trying to submit a form, you may have to re-submit the form.</li><li> Access to this domain may need the browser to have javascript and cookie support enabled. </li></ul></p><hr>
				<br><em>Validation needed due to the detection of invalid input from this client IP address, error code : <b><font color=yellow>421</font></b></em><br><em>Number of attempts left : <b><font color=yellow>5</font></b></em>                          
			 */

			if (!vhsihash) {
				throw new Error('Failed to get vhsihash');
			}

			this.#vhsidata.vhsi = vhsihash;
			this.#vhsidata.fetched_at = Date.now();
		}

		return this.#vhsidata.vhsi;
	}

	public async logout(): Promise<void> {
		await this.cookieStore.writeCookie('');
		// Soon, I will write soft flow to logout
	}
}
