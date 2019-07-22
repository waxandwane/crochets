import { MutableRefObject, useEffect, useState } from 'react'

export const useMouseOver = (
  ref: MutableRefObject<HTMLElement | null>
): boolean => {
  const [isOver, setIsOver] = useState(false)

  const handleChange = (val: boolean) => () => setIsOver(val)

  useEffect(() => {
    const el = ref.current
    el && el.addEventListener('mouseenter', handleChange(true))
    el && el.addEventListener('mouseleave', handleChange(false))

    return () => {
      el && el.removeEventListener('mouseenter', handleChange(true))
      el && el.removeEventListener('mouseleave', handleChange(false))
    }
  }, [ref])

  return isOver
}
