import React, { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0
      setProgress(ratio * 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div className="scroll-progress-wrap" aria-hidden="true">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
    </div>
  )
}
