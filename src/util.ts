type UnitType = 'd' | 'h' | 'm'

export const isObj = (o: unknown) =>
  Object.prototype.toString.call(o) === '[object Object]'

export const isVoid = (v: unknown): boolean => v === null || v === undefined

export const getLifetime = (value?: string | number): number => {
  if (isVoid(value)) return Infinity

  if (typeof value === 'number') {
    if (value > 0) return Math.round(value)

    return Infinity
  }

  if (typeof value !== 'string') return Infinity

  if (value.length < 2) return Infinity

  const unit = value.slice(-1)

  if ('dhm'.indexOf(unit) === -1) return Infinity

  const count = parseInt(value.slice(0, -1))

  if (isNaN(count)) return Infinity

  return (
    count *
    {
      m: 60,
      h: 3600,
      d: 86400
    }[unit as UnitType]
  )
}
