import {Home} from "./pages/Home/Home"
import DefaultLayout from "./layouts/DefaultLayout"

export const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <div>Profile</div>
      }
    ]
    
  },
]