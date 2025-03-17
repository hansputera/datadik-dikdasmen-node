/**
 * Application of SP Datadik Types
 */

/**
 * @description This type refers data in endpoint "/app/routing", they have 3 args (the first one is key of field, the second is route, and the third is label)
 * @example ["logout", "/app/logout", "Tutup Aplikasi"]
 * @actual this endpoint returns array of `AppRoutingData`
 */
export type AppRoutingData = [string, string, string];

export type SiswaStatus = 'aktif' | 'keluar' | 'terdaftar' | 'lulus';

export type SiswaData = {
	peserta_didik_id: string;
	nama: string;
	jenis_kelamin: string;
	nik?: string;
	nisn?: string;
	tanggal_lahir: string;
	nama_ibu_kandung: string;
	lintang?: number;
	bujur?: number;
	tanggal_keluar?: string;
	alasan?: string;
	keterangan?: string;
	last_update: string;
};

export type SiswaAktifData = Pick<
	SiswaData,
	'nama' | 'jenis_kelamin' | 'nik' | 'nisn' | 'tanggal_lahir' | 'nama_ibu_kandung' | 'last_update'
> & {
	tingkat: string;
	rombel: string;
};

export type SarprasData = {
	ruang: Array<{
		jenis: string;
		nama_bangunan: string;
		nama_ruang: string;
		lantai: number;
		panjang: number;
		lebar: number;
		last_update: string;
	}>;
	bangunan: Array<{
		nama_bangunan: string;
		tahun: number;
		luas: number;
		lantai: number;
		ruang: number;
		kondisi: string;
		bobot_kerusakan: number;
	}>;
};

export type WsProfileData = {
	sekolah_id: string;
	nama: string;
	npsn: string;
	bentuk_pendidikan_id: number;
	bentuk: string;
	status_sekolah: string;
	status_kepemilikan: string;
	sk_izin_operasional: string;
	tanggal_sk_izin_operasional?: string;
	alamat_jalan: string;
	desa_kelurahan: string;
	rt: number;
	rw: number;
	nama_dusun: string;
	kecamatan: string;
	kode_kecamatan: string;
	kota: string;
	kode_kota: string;
	propinsi: string;
	kode_propinsi: string;
	kode_pos: string;
	lintang: number;
	bujur: number;
	kebutuhan_khusus: string;
	sk_pendirian_sekolah?: string;
	tanggal_sk_pendirian?: string;
	no_rekening: string;
	nama_bank: string;
	cabang_kcp_unit: string;
	rekening_atas_nama: string;
	npwp: string;
	nm_wp: string;
	mbs: string;
	kode_registrasi: number;
	nomor_telepon: string;
	nomor_fax?: string;
	email: string;
	website: string;
	nama_kepsek: string;
	nip_kepsek: string;
	kepsek_id: string;
	plt: number;
	nama_bendahara: string;
	bendahara_id: string;
	flag: string;
	nama_nomenklatur?: string;
	nss: string;
	keaktifan: number;
	last_update: string;
};

export type PtkData = {
	ptk_terdaftar_id: string;
	ptk_id: string;
	nama: string;
	jenis_kelamin: string;
	tanggal_lahir: string;
	nik: string;
	nuptk?: string;
	nip?: string;
	nrg?: string;
	kepegawaian: string;
	jenis_ptk: string;
	jabatan_ptk: string;
	nomor_surat_tugas: string;
	tanggal_surat_tugas: string;
	tmt_tugas: string;
	ptk_induk: string;
	last_update: string;
};
