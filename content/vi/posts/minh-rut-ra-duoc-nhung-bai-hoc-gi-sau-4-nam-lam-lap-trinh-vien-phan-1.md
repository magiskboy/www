---
title: Mình rút ra được những bài học gì sau 4 năm làm lập trình viên | Phần 1
date: 2021-09-02T01:00:00+07:00
author: "Nguyễn Khắc Thành"
published: true 
tags:
- Self_experience
- programming
- experience
- software development
description: "Bốn năm không phải là khoảng thời gian dài, nhưng nó đủ để mình cảm nhận và rút ra được những bài học mà mình muốn chia sẻ cho mọi người trong bài viết này. Đây hoàn toàn là những ý kiến cá nhân của mình và mình hi vọng nó sẽ giúp ích cho những bạn đang chuẩn bị, đã và sẽ đi trên con đường lập trình của mình."
---

Bốn năm không phải là khoảng thời gian dài, nhưng nó đủ để mình cảm nhận và rút ra được những bài học mà mình muốn chia sẻ cho mọi người trong bài viết này. Đây hoàn toàn là những ý kiến cá nhân của mình và mình hi vọng nó sẽ giúp ích cho những bạn đang chuẩn bị, đã và sẽ đi trên con đường lập trình của mình :smile:

<!--More-->

#### Cân bằng giữa sự đơn giản và sự phức tạp

Việc lựa chọn giữa đơn giản hay phức tạp nên dựa trên bản chất của vấn đề hơn là theo một quan điểm hoặc nhìn nhận cá nhân.

Giả sử, mình muốn viết một service restful api, vậy nên áp dụng lập trình hướng đối tượng hay lập trình hướng thủ tục (procedural programming) cho mục đích này?


Để trả lời câu hỏi đó, hãy bắt đầu từ  một trong những đặc điểm của restful là stateless. Stateless được hiểu đơn giản là server backend sẽ không lưu giữ trạng thái của client request (chúng độc lập với nhau).

Và hãy quan sát đặc điểm của từng kiểu lập trình:
    
- hướng đối tượng: duy trì trạng thái trong các object, tập trung vào đối tượng và cách mô hình hóa vấn đề
- hướng thủ tục: tập trung vào logic xử lí, chỉ quan tâm đầu vào và đầu ra
    
Trong trường hợp này, lập trình hướng thủ tục là một lựa chọn hợp lí hơn vì tính đơn giản, dễ bảo trì và kiểm thử hơn so với lập trình hướng đối tượng.

Ý kiến của bạn như thế nào về ví dụ trên, cho mình biết trong phần comment bên dưới nhé.

Một ví dụ khác các bạn có thể áp dụng là đối với những ứng dụng phía client nhưng một webapp hay một mobile app, chúng ta nên chọn kiểu lập trình nào?


#### Đừng áp dụng công nghệ khi chưa có hiểu biết về nó

Công nghệ mới luôn có một sức hút kì lạ đối với những lập trình viên, nhất là đối với các bạn thực tập sinh hay các bạn mới ra trường.

Những ngày đầu mình cũng từng phạm phải sai lầm này và hãy thật cảm ơn quãng thời gian mình được các giảng viên kèm cặp.

Khi học về AI, thay vì sử dụng các framework như tensorflow, keras,... các thầy bắt mình viết hàm Python cho các công thức toán học, sau dần mới chỉ được sử dụng scikit-learn cho những tính toán thống kê và cuối cùng mới được sử dụng tensorflow. Với mình khi đó, các hàm xử lí AI là các công nghệ và với các thư viện, nó đã sẵn sàng.

Khi mình làm backend, thay vì được sử dụng các async task queue có sẵn, các thầy khuyên mình nên bắt đầu viết task queue từ thread, tcp và redis :smile:.

Việc không hiểu rõ công nghệ mình đang sử dụng sẽ dẫn tới việc bạn có thể sử dụng sai cách, không thể kiểm soát những thứ mình đang làm dẫn tới việc luôn bị động trong các tình huống về lỗi và mở rộng.

