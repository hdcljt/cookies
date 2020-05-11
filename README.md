# @hudc/cookies

[![build](https://img.shields.io/travis/hdcljt/cookies)](https://travis-ci.org/hdcljt/cookies)
[![coverage](https://img.shields.io/coveralls/github/hdcljt/cookies)](https://coveralls.io/github/hdcljt/cookies)
[![version](https://img.shields.io/github/package-json/v/hdcljt/cookies?color=important)](https://www.npmjs.com/package/@hudc/cookies)
[![license](https://img.shields.io/github/license/hdcljt/cookies)](LICENSE)
[![types](https://img.shields.io/npm/types/@hudc/cookies)](lib/cookies.d.ts)

使用 `Proxy` 代理浏览器 `cookie` 的常用操作，也支持使用类似 Storage API 的方式操作 `cookie`

## 安装

```sh
npm install @hudc/cookies
```

## 引入

```ts
import cookies, {
  cookie,
  getItem,
  setItem,
  removeItem,
  hasItem,
  clear,
  keys,
  length,
} from '@hudc/cookies'
```

> 1. 默认导出的 `cookies` 封装了 `getItem`, `setItem`, `removeItem`, `hasItem`, `clear`, `keys`, `length` 方法
> 2. 按需导出的 `cookie` 使用 Proxy 代理了 `get`, `set`, `deleteProperty`, `has`, `ownKeys` 方法

### 查询 cookie

```ts
// 假设 document.cookie 值为 'abc=123; def-1=456%3AFLAG%3D1'
cookie.abc // 输出 '123'
cookie['def-1'] // 输出 '456:FLAG=1'
cookies.getItem('abc') // 输出 '123'
cookies.getItem('def-1') // 输出 '456:FLAG=1'
getItem('abc') // 输出 '123'
getItem('def-1') // 输出 '456:FLAG=1'
```

### 设置 cookie

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

```ts
// 假设 document.cookie 为空
cookie.abc = '123' // 'abc=123'
cookie['def-1'] = { value: '456:FLAG=1' } // 'abc=123; def-1=456%3AFLAG%3D1'
cookie['ghi[1]'] = { value: '789', expires: 5 } // 'abc=123; def-1=456%3AFLAG%3D1; ghi[1]=789'
// 假设 document.cookie 为空
cookies.setItem('abc', '123') // 'abc=123'
cookies.setItem('def-1', '456:FLAG=1') // 'abc=123; def-1=456%3AFLAG%3D1'
cookies.setItem('ghi[1]', '789', 'Tue, 19 Jan 2038 03:14:07 GMT') // 'abc=123; def-1=456%3AFLAG%3D1; ghi[1]=789'
// 假设 document.cookie 为空
setItem('abc', '123') // 'abc=123'
setItem('def-1', '456:FLAG=1') // 'abc=123; def-1=456%3AFLAG%3D1'
setItem('ghi[1]', '789', 2147483647000) // 'abc=123; def-1=456%3AFLAG%3D1; ghi[1]=789'
```

### 删除 cookie

```ts
// 假设 document.cookie 值为 'abc=123; def-1=456%3AFLAG%3D1; ghi[1]=789'
delete cookie.abc // 'def-1=456%3AFLAG%3D1; ghi[1]=789'
cookies.removeItem('def-1') // 'ghi[1]=789'
removeItem('ghi[1]') // ''
```

### 清空 cookies

```ts
cookies.clear()
clear()
```

### 是否存在指定名称的 cookie

```ts
// 假设 document.cookie 值为 'abc=123; def-1=456%3AFLAG%3D1; ghi[1]=789'
'abc' in cookie // true
cookies.hasItem('def-1') // true
hasItem('ghi[1]') // true
```

### 获取所有 cookie 名称

```ts
// 假设 document.cookie 值为 'abc=123; def=456:FLAG=1'
cookie.keys // 输出 ['abc', 'def']
Object.getOwnPropertyNames(cookie) // 输出 ['abc', 'def']
cookies.keys // 输出 ['abc', 'def']
keys() // 输出 ['abc', 'def']
```

### 获取 cookies 数量

```ts
// 假设 document.cookie 值为 'abc=123; def=456:FLAG=1'
cookie.length // 输出 2
cookies.length // 输出 2
length() // 输出 2
```

## 参考

- [Document.cookie](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)
- [js-cookie](https://www.npmjs.com/package/js-cookie)
- [browser-cookie-lite](https://www.npmjs.com/package/browser-cookie-lite)
