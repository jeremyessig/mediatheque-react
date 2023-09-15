import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewArticle from './pages/NewArticle.jsx'
import IndexArticle from './pages/IndexArticle.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //loader: rootLoader,
    children: [
      {
        path: "article/new",
        element: <NewArticle />,
      },
      {
        path: "article",
        element: <IndexArticle />,
      },
    ],
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

    </QueryClientProvider>
  </React.StrictMode>,
)
