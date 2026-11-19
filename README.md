# AlpineSPA Starter Kit

Starter kit **Single Page Application (SPA)** ringan, modern, dan tanpa *build step* (zero-bundler) yang dibangun menggunakan **Alpine.js v3**, **HTML5 History API**, dan **CSS lokal modern**.

## Fitur Utama

* **Zero Build Step**: Langsung jalan tanpa perlu Webpack, Vite, atau proses kompilasi.
* **Clean URL Routing**: Menggunakan HTML5 History API (`/`, `/users`) tanpa tanda `#`, lengkap dengan dukungan tombol *Back/Forward* browser.
* **Dynamic Page Title**: Judul tab browser (`document.title`) otomatis diperbarui sesuai halaman aktif.
* **Global State Management**: Menggunakan `Alpine.store` sehingga state tetap tersimpan saat berpindah antarhalaman.
* **Modular Page Templates**: Setiap halaman dipisah ke dalam file HTML tersendiri di folder `pages/` dan dimuat secara asinkron menggunakan `fetch()`.
* **Modern Offline-Ready UI**: Menggunakan desain responsif bersih dengan skema warna *Slate & Indigo* tanpa bergantung pada CDN CSS eksternal.

## Struktur Proyek

```text
alpine-spa-starter/
├── index.html          # Kerangka utama (Navbar & container konten dinamis)
├── server.php          # Router fallback untuk PHP built-in server
├── css/
│   └── style.css       # Styling UI modern (offline-ready)
├── js/
│   └── app.js          # Logika SPA Router, Dynamic Title & Global Store
└── pages/
    ├── home.html       # Halaman Beranda (contoh Global State)
    ├── users.html      # Halaman Pengguna (contoh Fetch REST API)
    └── 404.html        # Halaman Error 404 Not Found
```

## Cara Menjalankan

Karena aplikasi ini menggunakan `fetch()` untuk memuat template halaman dan History API untuk routing, aplikasi **harus dijalankan melalui web server lokal** (bukan dibuka langsung via `file://`).

### Opsi 1: Menggunakan PHP Built-in Server
1. Pastikan file `server.php` tersedia di root folder:
   ```php
   <?php
   if (file_exists(__DIR__ . \(_SERVER['REQUEST_URI']) &&\)_SERVER['REQUEST_URI'] !== '/') {
       return false;
   }
   include __DIR__ . '/index.html';
   ```
2. Jalankan perintah berikut di terminal:
   ```bash
   php -S localhost:8000 server.php
   ```
3. Buka `http://localhost:8000` di browser.

### Opsi 2: Menggunakan Node.js (`serve`)
Jalankan perintah berikut dengan flag `-s` (Single Page App mode):
```bash
npx serve -s .
```

## Menambah Halaman Baru

1. Buat file template HTML baru di dalam folder `pages/`, misalnya `pages/about.html`:
   ```html
   <div class="card">
     <span class="badge">Tentang</span>
     <h1>Tentang Aplikasi</h1>
     <p class="subtitle">Halaman baru berhasil ditambahkan.</p>
   </div>
   ```
2. Daftarkan rute dan judul halamannya di objek `routes` pada `js/app.js`:
   ```javascript
   routes: {
     '/': { file: '/pages/home.html', title: 'Beranda — AlpineSPA' },
     '/users': { file: '/pages/users.html', title: 'Daftar Pengguna — AlpineSPA' },
     '/about': { file: '/pages/about.html', title: 'Tentang — AlpineSPA' }
   },
   ```
3. Tambahkan tautan navigasi di `index.html`:
   ```html
   <a href="/about" @click.prevent="navigate('/about')" 
      class="nav-link" :class="{ active: currentPath === '/about' }">Tentang</a>
   ```

## Mode 100% Offline

Jika ingin aplikasi berjalan sepenuhnya tanpa koneksi internet:
1. Unduh script Alpine.js v3 dan simpan sebagai `js/alpine.min.js`.
2. Ubah tag `<script>` Alpine di `index.html` menjadi:
   ```html
   <script defer src="/js/alpine.min.js"></script>
   ```

## Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan belajar maupun proyek pribadi/komersial.
