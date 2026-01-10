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


/** -----------------------------
 * Recent Operations
 * ----------------------------- */

export type OperationType =
    | 'table_action'
    | 'table_operation'
    | 'column_action';

export type OperationName =
    | 'upload_data'
    | 'merge_tables'
    | 'aggregate'
    | 'remove_nulls'
    | 'assign_role'
    | 'calculate_days_since'
    | 'create_ratio'
    | 'log_transform'
    | 'moving_average'
    | 'remove_outliers'
    | 'create_lag';

/** Generic key-value payload for operation inputs */
export type OperationInputParameters = Record<string, unknown>;

export interface OperationExecutedBy {
    user_id: string;
    name: string;
}

/**
 * A single operation log entry
 */
export interface RecentOperation {
    operation_log_id: string;
    operation_type: OperationType;
    operation_name: OperationName;
    input_parameters: OperationInputParameters;
    executed_by: OperationExecutedBy;
    execution_timestamp: string; // ISO 8601 datetime
    affected_table: string;
    output_table_version: string | null;
}

/**
 * Recent operations grouped by project_id
 */
export type RecentOperationsByProjectId = Record<
    string,
    RecentOperation[]
>;

/** -----------------------------
 * Governance – Common Types
 * ----------------------------- */

export type GovernanceRole =
    | 'Governance Manager'
    | 'Validation Manager'
    | 'Business Owner'
    | 'Business Stakeholder'
    | 'Developer';

export interface GovernanceUser {
    user_id: string;
    name: string;
    role?: GovernanceRole;
}

export type ApprovalType =
    | 'DevCompletion'
    | 'ValidationStart'
    | 'ValidationCompletion'
    | 'ProductionApproval';

export type ApprovalStatus =
    | 'Pending'
    | 'Approved'
    | 'Rejected';

export interface GovernanceApproval {
    approval_id: string;
    approval_type: ApprovalType;
    status: ApprovalStatus;

    approver: GovernanceUser;

    requested_by?: GovernanceUser;

    created_at?: string;   // ISO 8601 datetime
    approved_at?: string;  // ISO 8601 datetime

    comments?: string | null;
}

export type ChecklistStatus =
    | 'not_started'
    | 'in_progress'
    | 'Completed';

export interface ComplianceChecklist {
    checklist_id: string;
    template_name: string;

    status: ChecklistStatus;

    completion_percentage: number;
    total_items: number;
    completed_items: number;

    assigned_to: GovernanceUser;

    completed_at?: string; // ISO 8601 datetime
}

export interface GovernanceStakeholder {
    user_id: string;
    name: string;
    role: GovernanceRole;
}

export interface ProjectGovernance {
    approvals: GovernanceApproval[];
    compliance_checklist: ComplianceChecklist | null;
    stakeholders: GovernanceStakeholder[];
}

export type GovernanceByProjectId = Record<
    string,
    ProjectGovernance
>;


/** -----------------------------
 * Table Lineage
 * ----------------------------- */

export type TableLineageParentType =
    | 'source_dataset'
    | 'derived_dataset';

export interface TableLineageEntry {
    /** Child (downstream) table name */
    child_table: string;

    /** Parent (upstream) table name */
    parent_table: string;

    /** Type of parent relationship */
    parent_type: TableLineageParentType;
}

/**
 * Table lineage grouped by project_id
 */
export type TableLineageByProjectId = Record<
    string,
    TableLineageEntry[]
>;


export interface MockData {
    project_tables: ProjectTablesByProjectId;
    recent_operations: RecentOperationsByProjectId;
    governance: GovernanceByProjectId;
    table_lineage: TableLineageByProjectId;
}
