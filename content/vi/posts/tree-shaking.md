---
title: "Tree Shaking"
date: 2022-03-27T21:24:18+07:00
draft: true
author: Nguyễn Khắc Thành
---

Tree shaking là một khái niệm phổ biến trong phát triển ứng dụng web, đặc biệt là trong thời đại phát triển mạnh mẽ của các ứng dụng web ngày nay.
Vậy tree shaking là gì và tại sao vai trò của nó lại quan trọng trong quá trình phát triển ứng dụng web?. Chúng ta cùng tìm hiểu trong nài viết này nhé :smile:.

<!--More-->

Tại Teko, team của mình phát triển một ứng dụng web bán hàng cho nhiều khách hàng như Phong Vũ, VnShop, VinMart, ... Với việc nhiều khách hàng như vậy nên lượng feature để đáp ứng nhu cầu là rất cao, đòi hỏi codebase lớn. Và tất nhiên, bên cạnh phát triển và hoàn thiện tính năng, chúng mình còn phải tối ưu nó sao cho chúng chạy ổn định và "fast".

Một trong những khía cạnh để mình có thể tiếp cận trong việc tối ưu chính là bundle size của sản phẩm. Một trong những công cụ giúp tụi mình phát hiện vấn đề là nhờ một số kĩ thuật đánh giá mà mình có đề cập trong bài viết [trước đây](su-dung-lighthouse-va-react-developer-tools-de-danh-gia-hieu-nang-web.md).

Trước khi tối ưu vấn đề của bundle size thì người dùng phải load ít nhất 750kb dữ liệu khi vào trang web. Sau khi tối ưu, con số này giảm còn 340kb.

Trong bài viết này, mình sẽ đi chi tiết hơn về một kĩ thuật giúp giảm bundle size của các ứng dụng web hiện đại được gọi là **tree shaking**. Đồng thời, bài viết này sẽ lấy ví dụ thông qua Webpack, các bundler khác có thể sẽ có cách thức hoạt động hơi khác.

### Tree shaking là gì?

Tree shaking là một thuật ngữ để chỉ việc gỡ bỏ dead code. Các bundle hiện này hỗ trợ tính năng này có thể kể đến như Webpack, Rollup hay ESBuild. Tất nhiên, nó không phải là một tính năng có thể chỉ cần on/off là xong. Để đạt được kì vọng, bạn phải luôn monitor ứng dụng, phát hiện và áp dụng các kĩ thuật để tree shaking hoạt động hiệu quả.

### Tại sao tree shaking lại quan trọng?

Dead code là những đoạn code bị thừa trong artifact. Chúng nên được gỡ bỏ trước khi được deliver tới người dùng. Việc chúng được gỡ bỏ sẽ làm giảm việc downloading, decompressing, parsing và executing code. Từ đó giúp tăng hiêụ năng và trải nghiệm người dùng, giúp ứng dụng của chúng ta "nhanh" hơn.

### Tree shaking hoạt động ra sao?

Khi viết một ứng dụng, chúng ta thường xuyên sử dụng các dependency (hay các library). Do chúng là các thư viện phục vụ cho nhiều người nên chúng sẽ cung cấp tối đa các feature mà nó có. Điều này dẫn tới việc có những feature ứng dụng của chúng ta không cần tới nhưng chúng vẫn được bundle vào artifact bởi các bundler như Webpack.

Bằng việc tạo ra một dependency graph, các bundler sẽ biết những đoạn code nào là dư thừa và sẽ được gỡ bỏ trong quá trình minification.

Để các bundler biết được đoạn code nào thừa, các thư viện phải được cấu trúc sao cho chúng hỗ trợ được tree shaking khi bundle chạy qua chúng. Đây là mấu chốt của vấn đề mà trong phần sau của bài viết mình sẽ nói đến.

### Làm sao để kiểm tra một thư viện thực sự có thể tree shake?

Cách đơn giản nhất là bạn có thể bundle ứng dụng của bạn khi sử dụng thư viện đó và sau đó kiểm tra output của nó. Nếu nó chứa những đoạn code không sử dụng, đồng nghĩa với việc thư viện đó có khả năng không thể tree shake được.

Có hai điều bạn cần lưu ý là:
- Tree shaking chỉ xaỷ ra ở code application, không phải ở code library. Vì chỉ ở application, bundler mới biết đâu là đoạn code được sử dụng.
- Thư viện nên đảm bảo khả năng tree shake cho bundler sau này.

{{< image
    url="/simple-export-module-graph.svg"
    title="Nguồn: https://blog.theodo.com"
>}}

Trong hình trên, khi tree shaking hoạt động, hàm **getUserPhoneNumber** sẽ bị gỡ khỏi bundle file.

OK, giờ chúng ta sẽ tới phần: **Làm sao để viết một thư viện có khả năng tree shaking?**

### Luôn sử dụng ES module giúp bundler có thể phát hiện dead code

