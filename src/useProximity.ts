import { useMouse } from '@lib'
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

const defaultCenter = { x: Infinity, y: Infinity }

export const useProximity = (
  ref: MutableRefObject<HTMLElement | null>,
  { max, min } = { max: 200, min: 0 }
): { x: number; y: number; t: number } => {
  const [closeness, setCloseness] = useState({ t: 0, x: 0, y: 0 })
  const mousePos = useMouse()
  const frame = useRef(0)
  const center = useRef(defaultCenter)

  useEffect(() => {
    const el = ref.current
    center.current = el
      ? {
          x: el.offsetLeft + el.offsetWidth / 2,
          y: el.offsetTop + el.offsetHeight / 2,
        }
      : defaultCenter
  }, [ref])

  useLayoutEffect(() => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const { current: centerPos } = center
      const distX = centerPos.x - mousePos.x
      const distY = centerPos.y - mousePos.y
      const dist = Math.hypot(distX, distY)
      if (dist > max) {
        setCloseness({ x: 0, y: 0, t: 0 })
      } else if (dist < min) {
        setCloseness({ x: 0, y: 0, t: 1 })
      } else {
        const diffed = dist - min
        const range = max - min
        const res = 1 - diffed / range
        const diffedX = distX - min
        const diffedY = distY - min
        const resX = diffedX / range
        const resY = diffedY / range
        setCloseness({ x: resX, y: resY, t: res })
      }
    })

    return () => {
      cancelAnimationFrame(frame.current)
    }
  }, [mousePos, max, min])

  return closeness
}
