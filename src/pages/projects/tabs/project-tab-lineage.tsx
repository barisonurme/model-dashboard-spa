import ErrorComp from "@/components/organisms/error-comp";
import LoadingComp from "@/components/organisms/loading-comp";
import { useGetProjectTableDetails, useGetProjectTableLineage } from "@/service/use-queries";
import { useState } from "react";
import { useParams } from "react-router";
import { Paper, Box, Typography, Chip, Tooltip, Stack, Divider } from '@mui/material';
import { ArrowForward, TableChart } from '@mui/icons-material';

// ----------------------------------------------------------------------

const ProjectTabLineage = () => {
    const { projectId } = useParams<{ projectId?: string }>()
    const { data: lineage, isLoading: isLineageLoading, isError: isLineageError, refetch: lineageRefetch } = useGetProjectTableLineage(projectId ?? "")
    const { data: table, isLoading: isTableLoading, isError: isTableError, refetch: tableRefetch } = useGetProjectTableDetails(projectId ?? "")

    const [selectedTable, setSelectedTable] = useState<string | null>(null);


    const refetchHandler = () => {
        if (isLineageError) lineageRefetch();
        if (isTableLoading) tableRefetch();
    }

    // Get dependencies for a table
    const getDependencies = (tableName: string) => {
        if (!Array.isArray(lineage)) return;

        return lineage?.filter(l => l.child_table === tableName).map(l => l.parent_table);
    };

    const isSourceForSelected = (tableName: string) => {
        if (!selectedTable) return false;
        const deps = getDependencies(selectedTable);
        return deps?.includes(tableName);
    };

    const isDependentOfSelected = (tableName: string) => {
        if (!selectedTable) return false;
        const deps = getDependencies(tableName);
        return deps?.includes(selectedTable);
    };

    if (isLineageLoading || isTableLoading) return <LoadingComp loadingText="Loading project details" />

    if (isLineageError || isTableError) return <ErrorComp errorMessage="Error occurred while loading project details" onRefetch={refetchHandler} />

    // Separate source and derived tables
    const sourceTables = table?.filter(t => t.table_type === 'source');
    const derivedTables = table?.filter(t => t.table_type === 'derived');


    return (
        <Paper elevation={4} sx={{ p: 3, mt: 2 }} className="flex flex-col w-full h-fit">
            <Typography variant="h6" gutterBottom>Data Lineage</Typography>
            <Divider className='mb-4! pt-1' />

            <Box sx={{ display: 'flex', gap: 4, minHeight: '300px' }}>
                {/* Source Tables Column */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                        Source Tables
                    </Typography>
                    <Stack spacing={2}>
                        {sourceTables?.map((table) => (
                            <Tooltip key={table.project_table_id} title="Click to highlight dependencies">
                                <Paper
                                    onClick={() => setSelectedTable(table.table_name)}
                                    sx={{
                                        p: 2,
                                        cursor: 'pointer',
                                        border: '2px solid',
                                        borderColor: isSourceForSelected(table.table_name) ? '#4caf50' :
                                            selectedTable === table.table_name ? '#2196f3' : 'transparent',
                                        bgcolor: selectedTable === table.table_name ? '#e3f2fd' :
                                            isSourceForSelected(table.table_name) ? '#e8f5e9' : '#f5f5f5',
                                        '&:hover': { bgcolor: '#e8f4fd' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <TableChart fontSize="small" />
                                        <Typography variant="subtitle2">
                                            {table.display_name}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label="Source"
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Typography variant="caption" display="block" color="text.secondary">
                                        {table.table_name}
                                    </Typography>
                                </Paper>
                            </Tooltip>
                        ))}
                    </Stack>
                </Box>

                {/* Center with Arrows */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minWidth: '100px'
                }}>
                    <ArrowForward sx={{
                        fontSize: 40,
                        color: '#757575',
                        transform: 'rotate(0deg)'
                    }} />
                </Box>

                {/* Derived Tables Column */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="secondary" gutterBottom>
                        Derived Tables
                    </Typography>
                    <Stack spacing={2}>
                        {derivedTables?.map((table) => {
                            const dependencies = getDependencies(table.table_name) ?? [];

                            return (
                                <Tooltip
                                    key={table.project_table_id}
                                    title={
                                        dependencies.length > 0 ?
                                            `Depends on: ${dependencies.join(', ')}` :
                                            'No dependencies'
                                    }
                                >
                                    <Paper
                                        onClick={() => setSelectedTable(table.table_name)}
                                        sx={{
                                            p: 2,
                                            cursor: 'pointer',
                                            border: '2px solid',
                                            borderColor: isDependentOfSelected(table.table_name) ? '#4caf50' :
                                                selectedTable === table.table_name ? '#2196f3' : 'transparent',
                                            bgcolor: selectedTable === table.table_name ? '#e3f2fd' :
                                                isDependentOfSelected(table.table_name) ? '#e8f5e9' : '#f5f5f5',
                                            '&:hover': { bgcolor: '#e8f4fd' }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <TableChart fontSize="small" />
                                            <Typography variant="subtitle2">
                                                {table.display_name}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label="Derived"
                                            size="small"
                                            color="secondary"
                                            variant="outlined"
                                        />
                                        <Typography variant="caption" display="block" color="text.secondary">
                                            {table.table_name}
                                        </Typography>

                                        {dependencies.length > 0 && (
                                            <Box sx={{ mt: 1 }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    From: {dependencies.join(', ')}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Paper>
                                </Tooltip>
                            );
                        })}
                    </Stack>
                </Box>
            </Box>

            {/* Legend */}
            <Box sx={{
                mt: 3,
                p: 2,
                bgcolor: '#f5f5f5',
                borderRadius: 1,
                display: 'flex',
                gap: 3
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: '#2196f3', borderRadius: '2px' }} />
                    <Typography variant="caption">Selected Table</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: '#4caf50', borderRadius: '2px' }} />
                    <Typography variant="caption">Related Tables</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, border: '2px solid #2196f3', borderRadius: '2px' }} />
                    <Typography variant="caption">Source Tables</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 16, height: 16, border: '2px solid #9c27b0', borderRadius: '2px' }} />
                    <Typography variant="caption">Derived Tables</Typography>
                </Box>
            </Box>
        </Paper >
    )
}

export default ProjectTabLineage