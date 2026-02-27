import React from 'react'
import useRevealOnScroll from '../hooks/useRevealOnScroll'

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const { ref, isVisible } = useRevealOnScroll()

  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${isVisible ? 'reveal-visible' : ''}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
