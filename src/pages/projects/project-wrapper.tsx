import ErrorComp from "@/components/organisms/error-comp";
import LinkedTabs from "@/components/organisms/linked-tabs"
import LoadingComp from "@/components/organisms/loading-comp";
import PageHeader from "@/components/organisms/page-header"
import { ImagedBackground } from "@/layout/imaged-background";
import { layoutConfig } from "@/layout/layout-config"
import { useGetProjectDetails } from "@/service/use-queries";
import { Box } from "@mui/material";
import { Outlet, useParams } from "react-router"


const projectTabs = [
    { label: "Data Table", link: "table" },
    { label: "Recent Operations", link: "operations" },
    { label: "Governance Status", link: "governance" },
    { label: "Data Lineage", link: "lineage" },
]

const ProjectWrapper = () => {
    const { projectId } = useParams<{ projectId: string }>()

    const { data: projectDetails, isLoading, isError, refetch } = useGetProjectDetails(projectId ?? "")

    if (isLoading) {
        return (
            <ImagedBackground className="flex w-full h-full justify-center items-center">
                <LoadingComp loadingText="Loading project details" />
            </ImagedBackground>
        )
    }

    if (isError) {
        return (
            <ImagedBackground className="flex w-full h-full justify-center items-center">
                <ErrorComp errorMessage="Error occurred while loading project details" onRefetch={refetch} />
            </ImagedBackground>
        )
    }

    return (
        <Box className='flex flex-col w-full h-full'>
            <PageHeader
                title={projectDetails?.project_name}
                description={projectDetails?.objectives}
                goBackLink="/projects"
                tabSection={
                    <LinkedTabs grey tabs={projectTabs} initialTab={projectTabs[0].link} />
                }
            />
            <Box className="relative flex w-full h-full max-h-[calc(100dvh-310px)] overflow-y-hidden">
                <ImagedBackground className="flex w-full overflow-y-scroll" sx={{ padding: layoutConfig.paddings }}>
                    <Outlet context={{ projectDetails }} />
                </ImagedBackground>
            </Box>
        </Box>
    )
}

export default ProjectWrapper
