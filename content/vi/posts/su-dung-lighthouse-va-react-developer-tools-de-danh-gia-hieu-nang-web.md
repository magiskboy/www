---
title: Sử dụng Lighthouse và React Developer Tools để đánh giá hiệu năng web
date: 2022-02-12T23:32:00+07:00
author: "Nguyễn Khắc Thành"
published: true
tags:
- web
- google_lighthouse
- react_developer_tools
- google lighthouse
- react developer tools
categories:
- web_development
- Web development
description: "Sử dụng Lighthouse và React Developer Tools để đánh giá hiệu năng web"
---

Làm sao chúng ta có thể trả lời câu hỏi: **Website này có hiệu năng cao hay thấp, nhanh hay chậm?** hay **Website này có tồn tại những vấn đề gì cần được khắc phục?**.

Để trả lời cho câu hỏi này, chúng ta cần phải đo các chỉ số về hiệu năng, SEO,... của ứng dụng đó.

Có nhiều cách để đo các chỉ số trên và trong bài viết này mình sẽ sử dụng [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) và [React Developer Tools
](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) để đo lường chất lượng cũng như phát hiện những vấn đề mà website của chúng ta có thể đang gặp phải.

<!--More-->

## 1. Lighthouse

Google Lighthouse là công cụ được tích hợp sẵn trong Google Chrome. Để mở nó, bạn nhấn tổ hợp phím **Ctrl + Shift + I** (hoặc **Optional + Command + J** trên MacOS) để truy cập DevTools, sau đó chọn tab **Lighthouse**

{{< image
    url="/lighthouse-1.png"
    title="Màn hình Lighthouse trên Google Chrome"
>}}

Có 2 phần chính bạn cần chú ý trên Lighthouse là **Categorise** và **Device**. **Categories** là những loại chỉ số mà bạn cần đo, ở đây mình chọn các chỉ số liên quan đến hiệu năng - Performance. Tiếp theo, chọn loại thiết bị mà bạn muốn đo, ở đây mình chọn Desktop.

Tiếp tục nhấn **Generate report** và chờ kết quả trả ra :smile:

Trong bài viết này, mình tập trung vào phần **Performance** vì đó là phần quan trọng nhất để đánh giá một website tốt hay dở tệ.

### Điểm tổng quan

{{< image
    url="/lighthouse-2.png"
    title="Điểm hiệu năng trung bình và điểm của từng chỉ số"
>}}

Bạn có thể thấy trong hình, điểm trung bình về hiệu năng là 40. Điểm số này được tính dựa trên điểm các chỉ số khác về hiệu năng, mỗi chỉ số khác nhau sẽ có các trọng số khác nhau. Các chỉ số có màu đỏ là những thứ chúng ta cần khắc phục, nên quan tâm đến những chỉ số màu vàng và những chỉ số màu xanh là những chỉ số tốt chúng ta cần duy trì.

