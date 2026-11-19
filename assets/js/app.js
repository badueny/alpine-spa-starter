document.addEventListener('alpine:init', () => {
  Alpine.store('app', {
    appName: 'Alpine SPA Starter',
    counter: 0,
    increment() { this.counter++ }
  });
});

function router() {
  return {
    currentPath: window.location.pathname,
    content: '',
    loading: false,

    // Tambahkan properti title pada setiap rute
    routes: {
      '/': { file: '/pages/home.html', title: 'Beranda — AlpineSPA' },
      '/users': { file: '/pages/users.html', title: 'Daftar Pengguna — AlpineSPA' }
    },

    init() {
      this.loadPage(this.currentPath);
      window.addEventListener('popstate', () => {
        this.currentPath = window.location.pathname;
        this.loadPage(this.currentPath);
      });
    },

    navigate(path) {
      if (path === this.currentPath) return;
      window.history.pushState({}, '', path);
      this.currentPath = path;
      this.loadPage(path);
    },

    async loadPage(path) {
      this.loading = true;
      const route = this.routes[path] || {
        file: '/pages/404.html',
        title: '404 Halaman Tidak Ditemukan — AlpineSPA'
      };

      document.title = route.title;

      try {
        const res = await fetch(route.file);
        const html = await res.text();

        // Cegah loop jika server fallback mengembalikan index.html
        if (!res.ok || html.includes('<!DOCTYPE html>')) {
          this.content = '<div class="card"><h1>404</h1><p class="subtitle">File template halaman tidak ditemukan di ' + route.file + '</p></div>';
        } else {
          this.content = html;
        }
      } catch (err) {
        this.content = '<p>Gagal memuat halaman.</p>';
      } finally {
        this.loading = false;
      }
    }

  };
}
