import ErrorComp from '@/components/organisms/error-comp';
import LoadingComp from '@/components/organisms/loading-comp';
import { useGetProjectTableDetails } from '@/service/use-queries';
import { Check, Close, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import {
    Box,
    Card,
    Chip,
    Collapse,
    Icon,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { checkPointsConsts, roleColors } from '@/lib/constants/constants';
import type { ProjectTableVersion } from '@/mock/types';

const ProjectTabTable = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const [expandedTable, setExpandedTable] = useState<string | null>(null);
    const { data, isLoading, isError, refetch } = useGetProjectTableDetails(projectId!);


    if (isLoading) return <LoadingComp loadingText="Loading project details" />

    if (isError) return <ErrorComp errorMessage="Error occurred while loading project details" onRefetch={refetch} />


    // TODO: 
    // Since Mui Datagrid community version doesn't have expand feature we use our own expand
    const rows = data?.map((datum) => { return { ...datum, id: datum.project_table_id } })
    const columns = [
        { id: 'tableName', label: 'Table Name' },
        { id: 'displayName', label: 'Display Name' },
        { id: 'type', label: 'Type' },
        { id: 'version', label: 'Current Version' },
        { id: 'rows', label: 'Rows' },
        { id: 'columns', label: 'Columns' },
        { id: 'checkpoints', label: 'Checkpoints' },
    ];


    const versionColumns: GridColDef<ProjectTableVersion>[] = [
        { field: "version_number", headerName: "Version", flex: 1, renderCell: (row) => <Chip label={`v${row.value}`} variant='outlined' /> },
        { field: "created_at", headerName: "Created", flex: 1, renderCell: (row) => <div>{new Date(row.value).toLocaleDateString()}</div> },
        { field: "created_by", headerName: "Created By", flex: 1 },
        { field: "row_count", headerName: "Rows", flex: 1, renderCell: (row) => <div>{(Number(row.value).toLocaleString())}</div> },
        { field: "column_count", headerName: "Columns", flex: 1 },
        { field: "checkpoint_type", headerName: "Checkpoint", flex: 1, renderCell: (row) => row.value ? <Chip variant='outlined' icon={<Icon className='scale-50'>{checkPointsConsts[row.value as keyof typeof checkPointsConsts].icon}</Icon>} label={checkPointsConsts[row.value as keyof typeof checkPointsConsts].label} /> : <></ > },
        { field: "is_materialized", headerName: "Materialized", flex: 1, renderCell: (row => <Box>{row.value ? <Check className='scale-50' /> : <Close className='scale-50' />}</Box>) },
    ]

    return (
        <Card className='flex w-full items-start h-fit'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ backgroundColor: 'background.paper' }} />
                        {/* Table Columns */}
                        {columns.map((column) => (<TableCell sx={{ backgroundColor: 'background.paper', fontWeight: 900 }} key={column.id}>{column.label}</TableCell>))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {/* MAIN ROW */}
                    {rows?.map((row) =>
                        <Fragment key={row.id}>

                            {/* ACTUAL ROW */}
                            <TableRow>
                                <TableCell>
                                    <IconButton size="small" onClick={() => setExpandedTable(prev => prev === row.id ? null : row.id)}>
                                        {expandedTable !== row.id ? <KeyboardArrowRight /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>{row.table_name}</TableCell>
                                <TableCell>{row.display_name}</TableCell>
                                <TableCell><Chip color={row.table_type === 'source' ? 'primary' : "error"} label={row.table_type} /></TableCell>
                                <TableCell><Chip label={`v${row.versions[row.versions.length - 1].version_number}`} variant='outlined' /></TableCell>
                                <TableCell>{row.versions[row.versions.length - 1].row_count}</TableCell>
                                <TableCell>{row.columns.length}</TableCell>
                                <TableCell>{<Chip icon={<Icon className='scale-50'>{checkPointsConsts[row.versions[row.versions.length - 1].checkpoint_type as keyof typeof checkPointsConsts].icon}</Icon>} label={checkPointsConsts[row.versions[row.versions.length - 1].checkpoint_type as keyof typeof checkPointsConsts].label} />}</TableCell>
                            </TableRow>

                            {/* EXPANDED ROW */}
                            <TableRow>
                                <TableCell colSpan={8} sx={{ py: 0, backgroundColor: grey[100], borderLeft: 4, borderColor: 'divider' }}>
                                    <Collapse in={expandedTable === row.id} timeout="auto" unmountOnExit>
                                        <Box sx={{ m: 2 }}>
                                            <Typography variant='h6' marginTop={2} marginBottom={1}>Columns</Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                                {row.columns.map((column) => (
                                                    <Paper elevation={3} key={column.column_id} sx={{ p: 1, display: 'flex', alignItems: 'center', bgcolor: roleColors[column.role] + '20', borderLeft: `4px solid ${roleColors[column.role]}`, minWidth: '200px' }}>
                                                        <Box>
                                                            <Typography variant="subtitle2">
                                                                {column.display_name}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {column.column_name} • {column.data_type}
                                                            </Typography>
                                                            <Chip label={column.role} size="small" sx={{ ml: 1, bgcolor: roleColors[column.role], color: 'white', fontSize: '0.7rem' }}
                                                            />
                                                        </Box>
                                                    </Paper>
                                                ))}
                                            </Box>
                                            <Typography variant='h6' marginTop={2} marginBottom={1}>Version History</Typography>
                                            <DataGrid
                                                disableColumnMenu
                                                disableColumnResize sx={{
                                                    border: 0,
                                                    "& .MuiDataGrid-columnHeader": { backgroundColor: "transparent !important", fontWeight: 'bold' },
                                                    "& .MuiDataGrid-columnHeaders": { backgroundColor: "transparent !important", fontWeight: 'bold' },
                                                    backgroundColor: 'transparent'
                                                }}
                                                hideFooter
                                                columns={versionColumns}
                                                rows={row.versions.map((ver) => { return { ...ver, id: ver.table_version_id + ver.version_number } })} />
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>

                        </Fragment>)}
                </TableBody>
            </Table>
        </Card>

    );
};

export default ProjectTabTable;
