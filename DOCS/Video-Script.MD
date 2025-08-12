🎓 readerX – Final Project Presentation Script
📋 Overview
Project: readerX – Interactive Language Learning Tool

Duration: 15–20 minutes

Team: Matheus, Pedro, Roguin

🎤 PART 1 – Matheus: Introduction & Problem Statement
Duration: 5–7 minutes

Opening (1 min)

“Good [morning/afternoon], everyone. I’m Matheus, and today my team and I are excited to present readerX, our interactive language learning web application.
Have you ever tried reading in a foreign language but kept stopping to check a dictionary? Lost your flow and context? Wanted to save new words but had no easy way? That’s the problem we set out to solve.”

Problem Statement (2 min)
Challenges with traditional reading:

Constant interruption to look up words

Loss of reading flow and context

No way to track/review vocabulary

Phrases often lose meaning without context

Limitations of existing tools:

Dictionary apps require switching away from text

Google Translate doesn’t integrate into reading flow

Language learning apps focus on lessons, not real-world reading

No personalized vocabulary tracking

Target users:

Language students

Professionals reading foreign-language documents

Anyone improving comprehension through reading

Solution Overview (2–3 min)
readerX transforms reading into an interactive learning experience.

Core features:

Click words → instant translation

Select phrases → contextual translation

Save words → personal vocabulary library

Track progress over time

Highlights:

Interactive reading with instant translations

Vocabulary management (save, organize, review)

10+ languages supported

Modern UI with dark/light themes

Private, secure user data

Tech stack:

Frontend: React 19 + Material-UI

Backend: Supabase (auth & database)

Translation: Google Translate API

Hosting: Vercel

Transition:
“Now, I’ll pass it to Pedro to demonstrate readerX in action.”

🎤 PART 2 – Pedro: Live Demo & Core Features
Duration: 6–8 minutes

Intro (1 min)

“Thanks, Matheus. I’m Pedro, and I’ll show you how readerX works. Let’s log in…”

Core Feature Demo (4–5 min)

File Upload & Reading (1.5 min)

Upload a German text file via drag-and-drop

Words are clickable → instant translation popup (Google Translate API)

Popup positions itself to stay visible

Phrase Translation (1 min)

Select multiple words → contextual translation of entire phrase

Word Saving (1 min)

Click “Save” next to translation → word stored in personal library with details

Language Selection (0.5 min)

Change language pairs via dropdown menus (10+ options)

Vocabulary Management (1.5 min)

Navigate to “Saved Words”

See word cards with translation, language pair, date, memorization status

Search, filter, edit, delete, mark as memorized

Stats show total saved, memorized, and filtered results

Transition:
“Now I’ll hand it over to Roguin for the technical deep dive.”

🎤 PART 3 – Roguin: Technical Architecture & Development
Duration: 4–6 minutes

Architecture Overview (2 min)
Three-tier system:
(optional diagram is present in DOCS/ARCHITECTURE.md)

Frontend: React

Backend: Supabase (auth & data)

External API: Google Translate

Benefits: Scalable, maintainable, secure, high performance

Tech choices:

React with hooks for clean code

Material-UI for design consistency

Supabase for auth, database, and real-time updates

Data Flow Example (1.5 min)

User clicks word → TextReader component → API call → show popup

Save word → Supabase → real-time update in SavedWords

Security:

Row Level Security in Supabase

API keys in environment variables

Protected routes

Development Process & Challenges (1.5 min)

Agile sprints, Git branches, PRs

Solved: smart word selection, popup positioning, real-time sync, API request debouncing, cross-browser consistency




