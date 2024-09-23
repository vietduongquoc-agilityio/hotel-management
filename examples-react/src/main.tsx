import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MarkdownEditor from './ExamLazy.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MarkdownEditor />
  </StrictMode>,
)
