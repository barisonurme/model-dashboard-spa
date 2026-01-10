export const queryKeys = {
    projectList: ['projectList'],
    projectDetails: (projectId: string) => ['projectDetails', projectId],
    projectTableDetails: (projectId: string) => ['projectTableDetails', projectId],
    projectRecentOperations: (projectId: string) => ['projectRecentOperations', projectId],
    projectGovernance: (projectId: string) => ['projectGovernance', projectId],
    projectDataLineage: (projectId: string) => ['projectDataLineage', projectId],
};