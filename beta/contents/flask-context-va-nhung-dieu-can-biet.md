---
title: "Flask Context và những điều cần biết"
date: 2021-03-18T08:43:00+07:00
published: true
tags:
- python
- web
- flask
- local thread
categories:
- Python
- web_development
author: "Nguyễn Khắc Thành"
description: "Trong Flask có một khái niệm rất quan trọng và nó đã làm nên thương hiệu của riêng mình giữa các web framework của Python - Context"
---

Trong Flask có một khái niệm rất quan trọng và nó đã làm nên thương hiệu của riêng mình giữa các web framework của Python - Context

<!--more-->

Để hiểu rõ hơn về context trong Flask, chúng ta cũng tìm hiểu xem một web khi viết bằng Python sẽ hoạt động ra sao.

### 1. [WSGI](https://wsgi.readthedocs.io/en/latest/what.html)

Theo [PEP 333](https://www.python.org/dev/peps/pep-0333/), một ứng dụng web khi cài đặt về cơ bản sẽ một hàm với 2 tham số
- `environment`: một `dict` chứa toàn bộ dữ liệu client gửi đến server, nói các khác, đây chính là gói tin HTTP request đã được parse
- `start_response`: một hàm nhận vào status code và danh sách các header, những cái này sẽ được ghi vào phần đầu của gói tin HTTP response

Hàm sau khi xử lí sẽ trả về một iterable của các byte dữ liệu, cái này sẽ được dùng để ghi vào phần body trong gói tin HTTP response.

Khi chạy bất kì một WSGI server nào như gunicorn, uwsgi hay mod_wsgi của Apache, các webserver đó sẽ fork một thread và dùng hàm này để xử lí một request.

Chẳng hạn như này:

```python
# code application
def app(environment, start_response):
	start_response('200 OK', [('Content-Type', 'plain/text')])
	return b'Hello world'

# code webserver
def request_handle(wsgi_app, http_request):
	http_response = BytesIO()

	def start_response(status_code, headers):
		nonlocal http_response
		...

	environment = parse_http_request(http_request)
	body_message = wsgi_app(environment, start_response)
	http_response.write(body_message)
	# send http_response to the client

thread = Thread(target=handle, args(app, http_request,), daemon=True)
thread.start()
```

Vậy ta có thể thấy rằng, environment chính là một context. Handler của chúng ta nhận đầu vào là environment(http request) nên mọi xử lí sẽ phải phụ thuộc vào context này.

Cụ thể, trong flask, `environment` được parse tiếp thành `flask.request` object.

### 2. Vấn đề của Django và các web framework khác

Khi bạn làm việc với Django hay các python web framework khác, bạn có thể thấy rằng nếu chúng ta muốn sử dụng dữ liệu từ request, bắt buộc chúng ta phải truyền top-down biến request xuống từng hàm mà mình muốn sử dụng

Chẳng hạn thế này

```python
def nest_nest_function(request):
	...

def nest_function(request):
	# chả dùng request những vẫn cần phải truyền vào để cho con nó dùng 
	nest_nest_function(request)

def index(request):
	# chả dùng request những vẫn cần phải truyền vào để cho con nó dùng
	nest_function(request)
```

Vì đây là backend nên trường hợp này khá hiếm xảy ra và số lượng các hàm lồng nhau cũng không nhiều. Nhưng đó là trường hợp thường xuyên xảy ra trong frontend, đặc biệt là React. Và React cũng giải quyết vấn đề này giống cách mà Flask đã làm.

### 3. Flask proxy

Như bạn thấy ở trên, các request sẽ được isolate trong các thread riêng biệt với context của nó là environment và nó hoàn toàn có thể trở thành một giá trị global trong thread đó.

Ngược lại, trong process scope bao gồm nhiều thread, các environment này không được phép dùng lẫn của nhau và chúng ta nên thắc mắc

__Tại sao khi dùng `flask.request`, tôi có thể gọi nó ở mọi nơi (process scope) mà không bị nhầm lẫn các environment?.__

Vâng, tất nhiên, `flask.request` hay một vài thứ khác tương tự không phải là một object bình thường, chúng là các proxy có behavior để phân biệt nó đang được gọi ở thread nào để có thể lựa chọn context sao cho phù hợp.

OK, nghe có vẻ rất kì diệu nhưng thật ra rất đơn giản!

Mọi chuyện thật đơn giản nếu thread của chúng ta có một cái tên! Vâng chính xác, mỗi một thread khi được fork sẽ có một định danh (id) và nó có thể được lấy ra bằng hàm `threading.get_ident()` chẳng hạn.

Và nếu chúng ta có một `dict` với key là id của thread và value là giá trị của context thì sao nhỉ, chẳng hạn như thế này

```python
global_container = {}

def set_context(value):
	global global_container

	tid = threading.get_ident()
	global_container[tid] = value

def get_context():
	global global_container

	tid = threading.get_ident()
	if tid not in global_container:
		raise RuntimeError("Working outside of application context.")
	return global_container.get(tid)

def nest_function():
	ctx = get_context()
	print(f'In nest function, thread {threading.get_ident()}: {initial_context}')

def handle():
	initial_context = random.random()
	print(f'In handle function, thread {threading.get_ident()}: {initial_context}')
	set_context(initial_context)
	nest_function()

t1 = threading.Thread(target=handle)
t2 = threading.Thread(target=handle)

t1.start()
t2.start()
```

Bằng cách này, khi chúng ta gọi các proxy trong các thread xác định, nó sẽ lấy id của thread đó và lookup trong một global mapping (`global_container` chẳng hạn) để tìm giá trị phù hợp.

Vậy các bạn thử đoán xem trong ví dụ ở phần 1, chúng ta nên set environment ở đâu để nó trở thành context của một thread?

Để biết thêm về cài đặt chi tiết trong Flask, các bạn có thể tìm hiểu về một vài class cũng như những package sau
- [`werkzeug.local.LocalStack`](https://github.com/pallets/werkzeug/blob/master/src/werkzeug/local.py#L170)
- [`werkzeug.local.LocalProxy`](https://github.com/pallets/werkzeug/blob/master/src/werkzeug/local.py#L467)
- [`flask.globals`](https://github.com/pallets/flask/blob/master/src/flask/globals.py)
- [`flask.ctx`](https://github.com/pallets/flask/blob/master/src/flask/ctx.py)

Ngoài request, flask còn có application context chứa application hiện tại khi chúng ta gọi `flask.g` hay `flask.current_app`.

### 4. Ứng dụng của Flask proxy

Flask cũng cho phép chúng ta có thể hoàn toàn tự tạo một context cho riêng mình:

Xử lí ở thread khác
```python
@app.route('/')
def index():
    @copy_current_request_context
    def do_some_work():
        # do some work here, it can access flask.request or
        # flask.session like you would otherwise in the view function.
        ...
    gevent.spawn(do_some_work)
    return 'Regular response'
```

Hay xử lí ở process (thread) khác
```python
app = Flask(__name__)

with app.request_context(envỉonment):
	do_something()
``` 

Thiết kế này cũng được các extension của flask tuân thủ như Flask-Login, Flask-Admin hay Flask-Celery...

Đến đây, bạn đã có thể nắm được một trong những khái niệm quan trọng trong Flask và có thể sử dụng nó một các đúng cách, tránh các lỗi ngớ ngẩn trong quá trình phát triển.

Hẹn gặp lại các bạn ở bài viết sau, bye bye.
