import { Header } from "@/components/header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: () => (
        <>
            <Header />
            <Outlet />
        </>
    ),
});
