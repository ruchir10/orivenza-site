import React from 'react'
import { Link } from 'react-router-dom'

export default function InfoCard({
  title,
  description,
  points = [],
  className = '',
  linkTo,
  linkLabel
}) {
  return (
    <article className={className}>
      <h3>{title}</h3>
      <p>{description}</p>
      {points.length > 0 && (
        <ul>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {linkTo && linkLabel && (
        <Link to={linkTo} className="card-inline-link">
          {linkLabel}
        </Link>
      )}
    </article>
  )
}
