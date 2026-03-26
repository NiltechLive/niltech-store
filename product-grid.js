/* PRODUCT GRID — Nilsoft Store */

async function loadProductGrid(targetSelector, filterType = null) {
    const grid = document.querySelector(targetSelector);
    if (!grid) return;

    try {
        const response = await fetch('/api/products.json');
        const data = await response.json();

        const products = data.products || [];

        const filtered = filterType
            ? products.filter(p => p.type === filterType)
            : products;

        grid.innerHTML = filtered.map(product => `
            <a href="${product.page}" class="ns-product-card">
                <img src="${product.icon || '/assets/images/products/default.png'}"
                     alt="${product.name}"
                     class="ns-product-icon">

                <div class="ns-product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="ns-product-version">${product.version}</span>
                </div>
            </a>
        `).join('');

    } catch (err) {
        console.error("Nilsoft Grid Error:", err);
        grid.innerHTML = `<p style="color:#C8C8C8;">Unable to load products.</p>`;
    }
}

/* Auto‑init for homepage */
document.addEventListener('DOMContentLoaded', () => {
    loadProductGrid('.ns-product-grid');
});
