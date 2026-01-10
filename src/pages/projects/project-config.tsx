import type { RouteObject } from "react-router";
import ProjectWrapper from "./project-wrapper";
import ProjectsList from "./projects-list";
import ProjectTabTable from "./tabs/project-tab-table";
import ProjectTabOperations from "./tabs/project-tab-operations";
import ProjectTabGovernance from "./tabs/project-tab-governance";
import ProjectTabLineage from "./tabs/project-tab-lineage";

// ----------------------------------------------------------------------

export const projectConfig: RouteObject[] = [
    {
        path: "projects",
        element: <ProjectsList />
    },
    {
        path: "projects/:projectId",
        element: <ProjectWrapper />,
        children: [
            { path: "table", element: <ProjectTabTable />, handle: { label: "Table" } },
            { path: "operations", element: <ProjectTabOperations />, handle: { label: "Operations" } },
            { path: "governance", element: <ProjectTabGovernance />, handle: { label: "Governance" } },
            { path: "lineage", element: <ProjectTabLineage />, handle: { label: "Lineage" } },
        ],
    }]