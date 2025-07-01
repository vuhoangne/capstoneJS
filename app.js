// Lớp Products
class Products {
    constructor(id, name, price, screen, backCamera, frontCamera, img, desc, type) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
    }
}

// Lớp CartItem
class CartItem {
    constructor(product, quantity = 1) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.img = product.img;
        this.quantity = quantity;
    }
}

// Biến toàn cục
let productsList = [];
let filteredProducts = [];
let cart = [];

// API URL
const API_URL = 'https://6864188188359a373e977b0d.mockapi.io/Products';

// Hàm gọi API lấy danh sách sản phẩm
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        productsList = data.map(item => new Products(
            item.id,
            item.name,
            item.price,
            item.screen,
            item.backCamera,
            item.frontCamera,
            item.img,
            item.desc,
            item.type
        ));
        
        filteredProducts = [...productsList];
        renderProducts();
        renderAdminProducts();
        return Promise.resolve();
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        loadSampleData();
        return Promise.resolve();
    }
}

// Dữ liệu mẫu khi API lỗi
function loadSampleData() {
    productsList = [
        new Products('1', 'iPhone 15 Pro Max', '29990000', '6.7 inch', '48MP', '12MP', 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg', 'iPhone 15 Pro Max mới nhất', 'iphone'),
        new Products('2', 'Samsung Galaxy S24 Ultra', '26990000', '6.8 inch', '200MP', '12MP', 'https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-grey-thumbnew-600x600.jpg', 'Samsung Galaxy S24 Ultra cao cấp', 'samsung'),
        new Products('3', 'iPhone 14 Pro', '24990000', '6.1 inch', '48MP', '12MP', 'https://cdn.tgdd.vn/Products/Images/42/289700/iPhone-14-pro-vang-1.jpg', 'iPhone 14 Pro chính hãng', 'iphone'),
        new Products('4', 'Samsung Galaxy S23', '18990000', '6.1 inch', '50MP', '12MP', 'https://cdn.tgdd.vn/Products/Images/42/274971/samsung-galaxy-s23-1-600x600.jpg', 'Samsung Galaxy S23 tuyệt vời', 'samsung')
    ];
    
    filteredProducts = [...productsList];
    renderProducts();
    renderAdminProducts();
}

// Hàm tạo HTML cho một sản phẩm
function createProductCard(product) {
    return `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card product-card h-100" onclick="showProductDetail('${product.id}')" style="cursor: pointer;">
                <img src="${product.img}" class="card-img-top product-image" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-muted small">${product.desc || 'Không có mô tả'}</p>
                    <div class="mt-auto">
                        <div class="price mb-2">${parseInt(product.price).toLocaleString('vi-VN')} VNĐ</div>
                        <div class="mb-2">
                            <small class="text-muted">
                                <i class="fas fa-tv"></i> ${product.screen}<br>
                                <i class="fas fa-camera"></i> ${product.backCamera}
                            </small>
                        </div>
                        <button class="btn btn-primary w-100" onclick="event.stopPropagation(); addToCart('${product.id}')">
                            <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Hàm hiển thị danh sách sản phẩm
function renderProducts() {
    const container = document.getElementById('productsContainer');
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="text-muted">Không tìm thấy sản phẩm nào</p></div>';
        return;
    }
    
    let html = '';
    filteredProducts.forEach(product => {
        html += createProductCard(product);
    });
    
    container.innerHTML = html;
}

// Hàm lọc sản phẩm theo loại
function filterProducts() {
    const filterValue = document.getElementById('productFilter').value;
    
    if (filterValue === '') {
        filteredProducts = [...productsList];
    } else {
        filteredProducts = productsList.filter(product => {
            const productType = product.type.toLowerCase();
            return productType === filterValue || 
                   (filterValue === 'iphone' && productType.includes('iphone')) ||
                   (filterValue === 'samsung' && productType.includes('samsung'));
        });
    }
    
    renderProducts();
}

// Hàm sắp xếp sản phẩm theo giá
function sortProducts() {
    const sortValue = document.getElementById('priceSort').value;
    
    if (sortValue === 'low-high') {
        filteredProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (sortValue === 'high-low') {
        filteredProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }
    
    renderProducts();
}

// Hàm tìm kiếm sản phẩm
function searchProducts() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filterValue = document.getElementById('productFilter').value;
    
    let baseProducts = filterValue ? productsList.filter(p => p.type === filterValue) : productsList;
    
    if (searchValue) {
        filteredProducts = baseProducts.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );
    } else {
        filteredProducts = baseProducts;
    }
    
    renderProducts();
}

// Hàm thêm vào giỏ hàng
function addToCart(productId) {
    const product = productsList.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const cartItem = new CartItem(product, 1);
        cart.push(cartItem);
    }
    
    updateCartBadge();
    saveCartToStorage();
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

// Hàm cập nhật badge giỏ hàng
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
}

// Hàm hiển thị giỏ hàng
function showCart() {
    renderCart();
    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
}

// Hàm render giỏ hàng
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceEl = document.getElementById('totalPrice');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">Giỏ hàng trống</h5>
            </div>
        `;
        totalPriceEl.textContent = '0 VNĐ';
        return;
    }
    
    let html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    cart.forEach(item => {
        html += `
            <tr class="text-center align-middle">
                <td>
                    <img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/50x50?text=No+Image'">
                </td>
                <td>${item.name}</td>
                <td class="price">${parseInt(item.price).toLocaleString('vi-VN')} VNĐ</td>
                <td>
                    <div class="quantity-control">
                        <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity('${item.id}')">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity('${item.id}')">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </td>
                <td class="price">${(parseInt(item.price) * item.quantity).toLocaleString('vi-VN')} VNĐ</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    cartItems.innerHTML = html;
    
    const totalPrice = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
    totalPriceEl.textContent = totalPrice.toLocaleString('vi-VN') + ' VNĐ';
}

// Hàm tăng số lượng
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartBadge();
        renderCart();
        saveCartToStorage();
    }
}

// Hàm giảm số lượng
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartBadge();
        renderCart();
        saveCartToStorage();
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    renderCart();
    saveCartToStorage();
}

// Hàm lưu giỏ hàng vào localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Hàm tải giỏ hàng từ localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
    }
}

// Hàm thanh toán
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    const totalPrice = cart.reduce((sum, item) => sum + (parseInt(item.price) * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (confirm(`Xác nhận thanh toán ${totalItems} sản phẩm với tổng tiền ${totalPrice.toLocaleString('vi-VN')} VNĐ?`)) {
        cart = [];
        updateCartBadge();
        renderCart();
        saveCartToStorage();
        alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        modal.hide();
    }
}

// Hàm xóa toàn bộ giỏ hàng
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?')) {
        cart = [];
        updateCartBadge();
        renderCart();
        saveCartToStorage();
    }
}

// === ADMIN FUNCTIONS ===

// Hiển thị danh sách sản phẩm cho admin
function renderAdminProducts() {
    const tbody = document.getElementById('adminProductsTable');
    if (!tbody) return;
    
    tbody.innerHTML = productsList.map(product => `
        <tr class="text-center align-middle">
            <td>${product.id}</td>
            <td><img src="${product.img}" style="width: 50px; height: 50px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/50x50?text=No+Image'"></td>
            <td>${product.name}</td>
            <td class="price">${parseInt(product.price).toLocaleString('vi-VN')} VNĐ</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td><span class="badge bg-info">${product.type}</span></td>
            <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Hiển thị modal thêm sản phẩm
function showAddProductModal() {
    document.getElementById('productModalTitle').innerHTML = '<i class="fas fa-plus"></i> Thêm sản phẩm';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Sửa sản phẩm
function editProduct(productId) {
    const product = productsList.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('productModalTitle').innerHTML = '<i class="fas fa-edit"></i> Sửa sản phẩm';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productScreen').value = product.screen;
    document.getElementById('productBackCamera').value = product.backCamera;
    document.getElementById('productFrontCamera').value = product.frontCamera;
    document.getElementById('productImage').value = product.img;
    document.getElementById('productDesc').value = product.desc || '';
    document.getElementById('productType').value = product.type;
    
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Lưu sản phẩm (thêm hoặc sửa)
async function saveProduct() {
    const form = document.getElementById('productForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const productData = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        screen: document.getElementById('productScreen').value,
        backCamera: document.getElementById('productBackCamera').value,
        frontCamera: document.getElementById('productFrontCamera').value,
        img: document.getElementById('productImage').value,
        desc: document.getElementById('productDesc').value,
        type: document.getElementById('productType').value
    };
    
    try {
        const productId = document.getElementById('productId').value;
        
        if (productId) {
            // Cập nhật sản phẩm
            await axios.put(`${API_URL}/${productId}`, productData);
            alert('Cập nhật sản phẩm thành công!');
        } else {
            // Thêm sản phẩm mới
            await axios.post(API_URL, productData);
            alert('Thêm sản phẩm thành công!');
        }
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        modal.hide();
        
        fetchProducts(); // Tải lại danh sách
    } catch (error) {
        console.error('Lỗi khi lưu sản phẩm:', error);
        alert('Lỗi khi lưu sản phẩm!');
    }
}

// Xóa sản phẩm
async function deleteProduct(productId) {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    
    try {
        await axios.delete(`${API_URL}/${productId}`);
        alert('Xóa sản phẩm thành công!');
        fetchProducts(); // Tải lại danh sách
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        alert('Lỗi khi xóa sản phẩm!');
    }
}

// Tìm kiếm sản phẩm admin
function searchAdminProducts() {
    const searchValue = document.getElementById('adminSearchInput').value.toLowerCase();
    const filteredList = productsList.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );
    
    const tbody = document.getElementById('adminProductsTable');
    tbody.innerHTML = filteredList.map(product => `
        <tr class="text-center align-middle">
            <td>${product.id}</td>
            <td><img src="${product.img}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td class="price">${parseInt(product.price).toLocaleString('vi-VN')} VNĐ</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td><span class="badge bg-info">${product.type}</span></td>
            <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Sắp xếp sản phẩm admin
function sortAdminProducts() {
    const sortValue = document.getElementById('adminSortSelect').value;
    let sortedList = [...productsList];
    
    if (sortValue === 'price-high-low') {
        sortedList.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sortValue === 'price-low-high') {
        sortedList.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    }
    
    const tbody = document.getElementById('adminProductsTable');
    tbody.innerHTML = sortedList.map(product => `
        <tr class="text-center align-middle">
            <td>${product.id}</td>
            <td><img src="${product.img}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td class="price">${parseInt(product.price).toLocaleString('vi-VN')} VNĐ</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td><span class="badge bg-info">${product.type}</span></td>
            <td>
                <button class="btn btn-sm btn-warning me-1" onclick="editProduct('${product.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Hiển thị chi tiết sản phẩm
function showProductDetail(productId) {
    const product = productsList.find(p => p.id === productId);
    if (!product) return;
    
    const modalTitle = document.getElementById('productDetailTitle');
    const modalBody = document.getElementById('productDetailBody');
    
    modalTitle.textContent = product.name;
    
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${product.img}" class="img-fluid product-detail-image rounded" alt="${product.name}" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
            </div>
            <div class="col-md-6">
                <h3 class="mb-3">${product.name}</h3>
                <div class="price mb-4" style="font-size: 2rem;">${parseInt(product.price).toLocaleString('vi-VN')} VNĐ</div>
                
                <div class="product-specs mb-4">
                    <h5 class="mb-3"><i class="fas fa-info-circle"></i> Thông số kỹ thuật</h5>
                    <div class="spec-item">
                        <span><i class="fas fa-tv"></i> Màn hình:</span>
                        <strong>${product.screen}</strong>
                    </div>
                    <div class="spec-item">
                        <span><i class="fas fa-camera"></i> Camera sau:</span>
                        <strong>${product.backCamera}</strong>
                    </div>
                    <div class="spec-item">
                        <span><i class="fas fa-camera-retro"></i> Camera trước:</span>
                        <strong>${product.frontCamera}</strong>
                    </div>
                    <div class="spec-item">
                        <span><i class="fas fa-tag"></i> Loại:</span>
                        <strong class="text-capitalize">${product.type}</strong>
                    </div>
                </div>
                
                <div class="mb-4">
                    <h5><i class="fas fa-align-left"></i> Mô tả</h5>
                    <p class="text-muted">${product.desc || 'Không có mô tả chi tiết'}</p>
                </div>
                
                <div class="d-grid gap-2">
                    <button class="btn btn-primary btn-lg" onclick="addToCart('${product.id}'); bootstrap.Modal.getInstance(document.getElementById('productDetailModal')).hide();">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng
                    </button>
                    <button class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i class="fas fa-times"></i> Đóng
                    </button>
                </div>
            </div>
        </div>
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('productDetailModal'));
    modal.show();
}

// Chuyển đổi giữa các view
function showCustomerView() {
    document.getElementById('customerView').style.display = 'block';
    document.getElementById('adminView').style.display = 'none';
}

function showAdminView() {
    document.getElementById('customerView').style.display = 'none';
    document.getElementById('adminView').style.display = 'block';
}

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    fetchProducts();
});