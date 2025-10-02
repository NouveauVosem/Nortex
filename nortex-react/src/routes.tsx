import {DefaultLayout} from "./layouts/DefaultLayout"
import {Home} from "./pages/Home/Home"

export const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'about',
        element: <div>About</div>
      }
    ]
  },
]