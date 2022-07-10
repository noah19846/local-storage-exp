import { isObj, isVoid, getLifetime } from './util'

const EXPIRE_AT_KEY = '@@EXPIRE_AT'
const remove = localStorage.removeItem.bind(localStorage)
const clear = localStorage.clear.bind(localStorage)

function get(key: string): unknown {
  const strValue = localStorage.getItem(key)

  if (isVoid(strValue)) return strValue

  const jsonValue = JSON.parse(strValue as string)

  if (!isObj(jsonValue)) return jsonValue

  if (isVoid(jsonValue[EXPIRE_AT_KEY])) return jsonValue

  if (Date.now() <= jsonValue[EXPIRE_AT_KEY]) return jsonValue.value

  remove(key)

  return null
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

function lse(
  key: string,
  value?: unknown,
  lifetime?: string | number
): unknown {
  if (isVoid(lifetime) && value === undefined) {
    return get(key)
  } else {
    set(key, value, lifetime)
  }
}

lse.get = get
lse.set = set
lse.clear = clear
lse.remove = remove

export default lse
