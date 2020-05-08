# @hudc/cookies

[![build](https://img.shields.io/travis/hdcljt/cookies)](https://travis-ci.org/hdcljt/cookies)
[![coverage](https://img.shields.io/coveralls/github/hdcljt/cookies)](https://coveralls.io/github/hdcljt/cookies)
[![version](https://img.shields.io/github/package-json/v/hdcljt/cookies?color=important)](https://www.npmjs.com/package/@hudc/cookies)
[![license](https://img.shields.io/github/license/hdcljt/cookies)](LICENSE)
[![types](https://img.shields.io/npm/types/@hudc/cookies)](lib/cookies.d.ts)

操作浏览器 Cookies ，类似 Storage API

## 安装

```sh
npm install @hudc/cookies
```

## 引入

```ts
import cookies from '@hudc/cookies'
```

## 查询 cookie

### 方法

```ts
getItem(key: string): string
```

### 示例

```ts
// 假设 document.cookie 值为 'abc=123'
cookies.getItem('abc') // 输出 123
```

## 设置 cookie

### 方法

```ts
setItem(key: string, value: string, expires?: string | number, path?: string, domain?: string, secure?: boolean, sameSite?: "None" | "Strict" | "Lax"): string
```

- expires 过期时间  
  * 值可以是一个 dateString，或者一个 timeStamp
  * 当值为整型，并且小于 1e9（十亿），则认为是一个过期的秒数
  * 默认在会话结束时过期
- path 路径，默认为当前文档位置的路径
- domain 子域名，默认为当前文档位置的路径的域名部分（包含子域）
- secure 是否只能通过 https 协议传递，默认false
- sameSite 限制跨站传递的策略
  * None 不限制，即跨站点和同站点都会发送 cookie （需要设置 secure）
  * Strict 严格，只有同站点的 cookie 才会被发送
  * Lax 默认
- 返回当前设置的完整信息

### 示例

```ts
cookies.setItem('abc', '123') // abc=123
cookies.setItem('def', '456:FLAG=1') // abc=123; def=456%3AFLAG%3D1
cookies.setItem('ghi', '789', 5) // abc=123; def=456%3AFLAG%3D1; ghi=789
cookies.setItem('ghi', '789', 'Tue, 19 Jan 2038 03:14:07 GMT') // abc=123; def=456%3AFLAG%3D1; ghi=789
cookies.setItem('ghi', '789', 2147483647000) // abc=123; def=456%3AFLAG%3D1; ghi=789
cookies.setItem('jkl[1]', '100_234') // abc=123; def=456%3AFLAG%3D1; ghi=789; jkl[1]=100_234
```

## 删除 cookie

### 方法

```ts
removeItem(key: string): void
```

### 示例

```ts
cookies.removeItem('abc')
```

## 清空 cookies

### 方法

```ts
clear(): void
```

### 示例

```ts
cookies.clear()
```

## 是否存在指定名称的 cookie

### 方法

```ts
hasItem(key: string): boolean
```

### 示例

```ts
cookies.hasItem('abc') // true/false
```

## 获取所有 cookie 名称

### 属性

```ts
keys: string[]
```

### 示例

```ts
// 假设 document.cookie 值为 'abc=123; def=456:FLAG=1'
cookies.keys // ['abc', 'def']
```

## 获取 cookies 数量

### 属性

```ts
length: number
```

### 示例

```ts
// 假设 document.cookie 值为 'abc=123; def=456:FLAG=1'
cookies.length // 2
```

## 参考

- [Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)
- [js-cookie](https://www.npmjs.com/package/js-cookie)
- [browser-cookie-lite](https://www.npmjs.com/package/browser-cookie-lite)
