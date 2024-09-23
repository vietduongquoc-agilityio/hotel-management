import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MarkdownEditor from './Lazy/LazyPage.tsx'
import App from './Suspense/SuspensePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MarkdownEditor />
    <App/>
  </StrictMode>,
)
