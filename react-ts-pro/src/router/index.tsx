import { createBrowserRouter } from "react-router-dom";
import ReportDetail from '../pages/ReportDetail'
import ImageUploadComponent from "../pages/ImageUploadComponent";
import Chatbox from '../pages/Chatbox'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Chatbox />
    }
])

export { router } 