---
title: Mình đã triển khai multi-tenant như thế nào trong dự án NextJS?
date: 2021-09-28T21:52:00+07:00
author: "Nguyễn Khắc Thành"
published: false
tags:
- nextjs
- web-development
categories:
- Programming
---

Nếu bạn chỉ phát triển một website trên một codebase thì mọi chuyện thật đơn giản với đa số các web framework nhưng sẽ thế nào nếu bạn muốn phát triển cả một hệ thống các website chỉ với một codebase, cụ thể là trong NextJS. Đây là bài toán mình đã gặp phải trong công ty và đây là bài chia sẻ về hướng giải quyết của mình với vấn đề **multi-tenant trong NextJS**.
Chúng ta cùng tìm hiểu nhé :smile:

<!--More-->

#### Yêu cầu của bài toán

Yêu cầu đặt ra là:

- phát triển nhiều website
- các website có khả năng kế thừa và customize từ 1 template
- phát triển trên một app NextJS


#### Hướng giải quyết thứ nhất

Như bạn biết, hệ thống routing trong NextJS dựa trên hệ thống quản lí file trên server.

Ví dụ như trang web của chúng ta như sau

```
/                   --> homepage
/products/1         --> chi tiết sản phẩm có id là 1
/products           --> danh sách sản phẩm
```

do đó, chúng ta phải tạo thư mục pages trong ứng dụng NextJS như sau:

```	
└── pages
   ├── index.tsx        --> /
   └── products         
      ├── [id].tsx       --> /products/1
      └── index.tsx      --> /products
```

Với yêu cầu thứ 1, chúng ta đơn giản chỉ tạo thêm một layer là website trong thư mục pages như sau

Source code sẽ trông như thế này:

```
.
└── pages
   ├── template
   │  ├── index.tsx
   │  └── products
   │     ├── [id].tsx
   │     └── index.tsx
   ├── website-A
   │  ├── index.tsx
   │  └── products
   │     ├── [id].tsx
   │     └── index.tsx
   └── website-B
      ├── index.tsx
      └── products
         ├── [id].tsx
         └── index.tsx
```

Bạn có thể thấy, chúng ta có một thư mục template và các thư mục kế thừ từ nó. Nếu website-A cần customize, chúng ta chỉ cần thêm file tương ứng trong template. Trong trường hợp không muốn customizes, chúng ta đơn giản chỉ re-export component có trong template.

Đến đây, website của chúng ta sẽ có dạng như sau:

```
server.com/website-A/products/1
server.com/website-B/products
```
 
 Vậy nếu chúng ta muốn người dùng truy cập từ domain: website-A.com hay website-B.com lần lượt tương ứng với các folder của từng website như website-A và website-B thì sao?
 
 NextJS cung cấp cho chúng ta giải pháp là custom server. Tại đây, chúng ta có thể nhận toàn bộ request từ người dùng và xử lí theo ý của chúng ta bao gồm việc dispatch cho ứng dụng NextJS xử lí.
 
 ```javascript
 import { parse } from 'url';
 
 function handleRequest(req, res) {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl;
    const tenant = req.hostname.split('.')[0];
    
    app.render(req, res, `${tenant}${pathname}`, query);
 }
 ```
 
Đoạn code trên sẽ chuyển domain xuống pathname của ứng dụng NextJS.

Vậy vấn đề của giải pháp này là gì?

Như bạn có thể thấy, việc tạo thêm những page mà page đó không cần customize nó sẽ rất vô nghĩa và lãng phí tài nguyên.
Lấy ví dụ trên, chúng ta không cần customize pages `/products/[id]` của website-A nhưng trong thư mục của website-A vẫn phải có file `[id].tsx` mặc dù chúng chỉ có tác dụng re-export từ template.

Điều này dẫn tới 2 điều sau:
- nếu app của chúng ta có 20 website và template có 50 pages => app chúng ta phải handle 1000 route khác nhau => có 1000 file chúng ta phải xử lí trong quá trình dev và deploy.
- NextJS sẽ sinh ra hai file build-manifest và route-manifest cho client, các file này chứa thông tin của toàn bộ route mà app có, bạn có thể xem source [ở đây](https://github.com/vercel/next.js/blob/v11.1.2/packages/next/build/webpack/plugins/build-manifest-plugin.ts). Nếu số lượng route lớn, việc download, parser và lookup  file đó ở browser sẽ cực kì chậm.

#### Giải pháp tốt hơn

Bản chất của giải pháp đầu tiên là clone toàn bộ template cho từng website cụ thể và modify nó.

Thay vì clone, chúng ta có thể sửa phần routing để nó có thể trỏ về template nếu như page đó không cần customize. Đây chính là ý tưởng chính của giải pháp này.

Ở đây chúng ta chỉ cần tạo ra các file cần được customize cho từng website cụ thể
