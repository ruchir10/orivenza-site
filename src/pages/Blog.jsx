import React from 'react'
import Reveal from '../components/Reveal'

const posts = [
  {
    id: 1,
    title: 'How AI Can Save 45 Minutes in Your Morning Routine',
    date: 'Mar 05, 2026',
    readTime: '6 min read',
    topic: 'Productivity',
    excerpt:
      'Use AI to generate a realistic day plan from your calendar, commute time, and top priorities so you stop deciding the same things every morning.',
    action:
      'Ask AI to build a "9 AM to 9 PM plan" with three must-do tasks, one health task, and one relationship task.'
  },
  {
    id: 2,
    title: 'AI Meal Planning for Busy Families: Less Waste, Better Nutrition',
    date: 'Mar 03, 2026',
    readTime: '7 min read',
    topic: 'Home Life',
    excerpt:
      'With a weekly pantry snapshot and a budget cap, AI can create practical meal plans, grocery lists, and prep schedules that actually fit real life.',
    action:
      'Share your pantry items and budget, then ask AI for 7 dinners, prep instructions, and a sorted shopping list.'
  },
  {
    id: 3,
    title: 'Using AI as a Personal Finance Co-Pilot (Without Risky Automation)',
    date: 'Feb 28, 2026',
    readTime: '8 min read',
    topic: 'Money',
    excerpt:
      'AI works best as an advisor, not a decision-maker: categorize spending, detect recurring leaks, and propose safer weekly cash-flow targets.',
    action:
      'Paste last month spending totals by category and ask AI for one "cut", one "hold", and one "invest in value" recommendation.'
  },
  {
    id: 4,
    title: 'AI for Parents: Homework Help That Builds Thinking, Not Dependency',
    date: 'Feb 24, 2026',
    readTime: '5 min read',
    topic: 'Education',
    excerpt:
      'Structured prompts can turn AI into a tutor that asks guiding questions and explains concepts in age-appropriate steps instead of giving direct answers.',
    action:
      'Use the prompt: "Do not give the answer. Give 3 hints, then ask me to try once before you explain."'
  },
  {
    id: 5,
    title: 'Smarter Commutes With AI: Traffic, Focus Time, and Stress Control',
    date: 'Feb 19, 2026',
    readTime: '6 min read',
    topic: 'Daily Commute',
    excerpt:
      'AI can combine route data, weather, and meeting schedules to suggest departure windows and commute modes that reduce lateness and fatigue.',
    action:
      'Ask AI each morning: "Given weather + first meeting + travel mode, what is my safest leave-by time?"'
  },
  {
    id: 6,
    title: 'The 20-Minute Evening AI Reset for Better Sleep and Better Decisions',
    date: 'Feb 14, 2026',
    readTime: '5 min read',
    topic: 'Wellness',
    excerpt:
      'A short AI-guided evening review can close your mental loops, plan tomorrow, and reduce decision fatigue before bedtime.',
    action:
      'Use AI to run a nightly script: wins, pending tasks, tomorrow top 3, and a 10 PM shutdown reminder.'
  }
]

export default function Blog() {
  return (
    <section className="page blog container">
      <header className="blog-header">
        <h1>AI and Daily Life Blog</h1>
        <p>
          Practical ways to use AI in everyday life, from work planning and family routines to health,
          commuting, and money decisions.
        </p>
      </header>

      <div className="blog-list blog-grid">
        {posts.map((post, index) => (
          <Reveal key={post.id} as="article" className="blog-post" delay={index * 75}>
            <div className="blog-meta">
              <time>{post.date}</time>
              <span>{post.readTime}</span>
              <span className="blog-topic">{post.topic}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <p className="blog-action">
              <strong>Try today:</strong> {post.action}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
