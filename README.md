# Cổng Thông Tin Điện Tử - Backend (BE)

Ứng dụng Backend được xây dựng bằng **Node.js** và **Express.js**, kết nối với **Microsoft SQL Server**.

## 🚀 Hướng dẫn cài đặt và chạy

### 1. Yêu cầu hệ thống
- Node.js.
- Microsoft SQL Server (đã được cài đặt và đang chạy).

### 2. Cài đặt các phụ thuộc (Dependencies)
Mở terminal tại thư mục `BE` và chạy lệnh:
```bash
npm install
```

### 3. Cấu hình môi trường (Environment Variables)
Hãy tạo hoặc cập nhật file `.env` tại thư mục gốc của `BE` với các thông tin sau:
```env
DB_USER=sa
DB_PASSWORD=your_password
DB_SERVER=your_server_address
DB_DATABASE=QuanLyCongThongTin
PORT=9999
GROQ_API_KEY=your_key
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
```

### 4. Khởi động Server
Chạy lệnh sau để bắt đầu (sử dụng nodemon để tự động tải lại khi có thay đổi):
```bash
npm start
```
Server sẽ chạy tại: [http://localhost:9999](http://localhost:9999)

---

## 🛠 Công nghệ sử dụng
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MSSQL (Microsoft SQL Server)
- **Authentication:** JSON Web Token (JWT)
- **AI Integration:** OpenAI / Groq SDK

## 📝 Lưu ý
- Đảm bảo SQL Server đang hoạt động và database `QuanLyCongThongTin` đã tồn tại trước khi chạy server.
- File `server.js` là điểm entry chính của ứng dụng.
