# QA tiếng Việt — trạng thái trung gian của toàn bộ trang

## Phạm vi

Kiểm tra này bao phủ `vi-VN` trên toàn bộ trang, không chỉ `/about/`: giao diện chính, tìm ngày, ngày thao tác, so sánh, xem năm, tìm ngược, lỗi và trạng thái, hướng dẫn người dùng, footer, metadata, manifest và văn bản ARIA/khả năng truy cập.

## Sửa chữa

Bốn message key còn thiếu đã được bổ sung:
- `app.brand`
- `reverse.error.limitPositive`
- `reverse.error.limitSafeInteger`
- `reverse.error.absoluteDateField`

Đã khôi phục phần ngữ nghĩa bị thiếu trong `search.intro`, `settings.intro`, `guide.1.body`, `guide.4.body`, `guide.5.body`, `guide.6.body`: ngày Pastafari hiện tại làm đầu vào mặc định, vị trí quan sát viên đang hoạt động, ranh giới ngày dựa trên Sao Kim từ `ASTRONOMICAL-DAY.md`, hành vi đặt lại tìm kiếm/ngày thao tác và việc giữ ngày thao tác đã chọn cho các lần tìm tiếp theo.

Queried day được thống nhất thành `ngày được hỏi`, queried date thành `ngày được hỏi`.

## `/about/`

Đã loại bỏ English-mixing còn lại: `rejection sampling`, cách dùng `all-day` thông thường, phần Seer trộn tiếng Anh, `generic injectivity`, `generic invertibility` cùng một số thuật ngữ kỹ thuật phụ.

Các API literal thật và tên sản phẩm vẫn được giữ ở dạng code hoặc tên riêng khi thích hợp.

Các commit chính:
- `b2b6faa56e0845596e32583b44de1b058856aa40`
- `dd0a6c5e0bfb702da80d6041175a9dee3204f97e`

## Kiểm tra cuối

- 258/258 message keys.
- Không có key thiếu hoặc thừa.
- Tất cả tập `{placeholder}` khớp chính xác với contract tiếng Anh.
- Không có semantic truncation đáng ngờ.
- Exact matches với locale tiếng Trung và tiếng Pháp bị giới hạn; không có dấu hiệu fallback rộng.
- `/about/` có đúng 29 stable ID theo cùng thứ tự với semantic master, không trùng.
- Hai bảng semantic có 19 và 9 hàng.
- Các formula/hash/literal bắt buộc vẫn nguyên vẹn.
- Targeted English technical prose scan sạch.

## Các gate còn mở

Tệp này **không chứng minh** toàn bộ trang đã được xem trong một LLM session riêng mà cuộc hội thoại diễn ra hoàn toàn bằng tiếng Việt. Vì vậy gate bắt buộc `linguistic QA` vẫn mở.

Render QA thật trên desktop và 390 px mobile, accessibility, PWA/offline và language switching cũng chưa hoàn tất.

## Trạng thái

Văn bản, UI và semantic contract đã sẵn sàng cho gate tiếp theo. Trạng thái đúng hiện tại là **semantic QA**, chưa phải `linguistic QA`.
