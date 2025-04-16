import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from '../App';
import UserDetails from '../user-details'

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<App />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default Router;
