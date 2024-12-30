
export interface ColumnMetadata  {
    name: String
    mappedBy: string;
    type: String;
    width: Number;
    booleanValue?:boolean | Array<object>;
    sortBy?:string;
}