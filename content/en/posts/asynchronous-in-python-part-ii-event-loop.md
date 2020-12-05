---
title: "Asynchronous in Python Part II: Event loop"
date: 2020-12-22T09:41:10+07:00
published: true
tags:
- programming
- python
- asynchronous
categories:
- Programming
---

Most of the asynchronous key concept is the __event loop__. __The event loop__ maintains and executes the tasks when they live. So, how they do it? And, how do programmers implement the event loop? 

<!--more-->

An event loop is a loop (finite or in-finite), which iterates through available tasks and executes them. The event loop also maintains the tasks in a queue. After you had created a task, it was pushed into this queue by the event loop.

The below picture shows simple event loop. It's very simple for understanding :smile:

{{< image 
    url="https://firebasestorage.googleapis.com/v0/b/myblog-e552f.appspot.com/o/asynchronous-in-python-part-ii-event-loop%2FeventLoop-full.svg?alt=media&token=981daf93-59ad-4b31-b037-1bf457100784"
    title="Event loop"
>}}

Coroutines can remember exit points, where it returns control to the caller, and it can resume at that.

The queue contains coroutines, and each task is executed in a code segment by the event loop. State of the coroutine is saved by themself and push again to queue (if not done).

The event loop stopped when the queue was empty.

#### How event loop execute and maintain tasks?

{{< image 
    url="https://firebasestorage.googleapis.com/v0/b/myblog-e552f.appspot.com/o/asynchronous-in-python-part-ii-event-loop%2FUntitled%20Diagram-2.png?alt=media&token=4a7ca640-a934-4042-8188-45f26fcc5aa7"
    title="Event loop with a task (coroutine)"
>}}

After the task executed a segment, it returns the caller (event loop) itself (but it is changed to the next code segment and the task's state is saved), so the event loop pushes it again to queue

It's playtime. Now, you can write an async program by using `generator` (simple coroutine).

Simplify, you should wrap coroutine in the task class. In the future, that is useful and flexible.

```python
class Task:
    def __init__(self, waiter=None):
        self._task = iter(self)
        # it can be a caller and someone, so that will call after this task is done.
        self._waiter = waiter

    def __iter__(self):
        yield self

    def execute(self):
        try:
            ret = next(self._task)
        except StopIteration:
            return self._waiter
        else:
            return ret
```

Then, we should define the `EventLoop` class, which should be simple to understand

```python
import queue

class EventLoop:
    def __init__(self):
        self._queue = queue.Queue()

    def push_task(self, *tasks):
        for task in tasks:
            self._queue.put(task)

    def _run_by(self, stop_fn):
        _queue = self._queue
        while not stop_fn():
            task = _queue.get()
            next_task = task.execute()
            if next_task:
                self.push_task(next_task)

    def run_until_complete(self):
        self._run_by(self._queue.empty)

    def run_forever(self):
        self._run_by(lambda: False)
```

Now, after preparing step is done, we can implement a simple asynchronous program :smile:


```python
import time

current_loop = None

class Sleep(Task):
    def __init__(self, *args, n=0, **kwargs):
        super().__init__(*args, **kwargs)
        self._n = n
        self._start = time.time()

    def __iter__(self):
        while 1:
            if time.time() - self._start > self._n:
                return self._waiter
            yield self

class Ping(Task):
    def __iter__(self):
        print('Start ping')
        yield Sleep(self, n=3)
        print('End ping')

class Pong(Task):
    def __iter__(self):
        print('Start pong')
        yield Sleep(self, n=2)
        print('End pong')

current_loop = EventLoop()
current_loop.push_task(Ping(), Pong())
current_loop.run_until_complete()
```

The above code is equivalent to this
```python
import asyncio

def ping():
    print('Start ping')
    await asyncio.sleep(3)
    print('End ping')

def pong():
    print('Start pong')
    await asyncio.sleep(2)
    print('End pong')

task = asyncio.gather(ping(), pong())
asyncio.run(task)
```

You should see

```sh
Start ping
Start pong
End pong
End ping
```

That's awesome :smile:

Thank you for reading.