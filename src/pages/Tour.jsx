import React from 'react'

export default function Tour() {
  return (
    <section className="tour-page" aria-label="GST AI product tour">
      <iframe
        className="tour-iframe"
        src="https://gst.orivenza.com/demo"
        title="Orivenza GST AI Tour"
        loading="eager"
        allow="clipboard-write"
      />
    </section>
  )
}