Ở đây có thể thấy website này đang khá tệ do:
- thời gian block cao - [Total Block Time](https://web.dev/tbt/): 0.5s
- thời gian cần để lượng lớn các phần tử hiển thị trên viewport lớn - [Largest Contentful Paint](https://web.dev/lcp/): 2.5s
- thời gian nội dung được hiển thị trực quan khi trang đang được tải lớn - [Speed Index](https://web.dev/speed-index/): 3.3s
- mức độ ổn định của trang, được đo bằng sự sai khác nhau về vị trí các phần tử trong những lần render - [Cumulative Layout Shift](https://web.dev/cls/)

Bạn có thể tìm hiểu thêm về các metric ở đây: [https://web.dev/metrics/](https://web.dev/metrics/)

Lưu ý: điểm của các chỉ số này chỉ là tương đối ngay tại thời điểm đo. Có thể lần đo ngay sau khi network khoẻ hay máy tính của bạn khoẻ hơn, kết quả đo được sẽ tốt lên.

### Những chỉ số có thể cải thiện

{{< image
    url="/lighthouse-3.png"
    title="Những chỉ số có thể cải thiện"
>}}

Lighthouse đưa ra một viễn cảnh nơi website của bạn có thể đạt được như sau:
- Thời gian server phản hồi có thể cải thiện 0.88s
- Bạn có thể cắt bỏ những đoạn JS thừa để giảm thời gian load 0.6s

Thời gian server phản hồi có thể đo chính xác hơn bằng cách đo thời gian từ thời điểm request đến lúc nhận được byte đầu tiên từ server (Time To First Byte). Bạn có thể sử dụng [wrk](https://github.com/magiskboy/wrk) để đo trên nhiều request cho kết quả khách quan nhất.

Nói chung đây chỉ là những dự đoán của Lighthouse và nó còn tuỳ thuộc vào ứng dụng của bạn nữa nhé :smile:

### Chẩn đoán những vấn đề hiện tại

{{< image
    url="/lighthouse-4.png"
    title="Nguyên nhân (có thể) cần khắc phục"
>}}

Ở đây mình thấy có 2 vấn đề quan trọng là thời gian main thread bị block quá dài và lượng JS thừa làm thời gian xử li kéo dài 2.3s.

Ngoài ra, bạn cũng nên kết hợp sử dụng những công cụ khác của DevTools để có thêm nhiều thông tin hơn trong quá trình đo lường.

Vậy là mình đã giới thiệu sơ qua về Lighthouse để đo lượng hiệu năng của website. Với công cụ này, bạn có thể đánh giá dễ dàng với bất kì website nào bạn muốn.

## 2. React Developer Tools

React Developer Tools là công cụ cho phép bạn debug ứng dụng ReactJS một cách dễ dàng. Nó là một extension trên nhiều trình duyệt. Trong bài viết này, mình sử dụng nó trên Google Chrome.

Để có thể sử dụng, ứng dụng của bạn phải chạy trong component **Profiler** của ReactJS: [https://reactjs.org/docs/profiler.html](https://reactjs.org/docs/profiler.html).

Sau khi load trang, bạn mở Chrome DevTools như phần trên rồi chọn tab **Profiler** như hình

{{< image
    url="/react-developer-tools-1.png"
    title="React Developer Tools"
>}}

Để bắt đầu recording, bạn click vào biểu tượng reload góc trên bên trái. Cơ bản, website sẽ reload và được record lại, sau khi thấy website được load hết, bạn click vào biểu tượng stop màu đỏ góc trên bên trái để dừng việc record và hiển thị kết quả đo lường như hình dưới

Ở đây mình chọn **Flamegraph** cho bài viết này, các bạn có thể tham khảo thêm **Ranked** trên google nhé :smile:

{{< image
    url="/react-developer-tools-2.png"
    title="Thời gian render của từng component dưới dạng Flamegraph"
>}}

Để hiểu rõ hơn về biểu đồ này, mình sẽ giải thích sơ qua về quá trình render của React.

Trong 1 lần render, React sẽ render component thành DOM Node (phase **render**) và đem đi so sánh với DOM Node hiện tại. Nếu có sự khác biệt, DOM Node đó sẽ được thay thế bằng giá trị mới (phase **commit**) ngược lại sẽ bỏ qua. Từ đó suy ra, số lần render lớn hơn hoặc bằng số lần commit.

Chúng ta có thể thấy phần bên trái là biểu đồ về phân bố thời gian cho 1 lần app được commit.
Phần bên phải là thông tin chi tiết về lần commit đó của cả app bao gồm thời điểm commit và thời gian render.

Ngoài ra, góc trên bên phải có 1 barchart. Mỗi cột trong barchart đại diện cho thời gian render của commit đó. Trong hình có thể thấy có 5 lần commit có thời gian render khá dài.

{{< image
    url="/react-developer-tools-4.png"
    title="Tổng quan các lần commit của app"
>}}

Nhìn hình trên, chúng ta thấy số lần commit là 60 và biểu đồ hiện tại là commit đầu tiên.

Khi click vào từng component sẽ hiển thị số lần render của component đó.

{{< image
    url="/react-developer-tools-3.png"
    title="Chi tiết về render Layout component"
>}}

Như trong hình bạn có thể thấy, component cha ở trên, các component con đứng ngang hàng với nhau và ở dưới component cha.

Thời gian render component cha là tổng thời gian render các component con và thời gian render chính nó.

Khi tối ưu render, bạn sẽ nhìn lên barchart và click vào những thanh cao nhất hoặc màu vàng vì đó là những lần commit có thời gian render cao, cần tối ưu.

## 3. Kết bài 

Sau bài viết này, các bạn đã có thêm những công cụ hữu ích để có thể đưa ra đánh giá về 1 website có hiệu năng cao hay thấp, đặc biệt là có cái nhìn chi tiết hơn về ứng dụng web nói chung và ứng dụng React nói riêng để từ đó đưa ra những quyết định nên tối ưu ở đâu và như thế nào.