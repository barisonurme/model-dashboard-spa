import { useState } from "react";

import { useNavigate } from "react-router";

import CustomSelect from "@/components/molecules/form/custom-select";
import LoadingComp from "@/components/organisms/loading-comp"
import { useGetProjectList } from "@/service/use-queries"
import ErrorComp from "@/components/organisms/error-comp";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import { ImagedBackground } from "@/layout/imaged-background";


const ProjectsList = () => {

    const { data: projectListResponse, isLoading, isError, refetch } = useGetProjectList();
    const [selectedProject, setSelectedProject] = useState<string>(projectListResponse && projectListResponse[0]?.project_id ? projectListResponse[0].project_id : "");

    const navigate = useNavigate();

    const formattedProjectList = projectListResponse?.map(project => { return { label: project.project_name, value: project.project_id } })


    if (isLoading) return <LoadingComp loadingText="Loading projects..." />
    if (isError) return <ErrorComp errorMessage="Error occurred while loading projects" onRefetch={refetch} />


    return (
        <ImagedBackground
            className="relative flex w-full h-full justify-center items-center">
            <Card className="flex flex-col w-full max-w-2xl">
                <CardHeader title="Select Project" subheader="Please select a project to view its details." />

                <CardContent className="flex flex-col gap-2">
                    {formattedProjectList && <CustomSelect
                        label="Project"
                        fullWidth
                        value={selectedProject}
                        onChange={(e) => setSelectedProject(e.target.value as string)}
                        options={formattedProjectList} />}
                    {!formattedProjectList && <ErrorComp errorMessage="No projects found." />}
                    <Button disabled={!selectedProject} fullWidth color='inherit' variant="contained" onClick={() => navigate(`/projects/${selectedProject}`)}>View Project Details</Button>
                </CardContent>
            </Card>
        </ImagedBackground>
    )
}

export default ProjectsList


