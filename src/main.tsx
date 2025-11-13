import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass',
    })
    console.log('%c[MSW] Mock API enabled', 'color: #66cdaa')
  }
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root')!)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
