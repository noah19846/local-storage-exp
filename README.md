一个可设置过期时间的 localStorage 封装

## API

- get(key)
- set(key, value, lifetime?)
- remove(key)
- clear()

## 用法

```
import lse from 'local-storage-expirable'

lse('a', 'lalala', 60) // 或 lse.set('a', 'lalala', '1m') number 类型时单位为秒，或者 '7d', '24h', '60m' 分别表示 7 天、24 小时、60 分
lse('a') // 或 lse.get('a') 'lalala'

// 60 秒后执行
lse('a') // null


lse.remove('a') // 同 localStorage.removeItem('a')
lse.clear() // 同 localStorage.clear(), 同时 localStorage 对应 api lsc 上都有同名 api 对应
```
