export type TProjectsResponse = {
    projects: TProject[];
}

export type TProjectsResponseFormatted = {
    project_id: string;
    project_name: string;
}

export type TProject = {
    project_id: string;
    project_name: string;
    project_type: ProjectType;
    status: ProjectStatus;
    owner: TUser;
    governance_manager: TUser | null;
    department: TDepartment;
    is_segmented: boolean;
    objectives: string;
    created_at: string; // ISO 8601 datetime
    updated_at: string; // ISO 8601 datetime
}

export type TUser = {
    user_id: string;
    name: string;
    title: string;
}

export type TDepartment = {
    department_id: string;
    name: string;
}

export type ProjectType =
    | "ML"
    | "TimeSeries"
    | "Scorecard"
    | "AI";

export type ProjectStatus =
    | "Active"
    | "Review"
    | "Approved"
    | "Draft"
    | "Locked";


export type TableColumnRole =
    | 'lookup'
    | 'time_id'
    | 'exog'
    | 'endog'
    | 'not_used';

export type TableColumnDataType =
    | 'string'
    | 'numeric'
    | 'categorical'
    | 'datetime'
    | 'boolean';

export interface ProjectTableColumn {
    column_id: string;
    column_name: string;
    display_name: string;
    data_type: TableColumnDataType;
    role: TableColumnRole;
}


export type CheckpointType =
    | 'raw_upload'
    | 'user_manual'
    | 'development_gate'
    | 'validation_gate'
    | 'production'
    | null;

export interface ProjectTableVersion {
    table_version_id: string;
    version_number: number;
    row_count: number;
    column_count: number;
    is_materialized: boolean;
    checkpoint_type: CheckpointType;
    checkpoint_name?: string;
    parent_version_id?: string | null;
    created_at: string; // ISO date
    created_by: string;
}
export type ProjectTableType = 'source' | 'derived';

export interface ProjectTable {
    project_table_id: string;
    table_name: string;
    display_name: string;
    table_type: ProjectTableType;
    current_version_id: string;
    versions: ProjectTableVersion[];
    columns: ProjectTableColumn[];
}


export type ProjectTablesByProjectId = Record<
    string,
    ProjectTable[]
>;

