import { ColumnMetadata } from "./column-meta-data.model";

/*
 * FIXME: This is not just header meta data but Data Table metadata.
 * Rename this class later properly to indicate that
 */
export interface TableHeaderMetaData {
    columnsMetadata:Array<ColumnMetadata>
}