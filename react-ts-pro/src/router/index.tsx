import { createBrowserRouter } from "react-router-dom";
import ReportDetail from '../pages/ReportDetail'
import ImageUploadComponent from "../pages/ImageUploadComponent";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ImageUploadComponent />
    }
])

export { router } 