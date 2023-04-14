import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './bricks/store/store'
import { Provider } from 'react-redux'
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App></App>
    </Provider>
  </BrowserRouter>
)
