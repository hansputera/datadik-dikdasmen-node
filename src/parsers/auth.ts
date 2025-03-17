import DOM from '@mojojs/dom';

export const getAuthSsoUrl = async (html: string): Promise<string | undefined> => {
	const dom = new DOM(html);
	return dom.at('a[class="btn btn-primary btn-round"]')?.attr.href;
};
