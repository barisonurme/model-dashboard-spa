import { MockService } from "@/mock";

import { queryKeys } from "@/service/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectList = () => {
    return useQuery({ queryKey: queryKeys.projectList, queryFn: MockService.getProjectList });
}

export const useGetProjectDetails = (projectId: string) => {
    return useQuery({ queryKey: queryKeys.projectDetails(projectId), queryFn: () => MockService.getProjectDetails(projectId) });
}

export const useGetProjectTableDetails = (projectId: string) => {
    return useQuery({ queryKey: queryKeys.projectTableDetails(projectId), queryFn: () => MockService.getProjectTableDetails(projectId) });
}

