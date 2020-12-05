---
title: "Flask best practice"
date: 2020-12-23T07:33:20+07:00
draft: true
---


After three years working with Flask, these are what I learned from my mistakes:
- Application factory and config
- Local context and clone local context
- Integrate with background job
- Integrate with database
- Synchronize logging
- Middleware
- Testing and deploy

In this post, I want to share the best practices in the Flask stack, I hope you won't make the same mistake. Let's go


**Application factory and configuration for Flask app**

Yep, the factory is a design pattern in OOP, which reduces mistakes when we create instances.

In the factory function, we should configure the instance so you can create and use it easily.

For example, I want to create a Flask instance. I need to set up an object with many configurations. That depends on the expected environment, which was my expectation.

```python
from flask import Flask
from flask_cors import CORS
from config import get_config_by_name
import blueprints as bp


def create_app(config_name):
	app = Flask(__name__)
	config = get_config_by_name(config_name)

	# setup config
	app.config.load_from_object(config)

	# setup blueprints
	app.register_blueprint(bp.admin, url_prefix='/admin')
	app.register_blueprint(bp.api, url_prefix='/api')

	# setup middlewares
	CORS(app)

	return app
```

OK, If you want to create a Flask app for testing, I call this function easily
```python
@pytest.mark.fixture(autouse=True)
def app(request):
	if hasattr(request, 'cls'):
		app = create_app('test')
		request.cls.app = app
		request.cls.client = app.test_client()
```