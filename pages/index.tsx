import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
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
      <div className="py-20 px-28">
        <h3 className="text-2xl font-semibold text-white">Collections</h3>
        <div className="flex mt-4">
          <div className="flex flex-col gap-2 p-2 bg-gray-600 rounded-xl">
            <img
              src="https://links.papareact.com/bdy"
              alt="collection"
              className="object-cover h-48 rounded-lg w-72"
            />
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-white cursor-pointer ">
                The Some Ape
              </h1>
              <Link href={`/nft/test`}>
                <button
                  type="button"
                  className="px-2 py-1 bg-pink-300 rounded-full"
                >
                  See more
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* className="flex-1 text-5xl font-extrabold text-transparent bg-gradient-to-br from-pink-400 to-purple-600 bg-clip-text" */}
    </div>
  )
}

export default Home
