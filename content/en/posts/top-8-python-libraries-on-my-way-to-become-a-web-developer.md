---
title: "Top 8 Python libraries on my way to becoming a Web developer"
date: 2020-12-21T13:19:40+07:00
published: false
tags:
- python
- programming
- web
categories:
- Programming
---

I became a python developer 3 years ago. Initially, I develop machine learning services, which helped me to python as a mandatory tool. Today, I am a software engineer in the E-Commerce field. My shares below are the libraries that I have used in my work.

<!--more-->

## [Flask](https://flask.palletsprojects.com/en/1.1.x/) - microframework

{{< image
	url="https://miro.medium.com/max/300/1*H3aEP7X3hd7wVCigrF3O1Q.png"
	title="I love Flask because simplicity"
>}}

Flask is a useful microframework for web development. “Micro” does not mean “small, not popular”. That’s it because it’s so simple, so lightweight and you can learn easily. You can flexibly customize your services. Flask is a useful framework for microservice.

## [Celery](https://docs.celeryproject.org/) — Asynchorous task queue

{{< image
	url="https://miro.medium.com/max/700/1*mKDo8Sz5LvRd9CeNOCDcYg.jpeg"
	title="Celery — best solution for background job"
>}}

Celery runs independently of the caller (maybe the caller doesn’t need to be implemented in python) and you can do IO-related work. To do this, celery uses an intermediary environment such as RabbitMQ or Redis to transmit function calls from the caller to the celery app. Celery is organized in a model of many workers and runs in independent processes so you will not have to worry when your work causes errors, your app will still live healthily. Celery is written by pure python and it is easy to set up and use. I recommend that you use RabbitMQ as a broker and use Flower for monitoring the Celery application


## [Gunicorn](https://gunicorn.org/) - WSGI server

{{< image
	url="https://miro.medium.com/max/700/1*4-onhBNaWPhvisvWsnMSiQ.png"
	title="Do you need solution for deloy wsgi application? That's it!"
>}}

If you aren't familiar with WSGI, you should read it. WSGI works similar to CGI, which receives HTTP Request message, parses it, and passes it to WSGI application look like Flask app. Then, gunicorn receives a response object from the web app, which converts to an HTTP Response message. Besides, Gunicorn supports SSL, scales request handler, auto restart when handler terminated, and so on. Gunicorn also supports many class worker as Gevent, Uvicorn (for ASGI). I love it 😍😍😍.

## [SQLAlchemy](https://sqlalchemy.org/) - Database toolkit

{{< image
	url="https://miro.medium.com/max/355/1*fgY0nqaiNOoDmBozTk2F4Q.jpeg"
	title=""
>}}

Also popular languages, python has a famous database toolkit, which is SQLAlchemy. SQLAlchemy supports common SQL databases as MySQL, PostgresSQL, Oracle SQL, and so on. You can execute a raw SQL query with the engine in SQLAlchemy or you use ORMs for mapping python objects to table in the database. Basically, you can interact with the database easily. SQLAlchemy independent with the application, you can use SQLAlchemy for the web application, desktop application, or command tool, why not? If you are a Flask beginner, I recommend using Flask-SQLAlchemy, because you can integrate SQLAlchemy to Flask without worry session management, setup and declare model, migration…

## [Alembic](https://alembic.sqlalchemy.org/en/latest/) - Migration database tool

Alembic is a migration tool, it only supports SQLAlchemy such as the main component. Alembic detects changes between ORMs class and tables in the database, then it generates the migration file as a python source code file. You can initialize the database structure without worry about it.

[Marshmallow](https://marshmallow.readthedocs.io/en/stable/) - simplified object serialization

{{< image
	url="https://miro.medium.com/max/549/1*_Di5QgzDTTkOCxeZ-tn7tQ.png"
	title=""
>}}

## [Connexion](https://connexion.readthedocs.io/en/latest/) — Wrapper Flask for OpenAPI specification

{{< image
	url="https://miro.medium.com/max/700/1*EQffFO8dzlpotUTGRigdBA.png"
	title=""
>}}

Connexion was developed by Zalando. Connexion also supports the Swagger specification, validates the request, and response(optional). You have an OpenAPI specification file, pass it to it, and done. Connexion uses these spec file for routing request, validate input and output from your service. Basically, Connexion uses [jsonschema](https://python-jsonschema.readthedocs.io/en/stable/) for validation, it also supports modularization look like a blueprint in Flask.

## [Pytest](https://docs.pytest.org/en/latest/) — Software testing with pytest

{{< image
	url="https://miro.medium.com/max/189/1*9pthPtOACbN4R2sJLnc1Wg.png"
	title=""
>}}

Pytest is a testing framework. It executes these classes base on TestCase class and it can integrate the mock framework. Besides, the pytest also supports assert statement (contrast unittest) and it has many useful concepts such as fixture. You can initial these base states for each test unit (function, class, session). Pytest also supports other plugins such as code coverage and so on.

I hope you will enjoy my sharing and it may help you the next time.
