
export interface Todo{
    id:string;
    userid:string;
    task:string;
    completed :boolean;
    createdAt:string
}

export interface TodoState{
    item: Todo[] ,
    isLoading:boolean;
    error:string | null;
}