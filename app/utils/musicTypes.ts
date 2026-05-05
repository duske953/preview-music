export interface albumTypes {
  artist: {
    id: string;
    name: string;
  };
  copywright?: string;
  id: string;
  isExplicit?: boolean;
  label?: string;
  title: string;
  release_date?: string;
  explicit_lyrics?: boolean;
  trackCounut?: number;
  error?: {
    message: string;
  };
  cover_big?: string;
  cover_medium?: string;
  cover_xl?: string;
}

export interface trackTypes {
  preview: string;
  id: string;
  title: string;
  artist: {
    id: string;
    name: string;
  };
  artistId: string;
  name: string;
  artistName: string;
  images?: { url: string }[];
  album?: {
    cover_xl?: string;
    cover_big?: string;
    cover_medium?: string;
  };
}

export interface musicMeta {
  meta: {
    returnedCount: number;
  };
}

export interface artistsType {
  id: string;
  name: string;
  picture_big?: string;
  picture_medium?: string;
  picture_xl?: string;
  images?: { url: string }[];
}
