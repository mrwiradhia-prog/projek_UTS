// ============================
// DATA PRODUK
// ============================
const data = {
  pod: [
    { name: 'Foom Nano', desc: 'Desain ringkas, rasa maksimal, cocok untuk pemula maupun pro.', img: 'asset/nano.png' },
    { name: 'Vinci Pod SE', desc: 'Airflow adjustable untuk sensasi halus.', img: 'asset/vincise.png' },
    { name: 'Caliburn A3', desc: 'Baterai tahan lama dan elegan.', img: 'asset/caliburna3.png' },
    { name: 'Caliburn G3', desc: 'Rasa liquid konsisten.', img: 'asset/caliburn.png' },
    { name: 'Luxe Q', desc: 'Modern dan stylish.', img: 'asset/luxe.png' },
    { name: 'Vinci Pod Lite', desc: 'Ringan dan compact.', img: 'asset/vinci.png' }
  ],
  mod: [
    { name: 'Drag 4', desc: 'Chip Gene terbaru.', img: 'asset/drag4.png' },
    { name: 'Aegis Legend 2', desc: 'Tahan air & benturan.', img: 'asset/aegislegend2.png' },
    { name: 'Vaporesso Luxe X', desc: 'Desain layar sentuh.', img: 'asset/luxex.png' },
    { name: 'Drag X Plus', desc: 'Power tinggi dual battery.', img: 'asset/drag.png' },
    { name: 'Aegis Boost Pro', desc: 'Kombinasi pod dan mod.', img: 'asset/Aegis.png' },
    { name: 'Gen 200', desc: 'Chip pintar & efisien.', img: 'asset/gen200.png' }
  ],
  freebase: [
    { name: 'Fruit Series Mix', desc: 'Perpaduan buah tropis.', img: 'asset/fruitmix.png'},
    { name: 'Dessert Cream', desc: 'Rasa dessert creamy.', img: 'asset/dessert.png' },
    { name: 'Menthol Blast', desc: 'Sensasi mint dingin.', img: 'asset/mentol.png' },
    { name: 'Tobacco Blend', desc: 'Rasa tembakau klasik.', img: 'asset/tobasco.png' },
    { name: 'Candy Sweet', desc: 'Manis & fruity.', img: 'asset/candy.png' },
    { name: 'Coffee Latte', desc: 'Kopi susu creamy.', img: 'asset/coffee.png' }
  ],
  saltnic: [
    { name: 'Mango Ice Salt', desc: 'Mangga dingin.', img: 'asset/manggo.png' },
    { name: 'Strawberry Cream', desc: 'Strawberry lembut.', img: 'asset/strawberry.png' },
    { name: 'Grape Lychee', desc: 'Anggur & leci.', img: 'asset/grape.png' },
    { name: 'Watermelon Mint', desc: 'Semangka segar.', img: 'asset/watermelon.png' },
    { name: 'Lemon Tea', desc: 'Teh lemon segar.', img: 'asset/lemontea.png' },
    { name: 'Blueberry Yogurt', desc: 'Blueberry creamy.', img: 'asset/blueberry.png' }
  ],
  aksesoris: [
    { name: 'Coil 0.8Ω', desc: 'Rasa maksimal.', img: 'asset/coil.png' },
    { name: 'Pod Cartridge', desc: 'Anti bocor.', img: 'asset/cartridge.png' },
    { name: 'Cotton Bacon', desc: 'Kapas organik.', img: 'asset/cotton.png' },
    { name: 'Battery 18650', desc: 'Kapasitas tinggi.', img: 'asset/battery.png' },
    { name: 'Charger Vape', desc: 'Isi daya cepat.', img: 'asset/charger.png' },
    { name: 'Drip Tip', desc: 'Nyaman digunakan.', img: 'asset/driptip.png' },
    { name: 'Carrying Case', desc: 'Praktis & kuat.', img: 'asset/case.png' },
    { name: 'Lanyard Vape', desc: 'Gantungan stylish.', img: 'asset/lanyard.png' }
  ]
};

// ============================
// RENDER PRODUK
// ============================
function renderProducts(category) {
  const productList = document.getElementById('productList');
  if (!productList) return;
  
  const products = data[category] || [];
  
  productList.innerHTML = products.map(p => `
    <div class="col-md-4 col-lg-2 fade-in">
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='asset/default.png'">
        <h5>${p.name}</h5>
        <p>${p.desc}</p>
      </div>
    </div>
  `).join('');
}

// ============================
// PENCARIAN PRODUK
// ============================
function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  
  if (!query) {
    alert('Silakan masukkan kata kunci pencarian!');
    return;
  }

  const kategoriMap = {
    pod: ['pod', 'device kecil', 'vape pod', 'foom', 'vinci', 'caliburn'],
    mod: ['mod', 'drag', 'aegis', 'luxex', 'gen', 'power tinggi'],
    freebase: ['freebase', 'liquid freebase', 'buah', 'dessert', 'menthol'],
    saltnic: ['saltnic', 'salt nic', 'nikotin', 'manggo', 'strawberry', 'grape'],
    aksesoris: ['aksesoris', 'coil', 'cotton', 'cartridge', 'battery', 'driptip', 'charger', 'lanyard']
  };

  let matchedCategory = null;

  // Cari kategori yang cocok
  for (const [category, keywords] of Object.entries(kategoriMap)) {
    if (keywords.some(k => query.includes(k))) {
      matchedCategory = category;
      break;
    }
  }

  // Redirect ke halaman kategori jika ditemukan
  if (matchedCategory) {
    if (matchedCategory === 'pod' || matchedCategory === 'mod') {
      window.location.href = `device.html?type=${matchedCategory}`;
    } else if (matchedCategory === 'freebase' || matchedCategory === 'saltnic') {
      window.location.href = `liquid.html?type=${matchedCategory}`;
    } else if (matchedCategory === 'aksesoris') {
      window.location.href = 'aksesori.html';
    }
  } else {
    // Cari di semua produk
    const allProducts = Object.values(data).flat();
    const results = allProducts.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.desc.toLowerCase().includes(query)
    );

    const productList = document.getElementById('productList');
    if (!productList) return;

    if (results.length > 0) {
      productList.innerHTML = results.map(p => `
        <div class="col-md-4 col-lg-2 fade-in">
          <div class="product-card">
            <img src="${p.img}" alt="${p.name}" onerror="this.src='asset/default.png'">
            <h5>${p.name}</h5>
            <p>${p.desc}</p>
          </div>
        </div>
      `).join('');
    } else {
      productList.innerHTML = `<p class="text-muted">Tidak ada produk yang cocok dengan pencarian "${query}".</p>`;
    }
  }
}

// ============================
// MODE TERANG / GELAP
// ============================
function toggleMode() {
  document.body.classList.toggle('light-mode');
  const btn = document.querySelector('.mode-toggle');
  const isLightMode = document.body.classList.contains('light-mode');
  
  if (btn) {
    btn.textContent = isLightMode ? '☀️ Mode' : '🌙 Mode';
  }
  
  // Simpan preferensi ke localStorage
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
}

// Load tema saat halaman dimuat
function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  const btn = document.querySelector('.mode-toggle');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (btn) {
      btn.textContent = '☀️ Mode';
    }
  } else {
    document.body.classList.remove('light-mode');
    if (btn) {
      btn.textContent = '🌙 Mode';
    }
  }
}

// Jalankan loadTheme saat DOM loaded
document.addEventListener('DOMContentLoaded', loadTheme);