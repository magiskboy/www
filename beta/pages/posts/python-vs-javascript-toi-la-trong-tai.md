---
title: 'Python vs Javascript, còn tôi là trọng tài'
date: 2022-03-13T17:26:00+07:00
published: true
tags:
- python
categories:
- Python
- Javascript
author: "Nguyễn Khắc Thành"
description: "Trong cộng đồng các ngôn ngữ thông dịch, có lẽ đa phần chúng ta sẽ nhớ đến ngay 3 cái tên là Python, Javascript và Ruby. Đặc điểm chung của 3 ngôn ngữ này là dễ học, thời gian phát triển ứng dụng nhanh chóng và tất cả chúng nó đều được viết bằng C. Nhưng trong bài viết này, mình sẽ chỉ đem ra bàn cân để so sánh Python và Javascript, Ruby thì mình chưa từng làm bao giờ nên sẽ không có gì để nói."
---

Trong cộng đồng các ngôn ngữ thông dịch, có lẽ đa phần chúng ta sẽ nhớ đến ngay 3 cái tên là Python, Javascript và Ruby. Đặc điểm chung của 3 ngôn ngữ này là dễ học, thời gian phát triển ứng dụng nhanh chóng và tất cả chúng nó đều được viết bằng C. Nhưng trong bài viết này, mình sẽ chỉ đem ra bàn cân để so sánh Python và Javascript, Ruby thì mình chưa từng làm bao giờ nên sẽ không có gì để nói :smile:.
__Lưu ý, bài viết này hoàn toàn là quan điểm cá nhân của mình, mọi người xin đừng vội cào phím khi đọc xong nhé :smile:__

<!--more-->

#### 1. Độ phủ sóng

Thật khó để đem cái này ra so sánh khi Javascript vừa có thể làm backend và frontend. Trong khi đó, Python có thể làm backend, AI, automation,... Nhưng với một software engineer như mình thì Javascript vẫn có độ phủ sóng cao hơn vì mình chỉ cần học 1 loại cú pháp và giờ mình có thể làm cả frontend và backend :smile:.

#### 2. Cú pháp

Mình là người rất thích cú pháp của C vì tính rõ ràng của nó nên có những cú pháp được mang lên cả Javascript và Python làm mình khá happy.

Nhưng tại sao Javascript có __switch case__ còn Python lại không có!!!!.

{{< image
  url="https://www.meme-arsenal.com/memes/7d70b26fc3a93cd663768d1c52a445b5.jpg"
  title="Mấy người nghĩ switch case vô dụng sao!!!"
  external="true"
>}}

Một điểm nữa Javascript ăn đứt Python đó là nó cho phép truyền định nghĩa hàm vào tham số của hàm khác. Ok, tôi hiểu nỗi khổ của mấy ông, cũng vì mấy ông đâu có cái này __{ }__ để định nghĩa hàm.

```javascript
javascript(function () {
  console.log("Python");
})
```

```python
python(def javascript():???)
```

Tương tự, __lambda__ trong Python thì đúng là vô dụng khi nó không thể thực hiện nhiều hơn 1 câu lệnh.

Cân kèo 1 xíu, Python cũng có những điểm mạnh riêng của nó mà Javascript không thể có như

```python
arr = [i for i in range(100)]
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ..., 100]
```

Còn ông này thì :/

```javascript
arr = [];
for (let i = 0; i < 100; ++i) {
  arr.push(i);
}
```

Một trong những đặc sản của Javascript là cái thứ của nợ này

```javascript
[0] == ![0]                   // true

Array(3) == ",,"             // true

typeof null                  // "object"
null instanceof Object       // false

"string" instanceof String   // false
```

#### 3. Tối ưu

Phần này Javascript ăn Python. Javascript làm rất tốt việc tối ưu bộ nhớ. Nó có thể xác định được kiểu của biến và bỏ qua khá nhiều công đoạn giúp nó đạt hiệu quả tính toán cao hơn. Trong khi đó, điều này chỉ có trong các bản Python mở rộng như Pypy chứ cái ông Python thường thì lại không có.

Mọi người có thể đem 2 đoạn mã này ra so sánh

```javascript
function fib(n) {
  if (n < 2) return n;
  return fib(n-1) + fib(n-2);
}

const start = Date.now();
fib(40);
console.log(Date.now() - start);
```

Còn đây là Python

```python
from time import time

def fib(n):
  if n < 2:
    return n
  return fib(n-1) + fib(n-2)

start = time();
fib(40)
print(time()-start)
```

Javascript nhanh hơn Python tầm 1.5 lần.


### Vậy, nên dùng cái nào?

Với kinh nghiệm của mình, ai muốn làm web thì học javascript là lợi nhất do nó có thể làm cả backend và frontend. Hơn nữa, việc làm web bằng Javascript có ưu điểm là có rất nhiều builtin tiện lợi cho dân web.

Còn ai muốn học AI, data hay làm mấy tool automation hay thuật toán gì đó thì nên học Python. Đặc biệt, mình thấy Python xử lí string khá ngon và ngắn gọn.

Tóm lại mình viết bài này với lí do là khi chuyển sang Javascript mình thấy nó khá tiện lợi với công việc của mình nên quay lại chù cái thằng Python :smile:.