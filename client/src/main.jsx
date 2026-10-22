import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { store } from './store'
import { Provider } from 'react-redux';

import './styles/Reset.css'
import './styles/Global.css'
import './styles/Variables.css'
import './styles/Fonts.css'
import './styles/Typography.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
  </StrictMode>,
)
