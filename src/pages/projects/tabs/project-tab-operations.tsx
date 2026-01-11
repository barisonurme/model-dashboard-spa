import ErrorComp from "@/components/organisms/error-comp"
import LoadingComp from "@/components/organisms/loading-comp"
import NoDataComp from "@/components/organisms/no-data-comp"
import { useGetProjectRecentOperations } from "@/service/use-queries"
import Timeline from "@mui/lab/Timeline"
import TimelineConnector from "@mui/lab/TimelineConnector"
import TimelineContent from "@mui/lab/TimelineContent"
import TimelineDot from "@mui/lab/TimelineDot"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material"
import { useParams } from "react-router"

// ----------------------------------------------------------------------

const ProjectTabOperations = () => {
    const { projectId } = useParams<{ projectId?: string }>()
    const { data, isLoading, isError, refetch } = useGetProjectRecentOperations(projectId ?? "")

    if (isLoading) return <LoadingComp loadingText="Loading project details" />

    if (isError) return <ErrorComp errorMessage="Error occurred while loading project details" onRefetch={refetch} />

    return (
        <Box className='flex w-full h-full justify-start items-start'>
            <Timeline className="flex w-full justify-start items-start">
                {!data?.length && <Box className='flex w-full p-24'><NoDataComp onRefetch={refetch} /></Box>}
                {data?.map((datum, index) => {
                    const isLastIndex = data.length - 1 === index
                    return <TimelineItem className="flex w-full" key={datum.operation_log_id}>
                        <TimelineOppositeContent className="w-12 max-w-12">{datum.execution_timestamp ? new Date(datum.execution_timestamp).toLocaleDateString() : "--"}</TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot sx={{ backgroundColor: 'primary.main' }} />
                            {!isLastIndex && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent className="flex w-full">
                            <Card className="flex flex-col w-full">
                                <CardHeader title={datum.affected_table} subheader={datum.output_table_version} />
                                <CardContent className="flex flex-col gap-2">
                                    <Box className='flex gap-2'>
                                        <Typography>{datum.operation_name}</Typography>
                                        <Typography>{datum.operation_type}</Typography>
                                        <Typography>{datum.executed_by.name}</Typography>
                                    </Box>
                                    <Divider />

                                    <Typography component="div">
                                        {Object.entries(datum.input_parameters as Record<string, string>).map(([key, value], index, arr) => (<span key={key}><strong>{key}</strong>: {value}{index < arr.length - 1 && ", "}</span>))}
                                    </Typography>
                                </CardContent>
                            </Card></TimelineContent>
                    </TimelineItem>
                })}
            </Timeline>
        </Box>
    )
}

export default ProjectTabOperations