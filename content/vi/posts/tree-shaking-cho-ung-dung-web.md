---
title: "Tree Shaking cho ứng dụng web"
date: 2022-08-08T20:30:00+07:00
author: Nguyễn Khắc Thành
published: true
tags:
- Web
- Optimization
categories:
- web_development
- Javascript
- Next.JS
description: "Tree-shaking là một phương pháp phổ biến để tối ưu ứng dụng web. Mục đích của phương pháp này là loại bỏ các deadcode ra khỏi ứng dụng web, giúp ứng dụng của bạn có thể download và chạy dưới trình duyệt được nhanh và mượt mà hơn. Bài viết này sẽ không đi sâu vào chi tiết kĩ thuật mà chỉ trình bày những ý chính, giúp mọi người có một cheatsheet căn bản trước khi thực hiện eliminate deadcode. Còn nếu bạn muốn có cái nhìn chi tiết hơn, bạn có thể đọc [bài viết trước](tree-shaking.md) của mình nhé."
---

Tree shaking là một phương pháp phổ biến để tối ưu ứng dụng web. Mục đích của phương pháp này là loại bỏ các deadcode ra khỏi ứng dụng web, giúp ứng dụng của bạn có thể download và chạy dưới trình duyệt được nhanh và mượt mà hơn. Bài viết này sẽ không đi sâu vào chi tiết kĩ thuật mà chỉ trình bày những ý chính, giúp mọi người có một cheatsheet căn bản trước khi thực hiện eliminate deadcode. Còn nếu bạn muốn có cái nhìn chi tiết hơn, bạn có thể đọc [bài viết trước](tree-shaking.md) của mình nhé. OK, let's go!!! 

<!--More-->

## 1. Viết code và sử dụng các thư viện hỗ trợ định dạng ESModule thay cho CommonJS

Đây là điều cơ bản và dễ thực hiện nhất để ứng dụng của bạn có thể được tree shake một cách hiệu quả. Code javascript có hai loại định dạng phổ biến là CommonJS và ESModule. Mọi người chỉ cần nhớ rằng: **các bundle không thể tree shake nếu code có định dạng là CommonJS**.

Để tree shake diễn ra, các bundler như Webpack, RollupJS hay ESBuild phải biết cấu trúc ứng dụng của bạn tại thời điểm build (build time). Cấu trúc đó được gọi là dependecy graph, nó giúp bundler nhận biết những thành phần nào trong ứng dụng phụ thuộc vào những thành phần khác để từ đó biết được những thành phần dư thừa. 

Code JS dưới định dạng CommonJS không đáp ứng được điều này do nó có thể import các thành phần khác tại runtime, trong các scope khác nhau như branching scope, block scope,... Điều này làm cho bundle không thể nhận biết chính xác những đoạn code nào nên loại bỏ hay cần được giữ lại.

ESModule là định dạng không cho phép developer import module tại runtime, tức là developer sẽ chỉ được import module tường minh tại module scope.

## 2. Tránh tạo ra các side-effect nếu như nó không thật sự cần thiết

Một đối tượng (operation hay function) được gọi là có side-effect nếu nó tác động lên một trạng thái bên ngoài scope của nó. Ví dụ như bạn viết một hàm như sau

```javascript
window.foo = 'foo';

function bar() {
  window.foo = 'bar';
}
```

Như vậy, hàm `bar` được coi là tồn tại side effect. Lấy ví dụ khác cụ thể như sau:

```javascript
window.foo = 'foo';

function bar() {
  return 'bar';
}

window.foo = bar();
```

Mặc dù `window.foo` không được dùng ở đâu trong ứng dụng (ít nhất là tại build time) nhưng webpack sẽ nhận thức đó là 1 side-effect (nó có thể được dùng tại runtime do window có thể truy cập sau này tại runtime) và nó sẽ bundle cả hàm `bar` cũng các dependecies của nó và file kết quả.

Ngoài ra, nếu các bạn viết một thư viện nào nó, để đánh dấu rằng nó không có bất kì side effect nào, nhớ thêm  trường `"sideEffects": false` vào package.json để bundler có thể biết.

## 3. Tránh sử dụng class

Bundler chỉ nhận biết bạn sử dụng thành phần nào đó thông qua câu lệnh import ở đầu các module. Còn các thành phần của 1 class có thể được sử dụng hoặc không tại runtime nên chúng không thể tree shake bởi các bundler.

## 4. Tránh sử dụng nhiều phiên bản của cùng 1 thư viện

Giả sử mình có 1 ứng dụng sau:

```json
{
  "name": "libA",
  "dependencies": {
    "swr": "^0.3.9"
  }
}
```

```json
{
  "name": "app",
  "dependencies": {
    "libA": "^1.0.0",
    "swr": "^1.1.2"
  }
}
```

Nếu sử dụng như vậy, bundler sẽ bundle cả hai phiên bản `swr: 0.3.9` và `swr: 1.1.2` trong khi thật sự điều này là không cần thiết đối với ứng dụng của bạn.

Một ví dụ khác liên quan đến việc resolution của yarn berry với cơ chế Play'n Plug 

```json
{
  "name": "swr",
  "version": "1.1.2",
  "peerDependencies": {
    "react": "*"
  }
}
```

