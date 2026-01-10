import Middleware from "@/middleware/middleware";
import { projectConfig } from "@/pages/projects/project-config";

import type { RouteObject } from "react-router";



export const routerConfig: RouteObject[] & { handle?: { label: string } } = [
    {
        path: "/",
        element: <Middleware />,
        children: [
            // ----------------------------------------------------------------------

            ...projectConfig

            // ----------------------------------------------------------------------

        ]
    }
]