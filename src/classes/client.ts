import type { AuthCookieStorage, AuthLoginPayload } from '@/types/auth.js';
import { DikdasmenAuthClient } from './auth.js';
import { fetchUtilities } from '@/utilities/fetch.js';
import { SP_DATADIK_URL } from '@/constants.js';
import type { SiswaData, SiswaStatus, PtkData, WsProfileData, SarprasData } from '@/types/app.js';
import { getSiswaDatas } from '@/parsers/siswa.js';
import { getSarprasData } from '@/parsers/sarpras.js';

/**
 * @class DikdasmenClient
 */
export class DikdasmenClient {
	/**
	 * @description Authentication client
	 * @readonly
	 */
	public readonly auth!: DikdasmenAuthClient;

	/**
	 * @constructor
	 * @param ssoCredentials SSO Credential Parameters for login
	 * @param cookieStore Authentication cookie storage
	 */
	constructor(
		ssoCredentials: AuthLoginPayload,
		private readonly cookieStore: AuthCookieStorage,
	) {
		this.auth = new DikdasmenAuthClient(ssoCredentials, cookieStore);
	}

	public async fetchWsProfile(): Promise<WsProfileData> {
		const http = await this.getHttp();

		return http.get<WsProfileData>('./sekolah/wsprofile').json();
	}

	public async fetchPtkData(year: number): Promise<PtkData[]> {
		const http = await this.getHttp();

		return http
			.post<PtkData[]>('./sekolah/ptk', {
				body: new URLSearchParams({
					tahun: year.toString(),
				}),
			})
			.json();
	}

	public async fetchSiswa(status: SiswaStatus, year?: number) {
		const http = await this.getHttp();

		if (status === 'aktif') {
			const htmlResponse = await http.get('./sekolah/siswa').text();
			return getSiswaDatas(htmlResponse);
		}

		if (status === 'lulus' && !year) {
			throw new Error('Year is required for "lulus" status');
		}

		const url = `./sekolah/pd${encodeURIComponent(status)}${
			status === 'lulus' && year ? `/${year}` : ''
		}`;

		return http.get<SiswaData[]>(url).json();
	}

	public async fetchSarpras(): Promise<SarprasData> {
		const http = await this.getHttp();
		const response = await http.get('./sekolah/ruang').text();
		return getSarprasData(response);
	}

	public async getHttp() {
		const vhsi = await this.auth.getVhsi();
		return fetchUtilities.ky.extend({
			prefixUrl: SP_DATADIK_URL,
			headers: {
				Cookie: await this.cookieStore.readCookie(),
			},
			searchParams: new URLSearchParams({
				_s: vhsi,
			}),
		});
	}
}