Có rất nhiều format trong Javascript code nhưng phổ biến và hay gặp nhất là CommonJS (CJS) và Ecma Script Modules (ESM). Đây là hai hệ thống module phổ biến của JS trong đó, CJS được sử dụng phổ biến bởi NodeJS. ESM được hỗ trợ trong các bản sau ES6 và sau này cũng được hỗ trợ bởi NodeJS nhưng không phổ biến như CJS.

Vấn đề ở đây là: có thể import/export module ở bất kì đâu trong CJS còn ESM thì luôn phải import/export ở module scope.

Việc import/export quá linh động trong CJS làm cho code của chúng ta khó đoán. Mình có thể lấy ví dụ như sau:

```javascript
// lib.js

module.exports = {
  foo: () => console.log("Foo")
}

// app.js

if (conditions) {
  const { foo } = require("./lib.js");
  ...
}
```

Bundler sẽ không biết hàm **foo** được sử dụng hay không tại thời điểm bundle và do đó nó không thể tree shake. **Việc có thể import/export ở bất kì đâu của CJS sẽ làm bundle không thể phát hiện được những đoạn code không sử dụng**. Mặc định, tính năng tree-shaking trong các bundler sẽ không hỗ trợ đối với các thư viện có format CJS.

```javascript
// lib.js

export function foo {
  console.log("Foo");
}

// app.js

import { foo } from "./lib.js";
```

Ngược lại, ESM có cơ chế rõ ràng trong việc import/export. Bạn chỉ có thể thực hiện import/export ở module scope nên bundler có thể thấy rõ ràng module của bạn đang sử dụng những module khác nào.

Hiện nay, đa số các thư viện JS sẽ hỗ trợ đồng thời cả 2 format ESM và CJS. Trong file **package.json**, entrypoint dành cho ESM là **module**, CJS sẽ là **main**.

```json
{
  "main": "dist/index.cjs",
  "module": "dist/index.js"
}

```

{{< image
    url="/esmodules-module-graph.svg"
    title="Nguồn: https://blog.theodo.com"
>}}

Với graph ở trên, hàm **getUserAccout** là một unused export nên bundler có thể sẽ gỡ bỏ **userAccount.js** file ra khỏi bundle. Điều này chưa chắc đã đúng, cùng tìm hiểu ở phần sau nhé :smile:

Tóm lại, ở phần này, bạn cần nắm được:
- ESM là điều kiện cần có để tree-shaking có thể hoạt động
- Hãy đảm bảo, thư viện mà bạn cung cấp hỗ trợ ESM
- Chắc chắn thư viện mà bạn sử dụng hỗ trợ ESM khi có thể hoặc bạn sẽ không thể tree-shake :smile:

### Sử dụng side-effect optimization nếu có thể

Trong Webpack có hai loại tối ưu:
- **usedExports**: phát hiện những export module được sử dụng hoặc không được sử dụng ở bất kì đâu
- **sideEffects**: bỏ qua những module mà ở đó không có bất kì export nào được sử dụng và free side-effect.

Như ở ví dụ trong phần trước, nếu loại bỏ hoàn toàn **userAccount.js**, rất có thể ứng dụng của bạn sẽ hoạt động sai kì vọng vì trong file đó, có những đoạn code tác động lên các biến global như DOM hay window. Trường hợp phổ biến nhất là các hàm polyfill. Bên cạnh đó, không ít thư viện dùng tính năng import css cũng dẫn tới tình trạng side-effect.

Chúng ta cần lưu ý: side-effect chỉ được sử dụng nếu thư viện đó free side-effect.
Các bundler như Webpack hay Rollup mặc định sẽ hiểu thư viện của bạn side-effect hoàn toàn.
Nếu chúng ta đảm bảo thư viện của mình là hoàn toàn free side-effect thì có thể set **sideEffects** trong package.json là **false**. Khi này, các bundler sẽ thực hiện side-effect optimization.

Trong vài trường hợp, chúng ta không muốn áp dụng side-effect optimization lên một vài file (chẳng hạn như các file css), chúng ta có thể liệt kê nó trong sideEffects như sau:

```json
{
  "sideEffects": [
    "dist/style.css"
  ]
}
```

Như vậy, ta có thể thấy sideEffect hoạt động hiệu quả hơn khi nó sẽ bỏ qua toàn bộ module/file và subtree.

Để hiểu hơn về 2 tối ư này, bạn cần nhớ rằng:
- sideEffects bỏ qua toàn bộ những module được import nếu không có bất kì nội dung nào của nó được sử dụng.
- usedExports gỡ bỏ hoàn toàn những export không được sử dụng ở bất kì module nào.

Side effect sẽ không thực sự hiệu quả nếu module không được chia đủ nhỏ và phần sau mình sẽ nói rõ hơn ý này.

Tóm lại, ở phần này, các bạn cần nắm những ý sau:
- tree shaking có 2 phần: **used exports** và **side effects**
- Side efffect hiệu quả hơn việc chỉ sử dụng **used exports**
- Đảm bảo thư viện của bạn phải free side-effect trước khi dùng tối ưu này