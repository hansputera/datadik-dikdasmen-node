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
