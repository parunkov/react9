export interface IPost {
    completed: boolean;
    id: number;
    title: string;
    userId?: number;
    text?: string;
    startDate?: Date;
    endDate?: Date;
    jobArea?: string;
    jobDescriptor?:string;
    onChange?: (id: number, value: boolean) => void;
}
