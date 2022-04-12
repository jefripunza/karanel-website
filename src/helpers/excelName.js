const bulan_indo = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
];

const excelName = (name) => {
    const now = new Date(),
        year = now.getFullYear(),
        month = bulan_indo[now.getMonth()],
        date = now.getDate(),
        hour = now.getHours(),
        minute = now.getMinutes(),
        second = now.getSeconds();
    return [name, year, month, date, hour, minute, second].join('-');
};

export default excelName;
