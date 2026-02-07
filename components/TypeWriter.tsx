import { TypeAnimation } from 'react-type-animation'
import type { CSSProperties, FC } from 'react'
import { useMemo } from 'react'

// Define types based on react-type-animation's internal types
// These match the types defined in the package but aren't exported
type SequenceElement = string | number | ((element: HTMLElement | null) => void | Promise<void>)
type TypeWriterSequence = Array<SequenceElement>
type TypeWriterSpeed = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99
type GranularSpeed = {
  type: 'keyStrokeDelayInMs'
  value: number
}

const CURSOR_CLASS_NAME = 'custom-type-animation-cursor'

export interface    TypeWriterProps {
  sequence: TypeWriterSequence
  keyStrokeDelay?: number
  cursor?: boolean
  repeat?: number
  style?: CSSProperties
  className?: string
}

export const TypeWriter: FC<TypeWriterProps> = ({
  sequence,
  keyStrokeDelay = 2,
  cursor = true,
  repeat = Infinity,
  style = { fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' },
  className = '',
}) => {
  // Convert numeric speed values outside 1-99 range to GranularSpeed
  const normalizedSpeed: GranularSpeed | undefined =
    typeof keyStrokeDelay === 'number' ? { type: 'keyStrokeDelayInMs', value: keyStrokeDelay } : undefined

  console.log(normalizedSpeed)

  // If cursor is enabled and repeat is 0 (not infinite), add callback to remove cursor when done
  const modifiedSequence = useMemo(() => {
    if (cursor && repeat === 0) {
      // Add callback at the end to remove cursor class
      return [
        ...sequence,
        (el: HTMLElement | null) => {
          if (el) {
            el.classList.remove(CURSOR_CLASS_NAME)
          }
        }
      ]
    }
    return sequence
  }, [sequence, cursor, repeat])

  // Combine className with cursor class if cursor is enabled
  const combinedClassName = cursor
    ? `${CURSOR_CLASS_NAME} ${className}`.trim()
    : className

  return (
    <TypeAnimation
      sequence={modifiedSequence}
      wrapper="span"
      speed={normalizedSpeed}
      cursor={false} // Use custom cursor instead
      repeat={repeat}
      style={style}
      className={combinedClassName}
    />
  )
}

export default TypeWriter