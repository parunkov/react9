export interface Post {
    completed: boolean;
    id: number;
    title: string;
    userId: number;
    text?: string;
    startDate?: Date;
    endDate?: Date;
}
