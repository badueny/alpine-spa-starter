document.addEventListener('alpine:init', () => {
  // Global State (bisa diakses di halaman mana saja via $store.app)
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

    // Daftar rute ke file template HTML
    routes: {
      '/': '/pages/home.html',
      '/users': '/pages/users.html'
    },

    init() {
      this.loadPage(this.currentPath);
      // Tangani tombol Back/Forward browser
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
      const file = this.routes[path] || '/pages/404.html';
      try {
        const res = await fetch(file);
        this.content = res.ok ? await res.text() : '<h1>404 - Halaman tidak ditemukan</h1>';
      } catch (err) {
        this.content = '<p class="text-red-500">Gagal memuat halaman.</p>';
      } finally {
        this.loading = false;
      }
    }
  };
}