Tất nhiên có nhiều con đường để có thể hiểu rõ các công nghệ đó hoạt động ra sao mà không cần phải code mới từ đầu. Bạn có thể lên github hằng ngày, đọc code của những repo nổi tiếng mà bạn quan tâm và xem những người khác sử dụng như thế nào và trong hoàn cảnh nào. Không có tài liệu nào tốt hơn code của chính nó và không ai hiểu rõ công nghệ đó hơn chính tác giả. 

#### Làm đúng thay vì làm được

Mình thấy nhiều khá người mắc phải lỗi này, đó là họ cố gắng hoàn thành công việc của mình để đáp ứng yêu cầu của task (tính tạm thời) mà không quan tâm tới tính đúng đắn của toàn bộ dự án (tính dài hạn).

Lấy ví dụ về trường hợp logging: có rất nhiều người với mục đích đơn giản là debug lỗi nên họ sẽ sử dụng các hàm để in dữ liệu thay vì dùng chức năng logging của các ngôn ngữ.

Tất nhiên, với mục đích của họ thì hàm in thỏa mãn vì dù sử dụng cái gì thì cũng đều là đẩy dữ liệu ra stdout và stderr. Những về lâu dài và khả năng mở rộng, các hàm logging có ưu thế hơn hẳn so với các hàm in thông thường như khả năng filter, định danh dữ liệu log ... Và tất nhiên, nó sinh ra để làm công việc đó :smile:.


#### Đừng tối ưu khi chưa có điều tồi tệ xảy ra

Theo mình, những người cầu toàn thường có xu hướng mắc lỗi này nhiều hơn và mình cũng là người như vậy. Tối ưu là điều cần thiết nhưng trong công việc, bạn sẽ phải đánh đổi thời gian, sức lực của mình và của người khác để làm công việc đó. Và nếu việc đó không đem lại lợi ích rõ rệt, đó thật sự là một điều tồi tệ.

Tối ưu là việc tốt, nhưng trước khi tối ưu bạn nên cố gắng tìm một lí do cho nó. Hãy trả lời các câu hỏi này trước khi bạn muốn tối ưu thứ gì đó nhé:

- Hệ thống đang gặp vấn đề gì? Bạn nên có đánh giá hiệu năng hoặc những báo cáo về tình trạng hiện tại của hệ thống trước khi quyết định.
- Việc tối ưu có đem lại giá trị không?
- Có những gì cần quan tâm khi mình tối ưu nó?
- Nó nên có mức độ ưu tiên thế nào trong danh sách công việc của mình?

Việc tối ưu có thể làm xuất hiện nhiều bug không đáng có, nhất là khi nguồn lực của team bạn không nhiều. Nếu giá trị nó đem lại không lớn hơn chi phí bạn bỏ ra thì đó là một vụ trao đổi thua lỗ dành cho bạn.


#### Chỉ ra ưu điểm và nhược điểm khi đề xuất giải pháp

Một vấn đề luôn có nhiều giải pháp, việc đưa ra nhiều giải pháp là cách tốt nhất để phát huy hết khả năng của bản thân. Việc đưa ra ưu và nhược điểm cho từng giải pháp cho thấy bạn đang hiểu rõ vấn đề và giải pháp đó như thế nào và qua đó thuyết phục được các thành viên trong team về những giải pháp được đưa ra.

Việc đưa ra ưu và nhược điểm giúp người review có thể tin tưởng bạn bao nhiêu phần và cũng là căn cứ để xác định đâu là giải pháp hợp lí cho vấn đề.

Nếu giải pháp là những luận điểm thì việc chỉ ra ưu điểm và nhược điểm là các luận cứ, điều này là cần thiết để bạn có thể tiến xa hơn trên con đường sự nghiệp.

			
#### Quy trình là cần thiết

