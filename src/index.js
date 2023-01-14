import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/Root";
import Index from "./routes/Index";
import {
  fetchParkingLots,
  fetchParkingLotComment,
  fetchParkingLotDetail,
  saveRating,
  deleteComment,
  saveComment,
  fetchAllComments,
} from "./api";
import "bootstrap/dist/css/bootstrap.css";
import Detail from "./routes/Detail";
import LeaveRating from "./routes/LeaveRating";
import { toast } from "react-toastify";
import RatingPage from "./routes/RatingPage";
import CommentPage from "./routes/CommentPage";
import Contact from "./routes/Contact";
import Admin from "./routes/Admin";
import ErrorPage from "./ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />,
        loader() {
          return fetchParkingLots();
        },
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/admin",
        loader() {
          return fetchAllComments();
        },
        element: <Admin />,
      },
      {
        path: "/parkingLots/:id",
        loader({ params }) {
          return fetchParkingLotDetail(params.id);
        },
        element: <Detail />,
        children: [
          {
            path: "/parkingLots/:id/ratings",
            loader({ params }) {
              return fetchParkingLotDetail(params.id);
            },
            element: <RatingPage />,
            children: [
              {
                path: "/parkingLots/:id/ratings/comments",
                loader({ params }) {
                  return fetchParkingLotComment(params.id);
                },
                element: <CommentPage />,
              },
            ],
          },
          {
            path: "/parkingLots/:id/ratings/new",
            element: <LeaveRating />,
            loader({ params }) {
              return fetchParkingLotDetail(params.id);
            },
            action({ request, params }) {
              return request.formData().then((formData) => {
                // console.log(parseInt(formData.get("rating")));
                if (formData.get("comment") !== "") {
                  // if there is comment, call save comment function
                  saveComment(formData.get("comment"), params.id).then(() => {
                    toast.success("Your comment have been posted.");
                  });
                }
                return saveRating(
                  params.id,
                  parseFloat(formData.get("origrating")),
                  parseInt(formData.get("numrating")),
                  parseInt(formData.get("rating"))
                ).then(() => {
                  toast.success("You have successfully submitted the rating.");
                  return redirect(`/parkingLots/${params.id}/ratings`);
                });
              });
            },
          },
        ],
      },
      {
        path: "/comments/:commentId/destroy",
        action({ request, params }) {
          // console.log(params.commentId);
          return request.formData().then((formData) => {
            return deleteComment(params.commentId).then(() => {
              toast.success("Your comment has been deleted");
              const parkingLotId = formData.get("parkingLotId");
              return redirect(`/parkingLots/${parkingLotId}/ratings/comments`);
            });
          });
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
