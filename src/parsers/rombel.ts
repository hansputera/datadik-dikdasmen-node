import type { RombelData } from '@/types/app.js';
import DOM from '@mojojs/dom';

export const getRombel = async (html: string): Promise<Array<RombelData>> => {
	const dom = new DOM(html);
	const elements = dom.children()[0].children()[0].children()[1].children()[1].children();

	return elements.map((el) => ({
		nama: el.at('td:first-child')?.text().trim() ?? '',
		tingkat: el.at('td:nth-child(2)')?.text().trim() ?? '',
		jurusan: el.at('td:nth-child(3)')?.text().trim() ?? '',
		wali_kelas: el.at('td:nth-child(4)')?.text().trim() ?? '',
		nama_ruang: el.at('td:nth-child(5)')?.text().trim() ?? '',
		kurikulum: el.at('td:nth-child(6)')?.text().trim() ?? '',
		last_update: el.at('td:last-child')?.text().trim() ?? '',
	}));
};
