# 🛒 TechStore - E-commerce Website

**Capstone Project JavaScript** by **Vu Hoang**

Một website thương mại điện tử bán điện thoại thông minh được xây dựng bằng HTML, CSS, JavaScript và Bootstrap.

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt](#cài-đặt)
- [Sử dụng](#sử-dụng)
- [API](#api)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Screenshots](#screenshots)
- [Tác giả](#tác-giả)

## 🎯 Giới thiệu

TechStore là một website thương mại điện tử chuyên bán điện thoại thông minh Samsung và iPhone. Dự án được phát triển như một bài tập capstone cho khóa học JavaScript, tập trung vào việc xây dựng một ứng dụng web hoàn chỉnh với đầy đủ tính năng CRUD và quản lý giỏ hàng.

## ✨ Tính năng

### 👥 Dành cho khách hàng:
- **Xem sản phẩm**: Hiển thị danh sách sản phẩm dạng card với hình ảnh, tên, giá, thông số
- **Lọc sản phẩm**: Lọc theo loại (Samsung/iPhone)
- **Sắp xếp**: Sắp xếp theo giá (thấp→cao, cao→thấp)
- **Tìm kiếm**: Tìm kiếm sản phẩm theo tên
- **Chi tiết sản phẩm**: Modal hiển thị thông tin chi tiết khi click vào sản phẩm
- **Giỏ hàng**: 
  - Thêm/xóa sản phẩm
  - Tăng/giảm số lượng
  - Tính tổng tiền tự động
  - Lưu trữ trong localStorage
  - Thanh toán và xóa giỏ hàng
- **Responsive**: Tương thích với mobile và tablet

### 🔧 Dành cho quản trị viên:
- **Quản lý sản phẩm**: CRUD đầy đủ (Create, Read, Update, Delete)
- **Validation**: Kiểm tra dữ liệu đầu vào
- **Tìm kiếm**: Tìm kiếm sản phẩm trong bảng quản lý
- **Sắp xếp**: Sắp xếp sản phẩm theo giá
- **Giao diện**: Table responsive với các nút thao tác

### 🎨 Hiệu ứng và UX:
- **Animations**: Fade in, slide, pulse effects
- **Loading skeleton**: Hiệu ứng loading khi tải dữ liệu
- **Hover effects**: Hiệu ứng khi hover vào sản phẩm
- **Modal transitions**: Hiệu ứng mở/đóng modal mượt mà
- **Navbar animation**: Navbar ẩn/hiện khi scroll

## 🛠 Công nghệ sử dụng

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.4.0
- **HTTP Client**: Axios 1.4.0
- **API**: MockAPI (REST API)
- **Storage**: localStorage (giỏ hàng)
- **Responsive**: Mobile-first design

## 📦 Cài đặt

### Yêu cầu hệ thống:
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Kết nối internet (để tải Bootstrap, Font Awesome và gọi API)

### Cách cài đặt:

1. **Clone repository:**
```bash
git clone https://github.com/your-username/techstore.git
cd techstore
```

2. **Mở file index.html:**
```bash
# Mở trực tiếp bằng trình duyệt
open index.html

# Hoặc sử dụng Live Server (VS Code)
# Cài đặt extension Live Server và click "Go Live"
```

3. **Hoặc chạy local server:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (nếu có npx)
npx serve .
```

## 🚀 Sử dụng

### Khách hàng:
1. Mở website tại `index.html`
2. Duyệt sản phẩm trên trang chủ
3. Sử dụng filter/search để tìm sản phẩm
4. Click vào sản phẩm để xem chi tiết
5. Thêm sản phẩm vào giỏ hàng
6. Quản lý giỏ hàng và thanh toán

### Quản trị viên:
1. Click "Quản trị" trên navbar
2. Xem danh sách sản phẩm trong bảng
3. Thêm sản phẩm mới bằng nút "Thêm sản phẩm"
4. Sửa sản phẩm bằng nút "Edit" (màu vàng)
5. Xóa sản phẩm bằng nút "Delete" (màu đỏ)
6. Sử dụng tìm kiếm và sắp xếp

## 🌐 API

Dự án sử dụng MockAPI để mô phỏng backend:

**Base URL:** `https://6864188188359a373e977b0d.mockapi.io/Products`

### Endpoints:

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/Products` | Lấy danh sách tất cả sản phẩm |
| POST | `/Products` | Thêm sản phẩm mới |
| PUT | `/Products/{id}` | Cập nhật sản phẩm theo ID |
| DELETE | `/Products/{id}` | Xóa sản phẩm theo ID |

### Cấu trúc dữ liệu sản phẩm:
```json
{
  "id": "1",
  "name": "iPhone 15 Pro Max",
  "price": "29990000",
  "screen": "6.7 inch",
  "backCamera": "48MP",
  "frontCamera": "12MP",
  "img": "https://example.com/image.jpg",
  "desc": "Mô tả sản phẩm",
  "type": "iphone"
}
```

## 📁 Cấu trúc dự án

```
TechStore/
├── index.html          # File HTML chính
├── app.js             # File JavaScript chính
├── README.md          # Tài liệu dự án
└── assets/            # Thư mục chứa hình ảnh (nếu có)
```

### Cấu trúc code:

**HTML:**
- Navigation bar
- Customer view (trang chủ)
- Admin view (trang quản trị)
- Modals (giỏ hàng, chi tiết sản phẩm, thêm/sửa sản phẩm)
- Footer

**JavaScript:**
- Classes: `Products`, `CartItem`
- Customer functions: filter, search, cart management
- Admin functions: CRUD operations
- Utility functions: localStorage, animations

**CSS:**
- CSS Variables cho màu sắc
- Responsive design
- Animations và transitions
- Component styling

## 📸 Screenshots

### Trang chủ khách hàng:
- Hiển thị sản phẩm dạng grid
- Filter và search bar
- Responsive design

### Trang quản trị:
- Bảng quản lý sản phẩm
- Form thêm/sửa sản phẩm
- Tìm kiếm và sắp xếp

### Giỏ hàng:
- Modal hiển thị sản phẩm trong giỏ
- Tăng/giảm số lượng
- Tính tổng tiền

### Chi tiết sản phẩm:
- Modal toàn màn hình
- Hình ảnh lớn và thông số chi tiết
- Nút thêm vào giỏ hàng

## 🎯 Tính năng nổi bật

### 1. **Object-Oriented Programming:**
- Sử dụng ES6 Classes (`Products`, `CartItem`)
- Encapsulation và data modeling

### 2. **Async/Await & API Integration:**
- Fetch API và Axios
- Error handling
- Loading states

### 3. **Local Storage:**
- Lưu trữ giỏ hàng persistent
- Auto-save khi thay đổi

### 4. **Responsive Design:**
- Mobile-first approach
- Bootstrap grid system
- Touch-friendly interface

### 5. **User Experience:**
- Smooth animations
- Loading skeletons
- Intuitive navigation
- Form validation

## 🔧 Customization

### Thay đổi API:
```javascript
// Trong app.js, thay đổi API_URL
const API_URL = 'your-api-endpoint';
```

### Thêm loại sản phẩm mới:
```html
<!-- Trong HTML, thêm option mới -->
<option value="xiaomi">Xiaomi</option>
```

### Tùy chỉnh màu sắc:
```css
/* Trong CSS, thay đổi CSS variables */
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
}
```

## 🐛 Troubleshooting

### Lỗi thường gặp:

1. **Không load được sản phẩm:**
   - Kiểm tra kết nối internet
   - Kiểm tra API URL trong console

2. **Giỏ hàng không lưu:**
   - Kiểm tra localStorage trong browser
   - Xóa cache và reload

3. **Responsive không hoạt động:**
   - Kiểm tra viewport meta tag
   - Kiểm tra Bootstrap CSS

## 📈 Phát triển tiếp theo

- [ ] Thêm authentication/login
- [ ] Payment gateway integration
- [ ] Product reviews và ratings
- [ ] Wishlist functionality
- [ ] Advanced filtering (price range, brand)
- [ ] Order history
- [ ] Email notifications
- [ ] PWA support

## 🤝 Đóng góp

Nếu bạn muốn đóng góp cho dự án:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 License

Dự án này được phát hành dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Vu Hoang**
- GitHub: [[(https://github.com/vuhoangne/capstoneJS.git)](https://github.com/vuhoangne/capstoneJS.git)]
- Email: vuhoangdz2003@gmail.com
- LinkedIn: [LinkedIn][(https://www.linkedin.com/in/lenguyenvuhoang-hayden/)]

---

## 🙏 Lời cảm ơn

- **CyberSoft Academy** - Khóa học JavaScript BC84
- **Bootstrap Team** - Framework CSS tuyệt vời
- **Font Awesome** - Icon library
- **MockAPI** - Free API service

---

**⭐ Nếu dự án hữu ích, hãy cho một star nhé! ⭐**

---

*Dự án được tạo với ❤️ bởi Vu Hoang - Capstone Project JavaScript*
