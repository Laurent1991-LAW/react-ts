import { createBrowserRouter } from "react-router-dom";
import ReportDetail from '../pages/ReportDetail'

const router = createBrowserRouter([
    {
        path: '/',
        element: <ReportDetail />
    }
])

export { router } 