Mình thấy có khá nhiều người không thích làm việc với một quy trình cụ thể, tất nhiên không phải công ty nào cũng áp dụng được quy trình phù hợp và không phải quy trình đó sẽ happy với tất cả nhân viên, nhưng chúng ta cần nhìn nhận nó dưới con mắt khách quan hơn.

Mình là một người từng rất ghét làm việc theo quy trình như kiểu Agile hay Scrum gì đó, thú thật là tới thời điểm hiện tại mình cũng chưa hiểu được rõ nó là gì và như thế nào :smile:. Nhưng có một điều mình chắc chắn là quy trình giúp mọi người làm việc cùng nhau tốt hơn.

Làm sao bạn có thể đảm bảo công việc của người khác hay team khác là đúng? Làm sao chúng ta  có thể tin tưởng nhau khi chúng ta không thể kiểm tra kết quả công việc của nhau (điều này là bất khả thi). Nếu không tin tưởng, chúng ta không thể hợp tác với nhau.

Ở một công ty hay nhóm nhỏ, quy trình có thể không thực sự cần thiết vì họ có thể tin tưởng nhau, họ làm việc cạnh nhau và follow nhau hằng ngày. Nhưng khi công ty đó lớn dần lên, sự "gần gũi" đó không còn dẫn đến việc chúng ta không thể tin tưởng công việc mà người kia làm (thậm chí là cả bản thân :smile:), lúc này chúng ta cần đến một quy chuẩn nhất định.

Nếu cả tôi và anh cùng làm việc theo một quy trình nhất định, tôi tin kết quả của anh để tôi có thể sử  dụng vì tôi cũng làm theo quy trình đó, mọi người cũng làm theo quy trình đó và họ cũng sẽ tin tôi. Lấy ví dụ đơn giản, trong quy trình có bước test trước khi một công việc được gọi là hoàn thành và tester là người chịu trách nhiệm việc đó. Anh A hoàn thành công việc và anh B muốn sử dụng thành quả của anh A cho công việc của mình. Anh B hoàn toàn có thể tin tưởng kết quả mà anh A làm ra mặc dù 2 người có thể chưa bao giờ gặp nhau vì B tin rằng kết quả đó là đúng vì nó đã được kiểm thử trước khi đến tay mình.

Nói chung, quy trình là cần thiết và với những bạn bắt đầu sự nghiệp làm lập trình viên, hãy làm quen với nó để có một ngày làm việc bớt căng thẳng vì ngoài code, các bạn còn phải quan tâm đến những thứ rườm ra khác :smile:

#### Luôn cân bằng giữa vấn đề về nghiệp vụ và kĩ thuật

Thực sự, đây là vấn đề cần sự quan tâm của cả dev và các PO (product owner) vì mỗi bên có những đóng góp riêng cho sản phẩm cũng như khách hàng sử dụng sản phẩm đó.

Ở môt khía cạnh nào đó, các PO luôn muốn thỏa mãn khách hàng của mình về mặt tính năng của sản phẩm thì các dev lại muốn tập trung vào mặt kĩ thuật của nó. Nhưng đời không như mơ khi khách hàng dìm PO trong các feature request còn PO thì dìm dev trong bể các task về tính năng mới.

Nếu bạn là dev, bạn nên hiểu rằng bản chất khách hàng là người trả công cho chúng ta và việc thỏa mãn họ về chất lượng và tính năng của sản phẩm là nghĩa vụ của chúng ta dù chúng ta muốn hay không.

Nếu PO của bạn là người giỏi trong việc thương lượng với khách hàng và cân bằng tốt thì điều đó thật sự tốt cho bạn còn nếu không, bạn hãy chịu chấp nhận thực tại đó như là điều hiển nhiên của công việc. 



Đến đây, bài viết của mình cũng khá dài nên mình sẽ dừng phần 1 ở đây, mình hi vọng bài viết này sẽ giúp ích cho các bạn phần nào trong quá trình phát triển sự nghiệp của bản thân.
