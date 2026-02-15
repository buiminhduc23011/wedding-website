# Hướng Dẫn Quản Lý Website Đám Cưới

Website của bạn hiện đang hoạt động tại: **https://ductuyen-wedding.web.app**

## 1. Cập nhật nội dung
*   **Chỉnh sửa code**: Mở thư mục dự án trong VS Code.
*   **Chạy thử trên máy tính**: 
    1. Mở Terminal (Ctrl + `).
    2. Gõ lệnh: `npm run dev`
    3. Truy cập địa chỉ hiện ra (thường là `http://localhost:5173`).

## 2. Đưa thay đổi lên mạng (Deploy)
Sau khi chỉnh sửa xong và muốn cập nhật lên trang web chính thức:

1.  Mở Terminal.
2.  Chạy lệnh Build:
    ```bash
    npm run build
    ```
3.  Chạy lệnh Deploy:
    ```bash
    firebase deploy
    ```

## 3. Backend (Google Sheets)
*   Dữ liệu lời chúc được lưu tại Google Sheet bạn đã tạo.
*   Nếu cần thay đổi URL kịch bản, hãy sửa file `src/config.ts`.
*   Code Backend nằm ở `src/utils/google-script-template.js` (dùng để copy vào Apps Script nếu cần tạo lại).



