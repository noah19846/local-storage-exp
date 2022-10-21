import { isObj, isVoid, getLifetime } from './util'

const EXPIRE_AT_KEY = '@@EXPIRE_AT'
const remove = localStorage.removeItem.bind(localStorage)
const clear = localStorage.clear.bind(localStorage)
const key = localStorage.key.bind(localStorage)

type WrappedLocalStorage = Storage & {
  get(key: string): unknown
  set(key: string, value: unknown, lifetime?: string | number): void
  (key: string, value?: unknown, lifetime?: string | number): unknown
}

function get(key: string): unknown {
  const strValue = localStorage.getItem(key)

  if (isVoid(strValue)) return strValue

  try {
    const jsonValue = JSON.parse(strValue as string)

    if (!isObj(jsonValue)) return jsonValue

    if (isVoid(jsonValue[EXPIRE_AT_KEY])) return jsonValue

    if (Date.now() <= jsonValue[EXPIRE_AT_KEY]) return jsonValue.value

    remove(key)

    return null
  } catch {
    // when JSON.parse throws error, which means the value was not set by lse, return the original
    return strValue
  }
}

function set(key: string, value: unknown, lifetime?: string | number) {
  const seconds = getLifetime(lifetime)

  if (seconds !== Infinity) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        [EXPIRE_AT_KEY]: seconds * 1000 + Date.now()
      })
    )
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

const lse: WrappedLocalStorage = (
  key: string,
  value?: unknown,
  lifetime?: string | number
) => {
  if (isVoid(lifetime) && value === undefined) {
    return get(key)
  } else {
    set(key, value, lifetime)
  }
}

lse.get = get
lse.set = set
lse.remove = remove

// copy localStorage api
lse.getItem = localStorage.getItem.bind(localStorage)
lse.setItem = localStorage.setItem.bind(localStorage)
lse.removeItem = remove
lse.clear = clear
lse.key = key
Object.defineProperty(lse, 'length', {
  get() {
    return localStorage.length
  }
})

export default lse
