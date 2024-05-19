import { ReactElement } from "react";
import EventBoard from "../pages/event-board-page/EventBoard";
import Registration from "../pages/event-registration-page/Registration";
import Participants from "../pages/event-participants-page/Participants";
import ErrorPage from "../pages/error-page/ErrorPage";

interface Route {
    path: string;
    name: string;
    element: ReactElement;
}

export const EventsBoardPage: Route = {
    path: "/",
    name: "Events board page",
    element: <EventBoard />,
};

export const EventRegistrationPage: Route = {
    path: "/register/:eventId",
    name: "Event registration page",
    element: <Registration />,
};

export const EventParticipantsPage: Route = {
    path: "/participants/:eventId",
    name: "Event participants page",
    element: <Participants/>,
};

export const ErrorRoute = {
    path: "/error",
    name: "Error",
    element: <ErrorPage />,
}


export const routes: Route[] = [
    EventsBoardPage,
    EventRegistrationPage,
    EventParticipantsPage,
    ErrorRoute
];
