---
title: Tối ưu hiệu năng ứng dụng web
date: 2022-02-12T23:32:00+07:00
author: "Nguyễn Khắc Thành"
published: false
tags:
- Web
- ReactJS
- Optimization
categories:
- Programming
---

Chúng ta sử dụng ứng dụng web hằng ngày và thấy rằng có những trang web thì giật lag trong khi những trang khác lại mượt mà hay có những trang thì load chậm, tốn bộ nhớ trong khi lại có những trạng lại load siêu nhanh?.

Trong bài viết này, mình sẽ chia sẻ cách mình tối ưu ứng dụng web mà cụ thể là một ứng dụng ReactJS.

<!--More-->

## 1. Tại sao phải tối ưu ứng dụng web?

Trước khi đi vào nội dung bài viết, chúng ta cần tìm lí do hay động lực giúp chúng ta cần tối ưu ứng dụng web nhé.

Ứng dụng web là 1 trong những môi trường để chúng ta tiếp cận người một cách hiệu quả. Điều đó sẽ không đạt được nếu web của chúng ta quá tệ để người dùng có thể sử dụng. Một trang web mất từ 3-5s (tuỳ trường hợp nhé) để có thể hiển thị nội dung là quá chậm so với khả năng chờ đợi của người dùng hay browser của người dùng khi vào trang web của bạn có thể bị giật lag hoặc chiếm quá nhiều bộ nhớ của máy tính cũng là một vấn đề.

Google là một công cụ tìm kiếm thông tin phổ biến nhất trên Internet hiện nay. Trang web của bạn có thể được Google đánh giá cao hay không một phần phụ thuộc vào hiệu năng trang web của bạn. Nếu website của bạn có hiệu năng tốt, nó sẽ được Google đưa lên top kết quả tìm kiếm và ngược lại, sẽ bị đẩy xuống dưới của danh sách kết quả tìm kiếm. Điều này sẽ dẫn tới việc website của bạn tiếp cận người dùng bị hạn chế.

## 2. Khi nào cần tối ưu ứng dụng web?

Sau khi có lí do cho để tối ưu, chúng ta sẽ tiếp tục trả lời câu hỏi: **Tình trạng hiện tại của website như thế nào?**.

Để trả lời cho câu hỏi này, chúng ta cần phải đo hiệu năng hiện tại của ứng dụng chúng ta cần tối ưu.

Có nhiều cách để đo các chỉ số về hiệu năng, trong bài viết này mình sẽ sử dụng [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/) và [React Developer Tools
](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) để đo lường hiệu năng cũng như phát hiện những vấn đề về hiệu năng mà website của chúng ta có thể gặp phải.

