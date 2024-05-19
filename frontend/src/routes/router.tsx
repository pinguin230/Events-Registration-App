import { createBrowserRouter } from "react-router-dom";
import { routes } from "./index";
import Layout from "../pages/layout/layout";
import ErrorPage from "../pages/error-page/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: routes.map(({ path, element }) => ({
            path,
            element
        }))
    }
],
    {
        basename: "/Events-Registration-App"
    });
