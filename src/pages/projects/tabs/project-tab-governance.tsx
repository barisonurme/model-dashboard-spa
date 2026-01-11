import ErrorComp from "@/components/organisms/error-comp"
import LoadingComp from "@/components/organisms/loading-comp"
import { useGetProjectGovernance } from "@/service/use-queries"
import { Checklist, Gavel, Pending, Person } from "@mui/icons-material";
import { Avatar, Box, Chip, Divider, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { useParams } from "react-router"
import { Fragment } from "react/jsx-runtime";

// ----------------------------------------------------------------------

// Helper function for avatar colors based on role
const getAvatarColor = (role: string) => {
    const colors = {
        'Business Owner': 'success.main',
        'Governance Manager': 'info.main',
        'Developer': 'warning.main',
        'Validation Manager': 'error.light',
        'Business Stakeholder': 'error.main'
    };
    return colors[role as keyof typeof colors] || '#757575';
};

const ProjectTabGovernance = () => {

    const { projectId } = useParams<{ projectId?: string }>()
    const { data, isLoading, isError, refetch } = useGetProjectGovernance(projectId ?? "")

    const pendingApprovals = data?.approvals?.filter(a => a.status === 'Pending') || [];
    const approvalsNotPending = data?.approvals?.filter(a => a.status !== 'Pending') || [];
    console.log('approvalsNotPending :', approvalsNotPending);


    if (isLoading) return <LoadingComp loadingText="Loading project details" />

    if (isError) return <ErrorComp errorMessage="Error occurred while loading project details" onRefetch={refetch} />

    return (
        <Box sx={{ p: 2 }} className='flex flex-col w-full h-fit z-1 gap-2'>

            {/* 
            *
            * PENDING APPROVALS
            *
            */}
            <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Gavel /> Pending Approvals ({pendingApprovals.length})</Typography>
            <Paper elevation={4} sx={{ p: 2, backgroundColor: 'background.paper' }} className='flex flex-col w-full h-fit z-1'>
                <Box>
                    {pendingApprovals.length > 0 && (
                        <List>
                            {pendingApprovals.map((approval) => (
                                <ListItem
                                    key={approval.approval_id}
                                    sx={{
                                        bgcolor: '#fff8e1',
                                        mb: 1,
                                        borderRadius: 1
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#ff9800' }}>
                                            <Pending />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={approval.approval_type}
                                        secondary={<>
                                            <Typography component="span" variant="body2">Approver: {approval.approver?.name}</Typography>
                                            <br />
                                            <Typography component="span" variant="caption" color="text.secondary">Requested: {approval.created_at ? new Date(approval.created_at).toLocaleDateString() : "--"}</Typography>
                                        </>} />
                                    <Chip label="Pending" color="warning" size="small" />
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {!pendingApprovals.length && <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>No pending approvals </Typography>}
                </Box>
            </Paper>

            {/* 
            *
            * APPROVALS
            *
            */}
            <Typography variant="subtitle1" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}><Gavel />Approvals ({approvalsNotPending.length})</Typography>
            <Paper elevation={4} sx={{ p: 2, backgroundColor: 'background.paper' }} className='flex flex-col w-full h-fit z-1'>
                <Box>
                    {approvalsNotPending.length > 0 && (
                        <List>
                            {approvalsNotPending.map((approval) => (
                                <ListItem
                                    key={approval.approval_id}
                                    sx={{
                                        bgcolor: approval.status === "Approved" ? "success.lighter" : "error.lighter",
                                        mb: 1,
                                        borderRadius: 1
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: approval.status === "Approved" ? "success.main" : "error.main" }}>
                                            <Pending />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={approval.approval_type}
                                        secondary={<>
                                            <Typography component="span" variant="body2">Approver: {approval.approver?.name}</Typography>
                                            <br />
                                            <Typography component="span" variant="caption" color="text.secondary">Approved at: {approval.approved_at ? new Date(approval.approved_at).toLocaleDateString() : "--"}</Typography>
                                        </>} />
                                    <Chip label={approval.status} color={approval.status === "Approved" ? "success" : "error"} size="small" />
                                </ListItem>
                            ))}
                        </List>
                    )}
                    {!approvalsNotPending.length && <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>No approvals </Typography>}
                </Box>
            </Paper>

            {/* 
            *
            * CHECKLIST
            *
            */}
            <Typography variant="subtitle1" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}><Checklist /> Compliance Checklist</Typography>
            <Paper elevation={4} sx={{ p: 2, backgroundColor: 'background.paper', }} className='flex flex-col w-full h-fit z-1'>
                {data?.compliance_checklist && (
                    <Box>
                        <Paper elevation={4} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="body2">{data?.compliance_checklist.template_name}</Typography>
                                <Chip label={`${data?.compliance_checklist.completion_percentage}%`} color={data?.compliance_checklist.completion_percentage === 100 ? "success" : "primary"} size="small" />
                            </Box>

                            <LinearProgress variant="determinate" value={data?.compliance_checklist.completion_percentage} sx={{ height: 8, borderRadius: 4, mb: 1 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="caption" color="text.secondary">
                                    {data?.compliance_checklist.completed_items} of {data?.compliance_checklist.total_items} items
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Assigned to: {data?.compliance_checklist.assigned_to?.name}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                )}
                {!data?.compliance_checklist && <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>No compliance checklist </Typography>}

            </Paper>

            {/* 
            *
            * STAKEHOLDERS
            *
            */}
            <Typography variant="subtitle1" sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}><Person /> Stakeholders</Typography>
            <Paper elevation={4} sx={{ p: 2, backgroundColor: 'background.paper' }} className='flex flex-col w-full h-fit z-1'>
                <Box>
                    <List>
                        {data?.stakeholders?.map((stakeholder, index) => (
                            <Fragment key={stakeholder.user_id}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: getAvatarColor(stakeholder.role) }}>
                                            {stakeholder.name.split(' ').map(n => n[0]).join('')}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={stakeholder.name}
                                        secondary={stakeholder.role}
                                    />
                                    <Chip
                                        label={stakeholder.role}
                                        size="small"
                                        variant="outlined"
                                    />
                                </ListItem>
                                {index < data.stakeholders.length - 1 && <Divider variant="inset" component="li" />}
                            </Fragment>
                        ))}
                    </List>
                </Box>
            </Paper>
        </Box>
    )
}

export default ProjectTabGovernance