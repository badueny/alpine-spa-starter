# AlpineSPA Starter Kit

Starter kit **Single Page Application (SPA)** ringan, modern, dan 100% *offline-ready* tanpa *build step* (zero-bundler) yang dibangun menggunakan **Alpine.js v3**, **HTML5 History API**, dan **CSS lokal modern**.

## Fitur Utama

* **Zero Build Step & 100% Offline-Ready**: Langsung jalan tanpa Webpack/Vite serta tidak bergantung pada CDN eksternal (`alpine.min.js` dan `style.css` tersimpan lokal).
* **Clean URL Routing**: Menggunakan HTML5 History API (`/`, `/users`) tanpa tanda `#`, lengkap dengan dukungan tombol *Back/Forward* browser.
* **Dynamic Page Title**: Judul tab browser (`document.title`) otomatis diperbarui sesuai halaman aktif.
* **Global State Management**: Menggunakan `Alpine.store` sehingga state tetap tersimpan saat berpindah antarhalaman.
* **Modular Page Templates**: Setiap halaman dipisah ke dalam file HTML tersendiri di folder `pages/` dan dimuat secara asinkron menggunakan `fetch()`.
* **Anti-Recursive Fallback Guard**: Dilengkapi pengecekan template agar tidak terjadi loop render jika server mengembalikan dokumen HTML utama.

## Struktur Proyek

```text
alpine-spa-starter/
├── index.html              # Kerangka utama (Navbar & container konten dinamis)
├── serve.json              # Konfigurasi SPA routing untuk npx serve
├── server.php              # Router fallback untuk PHP built-in server
├── assets/
│   ├── css/
│   │   └── style.css       # Styling UI modern (Slate & Indigo)
│   └── js/
│       ├── alpine.min.js   # Core library Alpine.js v3 lokal
│       └── app.js          # Logika SPA Router, Dynamic Title & Global Store
└── pages/
    ├── home.html           # Halaman Beranda (contoh Global State)
    ├── users.html          # Halaman Pengguna (contoh Fetch REST API)
    └── 404.html            # Halaman Error 404 Not Found
```

## Cara Menjalankan

Karena aplikasi menggunakan `fetch()` dan HTML5 History API, jalankan proyek melalui server lokal dari dalam folder `alpine-spa-starter`:

### Opsi 1: Menggunakan Node.js (`npx serve`)
Pastikan file `serve.json` tersedia di root folder proyek:
```json
{
  "cleanUrls": false,
  "rewrites": [
    { "source": "!/{pages,assets}/**", "destination": "/index.html" }
  ]
}
```
Lalu jalankan perintah berikut (tanpa flag `-s`):
```bash
npx serve
```
Buka `http://localhost:3000` di browser.

### Opsi 2: Menggunakan PHP Built-in Server
Pastikan file `server.php` tersedia di root folder proyek:
```php
<?php
if (file_exists(__DIR__ . \(_SERVER['REQUEST_URI']) &&\)_SERVER['REQUEST_URI'] !== '/') {
    return false;
}
include __DIR__ . '/index.html';
```
Lalu jalankan perintah:
```bash
php -S localhost:8000 server.php
```
Buka `http://localhost:8000` di browser.

## Menambah Halaman Baru

1. Buat file template HTML baru di dalam folder `pages/`, misalnya `pages/about.html`:
   ```html
   <div class="card">
     <span class="badge">Tentang</span>
     <h1>Tentang Aplikasi</h1>
     <p class="subtitle">Halaman baru berhasil ditambahkan.</p>
   </div>
   ```
2. Daftarkan rute dan judul halamannya di objek `routes` pada `assets/js/app.js`:
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

## Lisensi

Bebas digunakan dan dimodifikasi untuk keperluan belajar maupun proyek pribadi/komersial.
