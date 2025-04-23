export as namespace Types

export type Note = {
    id: string;
    title: string;
    content: string;
    image_indexes: Array<number>;
    image_files: Array<File>;
}