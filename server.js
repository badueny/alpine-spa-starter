const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3300;

// 1. Sajikan file statis (assets/ dan pages/) secara langsung
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// 2. Contoh endpoint API backend (opsional)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Express + AlpineSPA berjalan!' });
});

// 3. SPA Fallback: Arahkan semua rute lain ke index.html
// Catatan: Pada Express v5 gunakan '{*splat}', pada Express v4 gunakan '*'
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
