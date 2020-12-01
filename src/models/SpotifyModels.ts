export interface SpotifyAuthRequest {
    client_id: string;
    response_type: string;
    redirect_uri: string;
    scope?: string;
    state?: string;
    show_dialog?: boolean;
}

export interface SpotifyTokenRequest {
    grant_type: string;
    code: string;
    redirect_uri: string;
    client_id: string;
    client_secret: string;
}

export interface SpotifyRefreshTokenRequest {
    grant_type: string;
    refresh_token: string;
    client_id: string;
    client_secret: string;
}

export interface SpotifySavedSongsRequest {
    offset: number;
    limit: number;
}

export interface SpotifyPlayRequest {
    uris: string[];
    position_ms: number;
    device_id: string;
}

export interface SpotifySong {
    added_at: Date;
    track: SpotifyTrack;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    uri: string;
    href: string;
    type: string;
    duration_ms: number;
    is_random? : boolean;
    is_saved?: boolean;
}

export interface SpotifyAlbum {
    id: string;
    album_type: string;
    uri: string;
    images: SpotifyImage[]
}

export interface SpotifyArtist {
    id: string;
    name: string;
    uri: string;
    type: string;
}

export interface SpotifyImage {
    height: number;
    width: number;
    url: string;
}

export interface SpotifyTrackListPagination {
    hasNext: boolean;
    hasPrevious: boolean;
    total: number;
    offset: number;
}
