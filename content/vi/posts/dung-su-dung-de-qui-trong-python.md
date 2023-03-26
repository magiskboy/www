---
title: "Đừng sử dụng đệ qui trong Python"
date: 2021-02-20T09:37:37+07:00
published: true
tags:
- python
- recusive
- closure
author: "Nguyễn Khắc Thành"
description: "Tôi là một lập trình viên, người mà trước đây rất thích sử dụng các hàm đệ qui, đơn giản bởi vì nó rất ngầu và có thể được sử dụng để khoe khoang kĩ năng lập trình và sự thông minh của tôi. Tuy nhiên, trong đa số các trường hợp, các hàm đệ qui có độ phức tạp rất cao và chúng ta nên tránh sử dụng nó."
---


Tôi là một lập trình viên, người mà trước đây rất thích sử dụng các hàm đệ qui, đơn giản bởi vì nó rất ngầu và có thể được sử dụng để khoe khoang kĩ năng lập trình và sự thông minh của tôi. Tuy nhiên, trong đa số các trường hợp, các hàm đệ qui có độ phức tạp rất cao và chúng ta nên tránh sử dụng nó.

<!--more-->

Một trong những giải pháp tốt hơn là sử dụng Dynamic Planning khi có thể, cái đó có lẽ là cách tốt nhất để giải quyết một vấn đề có thể được chia thành các vấn đề con. Một trong những bài viết trước đây của tôi đã trình bày về [sức mạnh của Dynamic Planning](https://towardsdatascience.com/using-dynamic-planning-to-help-trump-win-the-elections-7b5b34f63961).

Tuy nhiên, trong bài viết này, tôi sẽ giới thiệu một kĩ thuật khác trong Python có thể trở thành một công cụ thay thế cho hàm đệ qui. Nó sẽ không vượt trội so với Dynamic Planning nhưng dễ dàng hơn để hiểu. Nói cách khác, đôi khi, chúng ta có thể gặp khó khăn để làm việc với Dynamic Planning bởi sự trừu tượng của ý tưởng đó. Nhưng nó sẽ dễ dàng hơn để sử dụng closure.

## Python Closure là gì? 

{{< image
    external="true"
	url="https://miro.medium.com/max/1400/1*k09a_nOeSB7ENbnAv30alA.jpeg"
	title="Photo by Free-Photos on Pixabay"
>}}

Đầu tiên, tôi sử dụng một ví dụ đơn giản để giải thích closure trong Python là gì. Hãy nhìn hàm bên dưới

```python
def outer():
    x = 1
    def inner():
        print(f'x in outer function: {x}')
    return inner
```

Hàm `outer` được định nghĩa với hàm `inner` bên trong bản thân nó, và hàm `outer` trả về hàm `inner` như là `giá trị trả về` của hàm.

Trong trường hợp này, hàm lồng nhau được gọi là một closure trong Python. Nếu chúng ra kiểm tra `giá trị trả về` của hàm bên ngoài, chúng ta sẽ thấy rằng giá trị trả về là một hàm.

{{< image
    external="true"
	url="https://miro.medium.com/max/1038/1*WCUHtpu2rEBYySkj2jVi0Q.png"
>}}

closure làm gì? Bởi vì nó trả về một hàm, chúng ta có thể chạy hàm này, tất nhiên.

{{< image
	url="https://miro.medium.com/max/518/1*xNm9mScPQMJ1MhSg273QWA.png"
>}}

OK, chúng ta có thể thấy rằng hàm bên trong có thể truy cập các biến đã định nghĩa trong hàm bên ngoài. Thông thường, chúng ta không sử dụng closure theo cách như trên, bởi vì nó là tệ. Chúng ta thông thường muốn định nghĩa hàm khác để giữ hàm trả về bởi closure. 

{{< image
    external="true"
	url="https://miro.medium.com/max/554/1*k1yx5D8pCqsue7Vb6s8Osg.png"
>}}

Vì thể, chúng ta cũng có thể nói rằng trong Python closure, chúng ta định nghĩa một hàm mà hàm đó định nghĩa các hàm khác.

## Truy cập các biến bên ngoài từ hàm bên trong

{{< image
    external="true"
	url="https://miro.medium.com/max/1400/1*wF3YWhf5uXPUvnifMvz8Xg.jpeg"
	title="Photo by igorovsyannykov on Pixabay"
>}}

Làm thế nào chúng ta có thể sử dụng một closure để thay thế một đệ qui? Đừng quá hấp tấp. Hãy xem một vấn đề khác ở đây, đó là việc truy cập các biến bên ngoài từ hàm bên trong.

```python
def outer():
    x = 1
    def inner():
        print(f'x in outer function (before modifying): {x}')
        x += 1
        print(f'x in outer function (after modifying): {x}')
    return inner
```

Trong closure bên trên, chúng ta muốn cộng thêm một vào biến bên ngoài `x` trong hàm bên trong. Tuy nhiên, nó sẽ là một công việc không dễ dàng.

{{< image
    external="true"
	url="https://miro.medium.com/max/1348/1*YtdEYwPhTs3VDHSE63lnvA.png"
>}}

Mặc định, bạn sẽ không có khả năng truy cập biến bên ngoài từ hàm bên trong. Tuy nhiên, giống như các chúng ta định nghĩa một biến toàn cục trong Python, chúng ta có thể nói hàm bên trong của một closure rằng biến đó không nên xem xét như là một "biến cục bộ", bằng việc sử dụng từ khoá `nonlocal`.

```python
def outer():
    x = 1
    def inner():
        nonlocal x
        print(f'x in outer function (before modifying): {x}')
        x += 1
        print(f'x in outer function (after modifying): {x}')
    return inner
```

Bây giờ, hãy nói chúng ta muốn cộng thêm 1 vào biến `x` 5 lần. Chúng ta có thể viết một vòng lặp for đơn giản để làm được việc này.

```python
f = outer()
for i in range(5):
    print(f'Run {i+1}')
    f()
    print('\n')
```

{{< image
    external="true"
	url="https://miro.medium.com/max/786/1*9YWAhoejY9aaI7p_k1SCnQ.png"
>}}

## Viết một hàm Fibonacci sử dụng Closure

{{< image
    external="true"
	url="https://miro.medium.com/max/1400/1*BGxgXhZ6kOhbXipZ_OhMdg.jpeg"
	title="Photo by Free-Photos on Pixabay"
>}}

Fibonacci được sử dụng phổ biến như là một ví dụ "hello world" của các hàm đệ qui. Nếu bạn không nhớ nó, đừng lo lắng, nó khá là đơn giản để được giải thích.

Một dãy Fibonacci là một chuỗi số mà mọi số là tổng của 2 số trước nó. 2 số đầu tiên, X₀ và X₁ là đặc biệt. Chúng tương ứng là 0 và 1. Bắt đầu từ X₂, lặp lại qui tắc được nhắc ở trên, nó là tổng của X₀ và X₁, nên X₂ = 2. Sau đó X₃ bằng X₁ + X₂ = 2, X₄ bằng X₂ + X₃=3, X₅ bằng X₃ + X₄ = 5,...

Hàm đệ qui yêu cầu chúng ra suy nghĩ ngược từ "trạng thái hiện tại" tới "trạng thái trước đó", và cuối cùng điều kiện dừng là gì. Tuy nhiên bằng việc sử dụng closure, chúng ta có thể suy nghĩ về vấn đề một cách tự nhiên hơn.

Nhìn đoạn code bên dưới, đó là hàm Fibonacci được cài đặt sử dụng một closure.

```python
def fib():
    x1 = 0
    x2 = 1
    def get_next_number():
        nonlocal x1, x2
        x3 = x1 + x2
        x1, x2 = x2, x3
        return x3
    return get_next_number
```

Chúng ta biết rằng Fibonacci bắt đầu với 2 số đặc biệt là X₀ = 0 và X₁ = 1, do đó chúng ta chỉ đơn giản định nghĩa chúng trong hàm bên ngoài. Sau đó, hàm bên trong `get_next_number` đơn giản là trả về tổng của 2 số nó lấy từ hàm bên ngoài.

Thêm vào đó, đừng quên cập nhật lại X₀ và X₁ bằng X₁ và X₂. Trong thực tế, chúng ta đơn giản đoạn code:

```python
x3 = x1 + x2
x1, x2 = x2, x3
return x3
```

thành 

```python
x0, x1 = x1, x0 + x1
return x1
```

Cái này cập nhật hai biến đầu tiên và sau đó trả về biến thứ 2, nó tương đương với đoạn code trước đó.


Sau đó, chúng ta có thể sử dụng closure này để tính các số Fibonacci. Cho ví dụ, chúng ta muốn hiện chuỗi Fibonacci đến số thứ 20.

```python
fibonacci = fib()
for i in range(2, 21):
    num = fibonacci()
    print(f'The {i}th Fibonacci number is {num}')
```

{{< image
    external="true"
	image="https://miro.medium.com/max/922/1*MFdusHsGqPuFJkNLlJpR-w.png"
>}}

## So sánh hiệu năng

{{< image
    external="true"
	url="https://miro.medium.com/max/1400/1*Aq11kSPToLaS-c4LpsnsEg.jpeg"
	title="Photo by KahlOrr on Pixabay"
>}}

Tốt, chúng ta đã biết rằng chúng ta có thể sử dụng closure để thay thế một hàm đệ qui trong phần trước. Thế còn về hiệu suất? Hãy so sánh chúng!

Đầu tiên, hãy cài đặt hàm Fibonacci bằng cách sử dụng một hàm đệ qui.

```python
def fib_recursion(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib_recursion(n-1) + fib_recursion(n-2)
```

Chúng ta có thể kiếm chứng hàm này bằng việc đưa ra chuỗi của 20 số Fibonacci.

{{< image
    external="true"
	url="https://miro.medium.com/max/500/1*2Rd5WEbX8MUFIJDH3Y9VEw.png"
>}}

Sau đó, hãy nhúng phiên bản closure trong một hàm để so sánh.

```python
def fib_closure(n):
    f = fib()
    for i in range(2, n+1):
        num = f()
    return num
```

{{< image
    external="true"
	url="https://miro.medium.com/max/422/1*cgwyZ_RvQAC4LW1eob4a9g.png"
>}}

Bây giờ, hãy so sánh tốc độ.

{{< image
    external="true"
	url="https://miro.medium.com/max/764/1*wwk1xceOEHGRWApGHa_bnA.png"
>}}

2.79ms v.s. 2.75µs. Phương pháp closure nhanh hơn 1000 lần so với đệ qui! Lí do trực quan nhất là tất cả các giá trị tạm thời của hàm đệ qui được lưu trữ riêng biệt, nhưng closure thật sự cập nhật các biến giống nhau trong mỗi lần lặp.

Ngoài ra, độ sau của đệ qui là có giới hạn. Đối với closure, bởi vì nó cơ bản là một vòng lặp for, sẽ không có bất kì ràng buộc nào.

Đây là một ví dụ việc tính 1000 số Fibonacci

{{< image
    external="true"
	url="https://miro.medium.com/max/1278/1*CP_jHym64CGhY5zob8Mf-Q.png"
>}}

Đó quả là một con số khổng lồ, nhưng phương thức closure có thể kết thúc việc tính toán trong khoảng 100µs, trong khi hàm đệ qui gặp phải hạn chế của nó.

## Những trường hợp khác của closure

{{< image
    external="true"
	url="https://miro.medium.com/max/1400/1*5LREISfdTUPqkZSBjpONCg.jpeg"
	title="Photo by HarinathR on Pixabay"
>}}

Python closure rất hữu dụng không chỉ trong việc thay thế các hàm đệ qui. Trong một vài trường hợp, nó cũng có thể thay thế các Python class với một giải pháp ngắn gọn, đặc biệt là không có quá nhiều những thuộc tính và các phương thức của class.

Giả sử chúng ta có một dictionary của các học sinh viên điểm số bài tập của họ.

```python
students = {
    'Alice': 98,
    'Bob': 67,
    'Chris': 85,
    'David': 75,
    'Ella': 54,
    'Fiona': 35,
    'Grace': 69
}
```

Chúng ta muốn có một số hàm giúp chúng ta lọc các học sinh bởi điểm số, để đặt họ vào các lớp xếp loại khác nhau. Tuy nhiên, ràng buộc có thể thay đổi theo thời gian. Trong trường hợp này, chúng ta có thể định nghĩa một Python closure như sau:

```python
def make_student_classifier(lower_bound, upper_bound):
    def classify_student(exam_dict):
        return {k:v for (k,v) in exam_dict.items() if lower_bound <= v < upper_bound}
    return classify_student
```

Closure định nghĩa một hàm, cái đó định nghĩa các hàm khác nhau dựa trên tham số truyền vào một cách linh động. Chúng ta sẽ truyền cận trên và cận dưới của các lớp xếp loại, và closure sẽ trả về cho chúng ta một hàm thực hiện việc đó.

```python
grade_A = make_student_classifier(80, 100)
grade_B = make_student_classifier(70, 80)
grade_C = make_student_classifier(50, 70)
grade_D = make_student_classifier(0, 50)
```

Code trên sẽ cho chúng ta 4 hàm, cái đó sẽ phân loại học sinh thành các lớp xếp loại tương ứng dựa trên ranh giới chúng ta đã cho. Xin lưu ý rằng, chúng ta có thể thay đổi cận tạo mọi thời điểm để tạo hàm khác nhau hoặc khi đề các hàm xếp loại hiện tại.

Hãy kiểm chứng các hàm đó ngay bây giờ.

{{< image
    external="true"
	url="https://miro.medium.com/max/808/1*jOLfaechDiFOIyWHpy09bA.png"
>}}

Rất ngăn nắp! Chỉ cần lưu ý rằng chúng ta vẫn cần định nghĩa các class khi trường hợp phức tạp hơn.

## Tổng kết

{{< image
    external="true"
	url="https://miro.medium.com/max/1400/1*mMnFxvUfqI5OnxPD_XsJjg.jpeg"
	title="Photo by Free-Photos on Pixabay"
>}}

Trong bài viết này, tôi đã giới thiệu một kĩ thuật gọi là closure trong Python. Nó có thể được sử dụng để viết lại các hàm đệ qui trong hầu hết các trường hợp và làm tốt hơn các hàm đệ qui rất nhiều.

Thật sự, closure có thể không là giải pháp tốt nhất cho một vài vấn đề nhìn từ quan điểm hiệu năng, đặc biệt khi Dynamic Planning có thể áp dụng. Tuy nhiên, nó là dễ hơn rất nhiều khi so sánh với Dynamic Planning. Đôi khi, Dynamic Planning là ví dụ cho việc dùng dao mổ trâu để giết gà (overkill) khi chúng ta không quá khắt khe về mặt hiệu năng, mà closure có thể đủ tốt.

Closure cũng có thể được sủ dụng để thay thế trong một vài trường hợp là khi chúng ta muốn định nghĩa một class thoả mãn ràng buộc. Nó đẹp đẽ và gọn gàng hơn trong các trường hợp đó.

---
Nguồn [Don’t Use Recursion In Python Any More](https://towardsdatascience.com/dont-use-recursion-in-python-any-more-918aad95094c)
