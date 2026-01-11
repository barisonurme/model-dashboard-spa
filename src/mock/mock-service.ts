import { mockData, projectsMockData } from "./mock-data";
import type { ProjectGovernance, ProjectTable, RecentOperation, TableLineageEntry, TProject, TProjectsResponseFormatted } from "./types";


// PROJECT LIST | Mock Service
export const getProjectList = (): Promise<TProjectsResponseFormatted[]> => {
    const projectList = projectsMockData.map(project => ({ project_id: project.project_id, project_name: project.project_name }));

    return new Promise<TProjectsResponseFormatted[]>((resolve) => {
        setTimeout(() => {
            resolve(projectList);
        }, 1500);
    });
};

// PROJECT DETAILS | Mock Service
export const getProjectDetails = (projectId: string): Promise<TProject | null> => {

    // TODO: Type assertion for mocked data
    const project = projectsMockData.find((p) => p.project_id === projectId) as TProject | undefined;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(project || null);
        }, 1500);
    });
};

// PROJECT TABLE DETAILS | Mock Service
export const getProjectTableDetails = (projectId: string): Promise<ProjectTable[] | null> => {

    // TODO: Type assertion for mocked data
    const project = mockData.project_tables[projectId] as ProjectTable[] | undefined;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(project || null);
        }, 300);
    });
};

// PROJECT TABLE DETAILS | Mock Service
export const getProjectRecentOperations = (projectId: string): Promise<RecentOperation[] | null> => {

    // TODO: Type assertion for mocked data
    const project = mockData.recent_operations[projectId] as RecentOperation[] | undefined;


    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(project || null);
        }, 300);
    });
};

// PROJECT TABLE DETAILS | Mock Service
export const getProjectGovernance = (projectId: string): Promise<ProjectGovernance | null> => {

    // TODO: Type assertion for mocked data
    const project = mockData.governance[projectId] as ProjectGovernance | undefined;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(project || null);
        }, 300);
    });
};

// PROJECT TABLE DETAILS | Mock Service
export const getProjectTableLineage = (projectId: string): Promise<TableLineageEntry[] | null> => {

    // TODO: Type assertion for mocked data
    const project = mockData.table_lineage[projectId] as TableLineageEntry[] | undefined;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(project || null);
        }, 300);
    });
};