```json
{
  "name": "libA",
  "dependencies": {
    "swr": "1.1.2",
    "react": "^16.9.14"
  }
}
```

```json
{
  "name": "app",
  "dependencies": {
    "swr": "1.1.2",
    "react": "^17.0.2"
  }
}
```

Tuy `swr` có cùng version là `1.1.2` nhưng bạn vẫn sẽ thấy trong bundle có tới hai đoạn code giống hệt nhau

Lúc này bạn có thể xem lí do bằng câu lệnh [`yarn info`](https://yarnpkg.com/cli/info) như sau:

```bash
$ yarn info -AR --virtuals swr
```

```
├─ swr@npm:1.1.2 [0bbaa]
│  ├─ Version: 1.1.2
│  │
│  └─ Peer dependencies
│     └─ react@^16.11.0 || ^17.0.0 → npm:17.0.2
│
└─ swr@npm:1.1.2 [330c3]
   ├─ Version: 1.1.2
   │
   └─ Peer dependencies
      └─ react@^16.11.0 || ^17.0.0 → npm:16.9.14
```

yarn sẽ resolve `swr` cho `libA` và `app` hai virtual package khác nhau (thực chất cả 2 cùng trỏ tới 1 địa chỉ trên disk), do đó, webpack sẽ hiểu đó là hai phiên bản `swr` khác nhau.

## 4. Sử dụng lazy loading khi có thể

Lazy loading giúp giảm kích thước ứng dụng đi khá nhiều do browser sẽ không cần tải hết code của ứng dụng tại 1 thời điểm.

Ví dụ: bạn có 2 component `Homepage` và `Account` cho 2 route `/` và `/account` trong ứng dụng react. Nếu bạn bundle tất cả vào chung 1 file js sẽ gây ra lãng phí vì tại 1 thời điểm, user chỉ vào được 1 route duy nhất nhưng nó phải download cả code của `Homepage` và `Account`.

React cung cấp cho developer hàm [`React.lazy`](https://reactjs.org/docs/code-splitting.html), NextJS có hàm [`dynamic`](https://nextjs.org/docs/advanced-features/dynamic-import) trong module `next/dynamic`.
Với các component khác, bạn có thể chỉ cần builtin function [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) của JS là đủ.

## 5. Tránh việc viết nhiều component vào cùng 1 file

Giả sử ứng dụng của mình có cấu trúc như sau:

```
src
├── helpers.js
└── pages
   ├── account.js
   └── index.js
```

```jsx
// helpers.js

export function foo() {
  return 'foo';
}

export function bar() {
  return 'bar';
}
```

```jsx
// pages/account.jsx

import { foo } from '../helpers';

export default function Home() {
  return <div>{foo()}</div>
}
```

```jsx
// pages/index.jsx

import { bar } from '../helpers';

export default function Account() {
  return <div>{bar()}</div>
}
```

Ứng dụng của mình có 2 entrypoint và mình sử dụng webpack làm bundler.

Bạn có thể thấy, hai hàm `foo` và `bar` được dùng ở trong toàn bộ ứng dụng. Tuy nhiên, đối với `index.js` thì hàm `bar` là deadcode, với `account.js` thì `foo` là deadcode. Tuy nhiên, webpack vẫn bundle cả 2 hàm vào mỗi đầu ra của cả 2 entrypoint dẫn tới unused js.

Điều này xả ra do tối ưu `usedExports` của webpack nhìn 2 hàm này dưới góc nhìn của toàn bộ ứng dụng chứ không phải theo góc nhìn của từng entrypoint. Do đó, nó sẽ không remove chúng ra khỏi bundle. **Hay nhớ rằng, tối ưu này chỉ remove những đoạn code không được sử dụng ở bất kì đâu trong ứng dụng**.

Để tree shaking được hiệu quả, bạn có thể tách hai hàm này ra thành các file riêng biệt hoặc viết chúng ngay trong file entrypoint, nơi chúng được sử dụng.

## 6. Giữ nguyên cấu trúc source code khi compile nếu đó là thư viện

Việc giữ nguyên cấu trúc sẽ giúp developer dễ dàng hơn trong việc control tree shaking. Đồng thời, nó cũng giúp tránh được các side-effect do quá trình bundle + minimize của bundler.

Trong RollupJS, bạn có thể enable chế độ [`preserveModules`](https://rollupjs.org/guide/en/#outputpreservemodules)

## 7. Hạn chế sử dụng `import * from '...'`

Việc sử dụng `import * from ...` đồng nghĩa với việc bạn nói với bundler rằng bạn sẽ sử dụng toàn bộ component mà thư viện đó cung cấp mặc dù trong thực tế bạn chỉ sử dụng rất ít các component. Việc `import` như vậy là nguyên nhân phổ biến làm kích thước của ứng dụng lớn. Hãy `import` chỉ những gì bạn thật sự sử dụng như

```javascript
import useSWR from 'swr';
import useInfinite from 'swr/infinite';
```

Vừa rồi là những king nghiệm của mình trong việc loại bỏ deadcode ra khỏi một ứng dụng web. Mình hi vọng bài viết này sẽ giúp ích phần nào cho các bạn trong việc cải thiện chất lượng của ứng dụng web.
