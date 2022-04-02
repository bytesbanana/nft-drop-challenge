export interface Slug {
  current: string;
}

export interface Asset {
  _ref: string;
  _type: string;
}

export interface Image {
  asset: Asset;
}

export interface Slug {
  current: string;
}

export interface Collection {
  _id: string;
  address: string;
  creator: Creator;
  description: string;
  mainImage: Image;
  nftCollectionName: string;
  previewImage: Image;
  slug: Slug;
  title: string;
}

export interface Creator {
  _id: string;
  address: string;
  name: string;
  slug: Slug;
}
