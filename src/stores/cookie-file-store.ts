import type { AuthCookieStorage } from '@/types/auth.js';
import { readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export class CookieFileStore implements AuthCookieStorage {
	#authFile = join(tmpdir(), 'auth-cookie-dikdasmen.txt');

	constructor(readonly authFile?: string) {
		if (authFile) {
			this.#authFile = authFile;
		}
	}

	public async readCookie(): Promise<string> {
		const contents = await readFile(this.#authFile, 'utf-8');
		return contents;
	}

	public async writeCookie(cookie: string): Promise<void> {
		await writeFile(this.#authFile, cookie);
	}
}
