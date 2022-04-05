import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { CollectionAPI } from 'lib/api'
import { client, urlFor } from 'sanityClient'
import { Collection } from 'tyings'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <div className="min-h-screen bg-[#191919]">
      <Head>
        <title>NFT Drop challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="to-[#3d2a54 rounded-b-[350px] bg-gradient-to-br from-[#313d5c] px-28 pb-32 pt-20">
        <h1 className="flex-1 text-5xl font-extrabold text-purple-400 ">
          Welcome to the NFT Marketplace
        </h1>
        <h2 className="mt-8 text-3xl text-pink-200 indent-2">
          Buy and Sell NFTs with no limit.
        </h2>
      </div>
      <div className="flex flex-col items-center py-20 px-28">
        <h3 className="text-4xl font-extrabold text-center text-transparent text-white w-fit animate-pulse bg-gradient-to-br from-red-300 to-blue-500 bg-clip-text">
          Collections
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          {collections.map((collection) => (
            <div className="flex flex-col items-center gap-2 p-2 bg-gray-600 w-80 rounded-xl" key={collection._id}>
              <img
                src={urlFor(collection.mainImage).url()}
                alt="collection"
                className="object-cover h-48 rounded-lg w-72"
              />
              <div className="flex flex-col w-full">
                <h1 className="font-semibold text-white cursor-pointer ">
                  {collection.title}
                </h1>
                <p className="text-sm text-gray-400 truncate max-h-10">
                  {collection.description}
                </p>
              </div>

              <Link href={`/nft/${collection.slug.current}`}>
                <button
                  type="button"
                  className="w-full px-2 py-1 text-sm text-white transition-colors bg-pink-300 rounded-lg hover:bg-white hover:text-pink-300"
                >
                  See more
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const collections = await CollectionAPI.findAllCollection()

  return {
    props: {
      collections,
    },
  }
}
