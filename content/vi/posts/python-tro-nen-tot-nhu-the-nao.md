---
title: 'Python trở nên "tốt" như thế nào?'
date: 2021-08-12T13:09:00+07:00
published: true
tags:
- python
author: "Nguyễn Khắc Thành"
description: "Python xuất hiện từ rất lâu, tầm những năm đầu thập niên 90. Nhưng cho đến nay, nhiều người vẫn chỉ biết đến Python là ngôn ngữ lập trình dành cho các lĩnh vực như trí tuệ nhân tạo, khoa học dữ liệu, ... Qua bài viết này, mình muốn cho các bạn thấy Python có thể làm những gì và tại sao Python trở thành một trong những ngôn ngữ có vai trò quan trọng trong thế giới lập trình."
---

Python xuất hiện từ rất lâu, tầm những năm đầu thập niên 90. Nhưng cho đến nay, nhiều người vẫn chỉ biết đến Python là ngôn ngữ lập trình dành cho các lĩnh vực như trí tuệ nhân tạo, khoa học dữ liệu, ... Qua bài viết này, mình muốn cho các bạn thấy Python có thể làm những gì và tại sao Python trở thành một trong những ngôn ngữ có vai trò quan trọng trong thế giới lập trình.

<!--more-->

Trong nhiều năm phát triển, các lập trình viên đã biến Python thành một hệ sinh thái màu mỡ và khiến cho bất cứ công ty công nghệ nào cũng muốn áp dụng nó vào trong các dự án của công ty mình. Vậy Python đã trở nên phổ biến như thế nào?

{{< image
  url="GuidoAvatar_400x400.jpg"
  title="Guido van Rossum - cha đẻ của Python"
>}}

Python xuất hiện khoảng hơn 30 năm và đúng như chiến lược và mục đích của những nhà sáng lập: tính đơn giản, linh hoạt, khả năng mở rộng cùng với sự phát triển mạnh mẽ của sức mạnh phần cứng đã giúp Python có chỗ đứng vững chắc trên bản đồ thế giới các ngôn ngữ lập trình.

### Python đã chinh phục thế giới lập trình như thế nào?

