import { useNavigate, useParams, useLocation } from "react-router";
import CustomSelect from "@/components/molecules/form/custom-select"
import { Box, Typography } from "@mui/material"
import { useGetProjectList } from "@/service/use-queries";

export const SelectProject = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = useParams<{ projectId?: string }>();

    const { data } = useGetProjectList();

    // ----------------------------------------------------------------------

    const projectChangeHandler = (newProjectId: unknown) => {
        if (typeof newProjectId !== "string") return;

        navigate(location.pathname.replace(projectId ?? "", newProjectId), { replace: true });
    };

    if (!data || !projectId) return null;

    return (
        <Box display="flex" maxWidth={450} minWidth={450} marginLeft="auto" alignItems="center" gap={2}>
            <Typography variant="body2" fontWeight={600} sx={{ marginBottom: 0.5, color: "primary.main" }}>
                Project
            </Typography>
            <CustomSelect
                options={data.map(project => ({
                    label: project.project_name,
                    value: project.project_id,
                }))}
                value={projectId}
                fullWidth
                onChange={(e) => projectChangeHandler(e.target.value)}
            />
        </Box>
    );
};


export default SelectProject