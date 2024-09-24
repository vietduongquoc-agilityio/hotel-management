import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MarkdownEditor from './Lazy/LazyPage.tsx'
import App from './Suspense/SuspensePage.tsx'
import ContextPage from './Context/ContextApp.tsx'
import AppDL from './Context/ExApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MarkdownEditor />
    <App/>
    <ContextPage />
    <AppDL />
  </StrictMode>,
)
