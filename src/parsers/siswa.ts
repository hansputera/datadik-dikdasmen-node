import type { SiswaAktifData } from '@/types/app.js';
import DOM from '@mojojs/dom';

export const getSiswaDatas = (html: string) => {
	const dom = new DOM(html);

	// The first item is part of table headers, so we need to remove it
	const tableRes = dom.find('tr').slice(1);

	return tableRes.map<SiswaAktifData>((res) => ({
		nama: res.at('td')?.text().trim() ?? '-',
		jenis_kelamin: res.at('td:nth-child(2)')?.text().trim() ?? '-',
		tanggal_lahir: res.at('td:nth-child(3)')?.text().trim() ?? '-',
		nama_ibu_kandung: res.at('td:nth-child(4)')?.text().trim() ?? '-',
		nik: res.at('td:nth-child(5)')?.text().trim() ?? '-',
		nisn: res.at('td:nth-child(6)')?.text().trim() ?? '-',
		tingkat: res.at('td:nth-child(7)')?.text().trim() ?? '-',
		rombel: res.at('td:nth-child(8)')?.text().trim() ?? '-',
		last_update: res.at('td:last-child')?.text().trim() ?? '-',
	}));
};
