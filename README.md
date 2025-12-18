# cocos_icp


cocos 里即成icp 相关的代码库

1. 语法兼容性修补 (Cocos JS 引擎限制)
移除 BigInt 指数运算符 (**)：
官方：使用 2n ** 32n 这种语法。
修改版：Cocos 的旧版 JS 引擎不支持 BigInt 的 ** 运算。我们将其替换为手写的循环乘法或 Math.pow (针对 Number) 的逻辑。
移除 1n 字面量：
官方：直接使用 1n, 0n。
修改版：替换为 BigInt(1), BigInt(0)，防止构建时语法解析错误。
修复 Spread Syntax (...) 问题：
官方：使用 [...uint8Array] 来合并数组。
修改版：在 Cocos 环境下，对大数组使用展开语法会导致栈溢出或类型错误（引发 Principal checksum 错误）。我们将其替换为 Uint8Array.set 或 concat 方法。



2. 网络请求兼容性 (Fetch & CBOR)
强制使用 Blob 发送请求体：
官方：直接将 ArrayBuffer 或 Uint8Array 传给 fetch 的 body。
修改版：Cocos 的 fetch 实现对二进制数据支持不佳，导致后端收到空数据（报 400 Bad Request）。我们强制将 CBOR 编码后的数据封装为 Blob 对象发送。


移除 CBOR Self-Describe Tag：
官方：CBOR 编码头部包含 d9d9f7 (Self-Describe Tag)。
修改版：为了排除兼容性干扰，我们暂时禁用了这个标签的添加



3. 安全验证绕过 (仅限开发调试！)
绕过 BLS 签名验证：
官方：严格验证 IC 后端返回的签名。如果验证失败，抛出 CertificateVerificationError。
修改版：在 Certificate.verify 中，如果验证失败，仅打印警告并继续执行。这是为了解决本地环境或 Cocos BLS 库兼容性导致的验证失败问题。
放宽 BLS 公钥格式检查：
官方：严格检查公钥长度必须为 97 字节。
修改版：允许非标准长度的公钥通过，仅打印警告。
