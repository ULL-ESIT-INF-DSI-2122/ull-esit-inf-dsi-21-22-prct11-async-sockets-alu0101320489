/**
 * Esquemas  de tipo para representar los elementos de formato .json a clases
 */
export declare type schemaCancion = {
    canciones: {
        nombre: string;
        autor: string;
        generos: string[];
        duracion: string;
        single: boolean;
        reproducciones: number;
    }[];
};
export declare type schemaGenero = {
    generos: {
        nombre: string;
        grupos: string[];
        artistas: string[];
        albumes: string[];
        canciones: string[];
    }[];
};
export declare type schemaGrupo = {
    grupos: {
        nombre: string;
        componentes: string[];
        año: number;
        generos: string[];
        albumes: string[];
        oyentes: number;
    }[];
};
export declare type schemaAlbum = {
    albumes: {
        nombre: string;
        autor: string;
        año: number;
        generos: string[];
        canciones: string[];
    }[];
};
export declare type schemaArtista = {
    artistas: {
        nombre: string;
        grupos: string[];
        generos: string[];
        albumes: string[];
        canciones: string[];
    }[];
};
export declare type schemaPlayList = {
    playlists: {
        nombre: string;
        autor: string;
        canciones: string[];
        duracion: string;
        generos: string[];
    }[];
};
