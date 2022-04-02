import { client } from '../../sanityClient'

const CollectionAPI = {
  findAllCollection: async () => {
    const query = `	*[_type == "collection"]{
											_id,
                    title,
                    address,
                    description,
                    nftCollectionName,
                    mainImage{
                      asset
                    },
                    previewImage{
                      asset
                    },
                    slug{
                      current
                    },
                    creator-> {
                    _id,
                      name,
                      address,
                      slug{
                        current
                      }
                    }
                  }
		`
    return await client.fetch(query)
  },
  async findCollectionBySlug(slug) {
    const query = `
    *[_type == "collection" && slug.current == $slug]{
      _id,
      title,
      address,
      description,
      nftCollectionName,
      mainImage{
        asset
      },
      previewImage{
        asset
      },
      slug{
        current
      },
      creator-> {
      _id,
        name,
        address,
        slug{
          current
        }
      }
    }
    `
    const collections = await client.fetch(query, {
      slug,
    })

    if (collections.length === 1) return collections[0]
    return null
  },
}
export default CollectionAPI
