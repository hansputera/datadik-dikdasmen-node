/**
 * @description Payload for login
 */
export type AuthLoginPayload = {
	/**
	 * @description Email of the Dapodik User
	 * @example operator@mail.sman3palu.sch.id
	 */
	email: string;
	/**
	 * @description Password of the Dapodik User
	 * @example operatorsman3paluSuperPassword@
	 */
	password: string;
};

export type AuthCookieStorage = {
	readCookie: () => Promise<string> | string;
	writeCookie: (cookie: string) => Promise<void> | void;
};

/**
 * @description Parameters .login() method
 */
export type AuthLoginParams = {
	/**
	 * @description Anonymize the IP address of the client to dikdasmen
	 * @default true
	 */
	anonymizeIp: boolean;
};
