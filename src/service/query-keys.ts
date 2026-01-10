export const queryKeys = {
    projectList: ['projectList'],
    projectDetails: (projectId: string) => ['projectDetails', projectId],
    projectTableDetails: (projectId: string) => ['projectTableDetails', projectId],
    modelList: (projectId: string) => ['modelList', projectId],
    modelDetails: (modelId: string) => ['modelDetails', modelId],
};