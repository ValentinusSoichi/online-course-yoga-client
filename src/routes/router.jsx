import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Instructors from "../pages/instructor/Instructors";
import Classes from "../pages/classes/Classes";
import Home from "../pages/home/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import SingleClass from "../pages/classes/SingleClass";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import StudentCP from "../pages/dashboard/student/StudentCP";
import EnrolledClass from "../pages/dashboard/student/EnrolledClass";
import SelectedClass from "../pages/dashboard/student/SelectedClass";
import PaymentHistory from "../pages/dashboard/student/Payment/History/PaymentHistory";
import AsInstructor from "../pages/dashboard/student/apply/AsInstructor";
import Payment from "../pages/dashboard/student/Payment/History/Paying";
import Paying from "../pages/dashboard/student/Payment/History/Paying";

import InstructorCP from "../pages/instructor/InstructorCP";
import AddClass from "../pages/instructor/AddClass";
import MyClass from "../pages/instructor/MyClass";

import AdminHome from "../pages/dashboard/admin/AdminHome";
import ManageClasses from "../pages/dashboard/admin/ManageClasses";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import UpdateUser from "../pages/dashboard/admin/UpdateUser";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "instructors",
                element: <Instructors />
            },
            {
                path:"classes",
                element: <Classes />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/class/:id",
                element: <SingleClass />,
                loader: ({params})=> fetch(`https://online-course-yoga-server-e15cda602871.herokuapp.com/class/${params.id}`)
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />

            },

            {
                path: "student-cp",
                element: <StudentCP />
            },
            {
                path: "enrolled-class",
                element:<EnrolledClass />
            },
            {
                path: "my-selected",
                element: <SelectedClass />
            },
            {
                path: "my-payment",
                element: <PaymentHistory />
            }, {
                path: "apply-instructor",
                element: <AsInstructor />
            },
            {
                path: "user/payment",
                element: <Paying />
            },
            

            {
                path: "instructor-cp",
                element: <InstructorCP />
            },
            {
                path:"add-class",
                element:<AddClass/>
            },
            {
                path: "my-class",
                element: <MyClass />
            },
            


            {
                path: "admin-home",
                element: <AdminHome />
            },
            {
                path:"manage-class",
                element: <ManageClasses/>
            },
            {
                path: "manage-users",
                element: <ManageUsers />
            },
            {
                path: "update-user/:id",
                element: <UpdateUser/>,
                loader: ({params}) => fetch(`https://online-course-yoga-server-e15cda602871.herokuapp.com/users/${params.id}`)
            }



        ]
    }
    
]);

