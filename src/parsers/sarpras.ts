import type { SarprasData } from '@/types/app.js';
import DOM from '@mojojs/dom';

export const getSarprasData = (html: string): SarprasData => {
	const dom = new DOM(html);

    // TODO: fix element route to get the ruang and bangunan data
    // const xlsDiv = dom.children()[0].children()[0].children();

    // console.log(xlsDiv.map(x => [x.tag, x.attr]))
	return {
		ruang: dom.find('#ruang tbody tr').map((res) => ({
			jenis: res.at('td:first-child')?.text().trim() ?? '-',
			nama_bangunan: res.at('td:nth-child(2)')?.text().trim() ?? '-',
			nama_ruang: res.at('td:nth-child(3)')?.text().trim() ?? '-',
			lantai: Number.parseInt(res.at('td:nth-child(4)')?.text().trim() ?? '0'),
			panjang: Number.parseFloat(res.at('td:nth-child(5)')?.text().trim() ?? '0'),
			lebar: Number.parseFloat(res.at('td:nth-child(6)')?.text().trim() ?? '0'),
			last_update: res.at('td:last-child')?.text().trim() ?? '-',
		})),
		bangunan: dom.find('#tbangunan tbody tr').map((res) => ({
			nama_bangunan: res.at('td:first-child')?.text().trim() ?? '-',
			tahun: Number.parseInt(res.at('td:nth-child(2)')?.text().trim() ?? '0'),
			luas: Number.parseFloat(res.at('td:nth-child(3)')?.text().trim() ?? '0'),
			lantai: Number.parseInt(res.at('td:nth-child(4)')?.text().trim() ?? '0'),
			ruang: Number.parseInt(res.at('td:nth-child(5)')?.text().trim() ?? '0'),
			kondisi: res.at('td:nth-child(6)')?.text().trim() ?? '-',
			bobot_kerusakan: Number.parseFloat(res.at('td:nth-child(7)')?.text().trim() ?? '0'),
		})),
	};
};
