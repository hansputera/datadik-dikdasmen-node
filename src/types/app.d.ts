/**
 * Application of SP Datadik Types
 */

/**
 * @description This type refers data in endpoint "/app/routing", they have 3 args (the first one is key of field, the second is route, and the third is label)
 * @example ["logout", "/app/logout", "Tutup Aplikasi"]
 * @actual this endpoint returns array of `AppRoutingData`
 */
export type AppRoutingData = [string, string, string];
