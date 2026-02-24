import React from 'react'

const posts = [
  {
    id: 1,
    title: 'Scaling Kubernetes in 2026',
    date: 'Feb 24, 2026',
    excerpt: 'Best practices for multi-node Kubernetes deployments at scale.'
  },
  {
    id: 2,
    title: 'Zero-Trust Architecture: A Practical Guide',
    date: 'Feb 20, 2026',
    excerpt: 'How to implement zero-trust security without breaking workflows.'
  },
  {
    id: 3,
    title: 'Cost Optimization in Cloud Infrastructure',
    date: 'Feb 15, 2026',
    excerpt: 'Techniques and tools for reducing your cloud spend by 40%+.'
  },
]

export default function Blog() {
  return (
    <section className="page blog container">
      <h1>Blog</h1>
      <p>Cloud engineering insights and best practices from the Orivenza team.</p>
      <div className="blog-list">
        {posts.map(post => (
          <article key={post.id} className="blog-post">
            <h3>{post.title}</h3>
            <time>{post.date}</time>
            <p>{post.excerpt}</p>
            <a href="#">Read more →</a>
          </article>
        ))}
      </div>
    </section>
  )
}
