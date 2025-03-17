/**
 * @description SP Datadik URL
 * @default https://sp.datadik.dikdasmen.go.id
 * @readonly
 */
export const SP_DATADIK_URL: string = 'https://sp.datadik.dikdasmen.go.id';

/**
 * @description Regex SSO Auth URL
 * @readonly
 */
export const REGEXES_SSO_AUTH_URL =
	/https:\/\/sp\.datadik\.dikdasmen\.go\.id\/ssoauth\?code=[0-9a-fA-F]+/;

export const REGEXES_VHSI = /vhsi\s+=\s+'([^']+)';/;
