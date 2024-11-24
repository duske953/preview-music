export interface albumTypes {
  artistName: string;
  copywright: string;
  id: string;
  isExplicit: boolean;
  label: string;
  name: string;
  released: string;
  trackCounut: number;
  contributingArtists: {
    mainArtist: string;
    primaryArtist: string;
  };
}

export interface trackTypes {
  previewURL: string;
  artistId: string;
  name: string;
  artistName: string;
}

export interface musicMeta {
  meta: {
    returnedCount: number;
  };
}
