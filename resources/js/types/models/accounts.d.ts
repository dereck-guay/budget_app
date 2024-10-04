export type Account = {
    id: number;
    user_id: number;

    title: string;
    description: string | null;
    is_main: boolean;

    created_at: string;
    updated_at: string;
};
