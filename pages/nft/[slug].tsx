import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { BigNumber } from 'ethers'

import { CollectionAPI } from 'lib/api'
import { GetServerSideProps, NextPageContext } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { urlFor } from 'sanityClient'
import { Collection } from 'tyings'

interface Props {
  collection: Collection
}

const NFTDropPage = ({ collection }: Props) => {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const nftDrop = useNFTDrop(collection?.address)
  const connectWithMetamask = useMetamask()
  const address: string | undefined = useAddress()
  const [loading, setLoading] = useState(true)
  const disconect = useDisconnect()

  const markAddress = () => {
    return (
      address?.substring(0, 4) +
      '.....' +
      address?.substring(address?.length - 5)
    )
  }

  useEffect(() => {
    if (!nftDrop) return

    const fetchNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)

      setLoading(false)
    }
    fetchNFTDropData()
  }, [nftDrop])

  return (
    <div className="flex flex-col h-screen lg:grid lg:grid-cols-10">
      {/* {Left} */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-purple-600">
            <img
              src={urlFor(collection.previewImage).url()}
              alt="hero-pic"
              className="object-cover w-44 rounded-xl lg:h-96 lg:w-72"
            />
          </div>
          <div className="p-5 space-y-2 text-center">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>
      {/* {Right} */}
      <div className="flex flex-col flex-1 p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <Link href="/">
            <h1 className="text-xl cursor-pointer w-52 font-extralight sm:w-80">
              The{' '}
              <span className="font-extrabold underline decoration-pink-600/50">
                NFT Drop
              </span>{' '}
              Market Place
            </h1>
          </Link>

          <button
            onClick={() => (address ? disconect() : connectWithMetamask())}
            className="px-4 py-2 text-xs font-bold text-white rounded-full bg-rose-400 lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Disconnect Wallet' : 'Connect Wallet'}
          </button>
        </header>

        <hr className="my-2 border" />
        {address && (
          <p className="text-sm text-center text-rose-400 lg:text-right">{`You're logged in with wallet ${markAddress()}`}</p>
        )}

        {/* Content */}
        <div className="flex flex-col items-center flex-1 mt-10 space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            src={urlFor(collection.mainImage).url()}
            className="object-cover pb-10 lg:h-50 w-80"
            alt=""
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>
          {loading ? (
            <p className="pt-2 text-xl text-green-500 animate-pulse">
              Loading Supply ...
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500">
              {`${claimedSupply} / ${totalSupply?.toString()} NFT's claimed`}
            </p>
          )}

          {loading && (
            <div className='inline-flex gap-4'>
              <div
                className="inline-block w-8 h-8 text-purple-500 bg-current rounded-full opacity-1 animate-pulse"
                role="status"
              />
              <div
                className="inline-block w-8 h-8 text-green-500 bg-current rounded-full opacity-1 animate-pulse"
                role="status"
              />
              <div
                className="inline-block w-8 h-8 text-red-500 bg-current rounded-full opacity-1 animate-pulse"
                role="status"
              />
              <div
                className="inline-block w-8 h-8 text-yellow-500 bg-current rounded-full opacity-1 animate-pulse"
                role="status"
              />
              <div
                className="inline-block w-8 h-8 text-blue-300 bg-current rounded-full opacity-1 animate-pulse"
                role="status"
              />
              <div
                className="inline-block w-8 h-8 text-gray-300 bg-current rounded-full opacity-1 animate-pulse"
                role="status"
              />
            </div>
          )}
        </div>
        {/* Mint button */}
        <button className="w-full h-16 mt-10 font-bold text-white transition-colors duration-500 bg-red-500 rounded-full shadow-md hover:bg-red-400">
          Mint NFT (0.01 ETH)
        </button>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const collection = await CollectionAPI.findCollectionBySlug(params?.slug)

  return {
    props: {
      collection,
    },
  }
}
