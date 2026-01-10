import { mockData, projectsMockData } from "./mock-data";
import type { ProjectTable, TProject, TProjectsResponseFormatted } from "./types";


export const getProjectList = (): Promise<TProjectsResponseFormatted[]> => {
    const projectList = projectsMockData.map(project => ({ project_id: project.project_id, project_name: project.project_name }));

    return new Promise<TProjectsResponseFormatted[]>((resolve) => {
        setTimeout(() => {
            resolve(projectList);
        }, 1500);
    });
};

export const getProjectDetails = (projectId: string): Promise<TProject | undefined> => {

    // TODO: Type assertion for mocked data
    const project = projectsMockData.find((p) => p.project_id === projectId) as TProject | undefined;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(project);
        }, 1500);
    });
};



export const getProjectTableDetails = (projectId: string): Promise<ProjectTable[] | undefined> => {

    // TODO: Type assertion for mocked data
    const project = mockData.project_tables[projectId] as ProjectTable[] | undefined;


    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(project);
        }, 300);
    });
};
