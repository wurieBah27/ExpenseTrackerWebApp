import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Applayout from "./components/Applayout";
import NewTransaction from "./pages/NewTransaction";
import Category from "./pages/Category";
import Account from "./pages/Account";
import Transactions from "./pages/Transactions";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";

const routes = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignInPage />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/new-transaction",
        element: <NewTransaction />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={routes} />

      <Toaster
        position="top-center"
        gutter={12}
        reverseOrder={false}
        containerStyle={{ margin: "8px", padding: "10px 20px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 10000,
          },

          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f7f7f7",
            color: "#222222",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
