export declare type RequestType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    usuario?: string;
    titulo?: string;
    data?: string;
    color?: string;
};
export declare type ResponseType = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
    notes?: notes[];
};
export declare type notes = {
    notas: {
        usuario: string;
        titulo: string;
        data: string;
        color: string;
    }[];
};