Như mình đã nói, Python thường được mọi người biết đến là ngôn ngữ cho học máy, khoa học dữ liệu và tính toán khoa học. Thật vậy, trong cộng đồng Python có riêng một hệ sinh thái nổi bật cho lĩnh vực này là [SciPy](https://scipy.org). Đây là một tập hợp các thư viện cho việc tính toán khoa học như:

- NumPy - tính toán đại số và ma trận
- SciPy - tính toán khoa học với các hàm được tối ưu trong Fortran
- matplotlib - sử dụng cho vẽ biểu đồ
- IPython - trình thông dịch cho việc tính toán phân tán
- pandas - xử lí, phân tích các tập dữ liệu dạng chuỗi và bảng

Ngoài ra, ở mảng này, còn có các thư viện cho học máy như Theano, MXnet, Tensorflow, scikit-learn, ...


Vào năm 2003, Phillip J. Eby đề xuất một tiêu chuẩn nhằm cải thiện mảng phát triển web cho Python thay vì sử dụng giao tiếp CGI trước đó. Nó được biết đến  với cái tên [PEP333](https://www.python.org/dev/peps/pep-0333/). Nhờ nó, các lập trình viên như có một quy chuẩn để phát triển các ứng dụng web mà không phải lo về vấn đề giao tiếp với webserver. Thời điểm này, có rất nhiều các framework web ra đời và nổi tiếng đến tận ngày nay như Diango(2005), web2py(2007), Bottle(2009), pyramid(2010), Flask(2010).

{{< image
  url="logoPython.png"
  title="Biểu tượng của Python"
>}}

Khoảng những năm 2015 đến 2016, các thành viên trong core team của Python đã đề xuất một tiêu chuẩn cho phép các nhà phát triển tạo ra các task vụ bất đồng bộ một cách dễ dàng mà không phải phụ thuộc vào các thư viện bên thứ ba khác nhau. Đó là PEP 492 và PEP 530 và mình có giới thiệu về chúng trong [bài viết này]({{< ref "./bat-dong-bo-trong-python-phan-1-coroutine" >}}). Thật đáng ngưỡng mộ vì khi sinh ra, Python không được định hướng để thực hiện các toán tử async như Javasript hay Go, nhưng quá trình thai nghén làm nền cho việc này đã xuất hiện từ các phiên bản tiền nhiệm và nó có một hiệu năng có thể coi là chấp nhận được.

Mảng tự động hóa hay các framework cho việc kiểm thử cũng trở thành mục tiêu của cộng đồng Python: chúng ta có các ansible, docker, unittest(JUnit trong Python), pytest, nose...

Sự phát triển đó yêu cầu Python phải hỗ trợ các tính năng khác chẳng hạn như phát triển các interface cho các phần mềm bên thứ 3 để các nhà phát triển tích hợp với các ứng dụng của họ như Redis, RabitMQ, background job...

Thực sự, hệ sinh thái của Python là vô cùng lớn và thật hiếm thấy ở một ngôn ngữ nào mà mọi thứ lại đầy đủ như vậy.

Vậy làm sao mà từ một ngôn ngữ, không quá già nhưng cũng không quá trẻ có thể trở thành một đế chế cho tới ngày nay?

### Python làm mình trở nên tốt hơn như thế nào?

Không có thứ gì sinh ra đã là hoàn hảo, có chăng tác giả của Python đã tạo ra một ngôn ngữ mà ngay cả những người chưa từng viết code cũng có thể đọc hiểu những dòng code. Tất cả những gì Python có khi ấy là một cú pháp trong sáng (chắc chỉ kém Pascal :smile:).

Đầu tiên, Python là mã nguồn mở, nơi mà bất cứ ai cũng có thể tham gia phát triển và đóng góp. Sự sáng tạo của các nhà phát triển khắp nơi là những phản hồi quý giá nhất mà Python có. Họ là người thấy được những vấn đề bất tiện, họ có thể đóng góp thầm chí là đề xuất và cài đặt giải pháp, điều này thật tuyệt vời.

Trình thông dịch của Python (standard) được viết hoàn toàn bằng C, điều này đồng nghĩa với việc nó có thể mở rộng bằng mã C - điều mà rất nhiều các ngôn ngữ sau này cũng sử dụng như Java, Javascript, Julia hay Go. Python là ngôn ngữ kiểu động, mọi thứ cần được kiểm tra kĩ lưỡng trước khi thực thi. Chính điều đó vừa là điểm mạnh (linh hoạt) cũng đồng thời là điểm yếu với thời gian xử lí chậm chạp. Bạn có thể mất 20ms cho một phép tính trong C những lại cần 200ms trong Python. Đừng lo, bạn có thể viết chúng trong C và tích hợp vào trình thông dịch của Python như là phần mở rộng, điều đó sẽ giúp bạn đạt được hiệu năng đáng kinh ngạc. Nhưng bạn thấy nó quá khó để viết bằng mã C, đừng lo, vấn đề của bạn cũng là vấn đề của các nhà phát triển khác.
Chúng ta có một công cụ giúp bạn transpile code tựa Python sang C là Cython, nó sẽ giúp bạn đỡ vất vả hơn, điều này thật tuyệt.

{{< image
  url="django-hexbin.png"
  title="Django - một trong những web framaework nổi tiếng được viết bằng Python" 
>}}

Khi chưa có sự tham gia của JS hay Go như bây giờ, các nhà phát triển sử dụng nhiều các thư viện xử lí bất đồng bộ để tăng hiệu năng của Python như dask, eventlet hay curio...

Vào năm 2015, thời điểm phát triển mạnh mẽ của JS với engine V8 đã biến JS trở thành ông vua của thể loại bất động bộ, đặc biệt là các ứng dụng network. Nhận thấy điều này, các nhà phát triển Python đã  đề xuất các tiêu chuẩn để Python có thể cạnh tranh với JS ở lĩnh vực này. Họ đã build tính năng này từ đầu và thật kinh ngạc, hiệu năng của nó chẳng thua kém gì người hàng xóm JS cả.

Vậy tóm lại, sự thành công của Python là kết quả của việc luôn làm mới bản thân, có sự đóng góp của chính những người trực tiếp trải nghiệm, hàng loạt các PEP, những hội nghị chia sẻ được tổ chức hằng năm đã đưa Python lên đến thời kì đỉnh cao như bây giờ.

### Vậy Python có phải là viên đạn bạc?

Tuy Python có nhiều lợi thế như vậy nhưng chúng ta không nên áp dụng nó vào mọi lĩnh vực bởi những lí do sau:

- tuy Python có thể mở rộng bằng C nhưng trong một dự án lớn, việc quản lí code tốt lại là vẫn đề cần cân nhắc. Bạn có thể viết bằng C với một hiệu năng thần thánh nhưng bạn không thể quản lí toàn bộ số code đó thì mọi thứ đều trở nên vô nghĩa.
- chính sự sáng sủa, dễ học, dễ đọc của Python nên nó khiến code của bạn có quá nhiều black box. Bạn có các hàm có sẵn những thực sự bạn không biết chúng chạy ra sao, bạn cũng không cần phải khai báo biến mà có thể dụng với bất kì loại giá trị nào. Chính điều đó khiến code của bạn trở nên rối rắm và khó lường.
- việc Python thường xuyên có những cập nhật dẫn đến việc mất tính ổn định và đồng nhất giữa các phiên bản. Bạn phải cân nhắc kĩ lưỡng trước khi nâng cấp lên một phiên bản mới hơn và thường thì nó sẽ có một vài breaking change rất dễ gặp nếu như không đọc kĩ lưu ý của nhà phát triển.

Như vậy, mình đã chia sẻ cho bạn những lí do mà theo mình đã đưa Python đến một vị trí như bây giờ. Hi vọng qua bài viết này, bạn sẽ có cái nhìn chính xác hơn trước khi đưa Python vào dự án của bản thân. 
