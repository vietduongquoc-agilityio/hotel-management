import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MarkdownEditor from './Lazy/ExamLazy.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MarkdownEditor />
  </StrictMode>,
)
