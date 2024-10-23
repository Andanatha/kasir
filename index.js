function updateJumlah(menuId, change) {
    const input = document.getElementById(menuId);
    let currentValue = parseInt(input.value) || 0; // Menghindari NaN
    currentValue = Math.max(0, currentValue + change);
    input.value = currentValue;
}

document.getElementById('kasirForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let total = 0;
    let transaksiRincian = ""; // Variabel untuk menyimpan rincian transaksi
    const hargaItems = document.querySelectorAll('.menu-item');

    // Ambil nama pembeli
    const namaPembeli = document.getElementById('nama').value;

    hargaItems.forEach((item, index) => {
        const harga = parseInt(item.querySelector('.harga').textContent) || 0; // Ambil harga
        const jumlah = parseInt(document.getElementById(`menu${index + 1}`).value) || 0; // Ambil jumlah
        if (jumlah > 0) { // Hanya tampilkan jika jumlah lebih dari 0
            const subtotal = harga * jumlah;
            total += subtotal;

            // Tambahkan rincian ke string
            transaksiRincian += `<li>Menu ${index + 1} (${item.querySelector('h3').textContent}): ${jumlah} x Rp ${harga} = Rp ${subtotal}</li>`;
        }
    });

    transaksiRincian += "</ul>"; // Menutup <ul>

    const uangDiberi = parseInt(document.getElementById('uangDiberi').value) || 0; // Pastikan uang diberi valid
    const kembalian = uangDiberi - total;

    // Tampilkan hasil

    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML =`<h3>Rincian Transaksi:</h3>
    <h3>Nama Pembeli: ${namaPembeli}</h3>
    ${transaksiRincian}\n
    <h3>Total Harga: ${total}</h3>
    <h3>Uang Pembeli: ${uangDiberi}</h3>
    <h3>Kembalian: ${kembalian}</3>`
    // document.getElementById('hasil').textContent = `Nama Pembeli: ${namaPembeli}\n Total: Rp ${total}, Kembalian: Rp ${kembalian}`;
    // document.getElementById('hasil').textContent = `Total: Rp ${total}\n, Kembalian: Rp ${kembalian}`;
    // Tampilkan rincian transaksi
    // document.getElementById('totalPendapatan').textContent = `Rincian Transaksi:\n${transaksiRincian}`;

    // Penyimpanan data pendapatan menggunakan localStorage
    let pendapatanSebelumnya = parseInt(localStorage.getItem('totalPendapatan')) || 0; // Ambil pendapatan sebelumnya, default 0 jika belum ada
    let pendapatanBaru = pendapatanSebelumnya + total; // Tambahkan total transaksi ke pendapatan sebelumnya

    localStorage.setItem('totalPendapatan', pendapatanBaru); // Simpan pendapatan baru ke localStorage

    // Tampilkan total pendapatan yang sudah tersimpan
    document.getElementById('totalPendapatan').textContent = `Total Pendapatan: Rp ${pendapatanBaru}`;

     // Reset form untuk transaksi baru
     document.getElementById('kasirForm').reset();

     // Kosongkan jumlah di setiap menu menjadi 0
     hargaItems.forEach((item, index) => {
         document.getElementById(`menu${index + 1}`).value = 0;
     });
 
     // Kosongkan hasil transaksi sebelumnya
     setTimeout(() => {
         hasilDiv.innerHTML = ""; // Kosongkan rincian transaksi setelah beberapa detik
     }, 8000); // Rincian transaksi akan dihapus setelah 5 detik
});

// Tampilkan total pendapatan saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    let pendapatanTersimpan = parseInt(localStorage.getItem('totalPendapatan')) || 0; // Ambil pendapatan dari localStorage, default 0 jika belum ada
    document.getElementById('totalPendapatan').textContent = `Total Pendapatan: Rp ${pendapatanTersimpan}`;
});

