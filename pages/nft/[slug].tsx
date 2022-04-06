import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { NFTMetadataOwner, TransactionResultWithId } from '@thirdweb-dev/sdk'
import { BigNumber } from 'ethers'

import { CollectionAPI } from 'lib/api'
import { GetServerSideProps, NextPageContext } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { urlFor } from 'sanityClient'
import { Collection } from 'tyings'

interface Props {
  collection: Collection
}

const NFTDropPage = ({ collection }: Props) => {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [loading, setLoading] = useState(true)
  const [ethPrice, setEthPrice] = useState<string>()

  const address: string | undefined = useAddress()
  const nftDrop = useNFTDrop(collection?.address)
  const connectWithMetamask = useMetamask()
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

    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()
      setEthPrice(claimConditions?.[0]?.currencyMetadata.displayValue)
    }

    fetchPrice()
  }, [nftDrop])

  const fetchNFTDropData = async () => {
    setLoading(true)
    const claimed = await nftDrop?.getAllClaimed()
    const total = await nftDrop?.totalSupply()
    if (claimed) {
      setClaimedSupply(claimed.length)
      setTotalSupply(total)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!nftDrop) return
    fetchNFTDropData()
  }, [nftDrop])

  const minNFT = async () => {
    const notification = toast.loading('Minting NFT...', {
      style: {
        background: '#0e0e0e',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })
    try {
      setLoading(true)
      if (!nftDrop || !address) return

      const quantity = 1

      const tx: TransactionResultWithId<NFTMetadataOwner>[] =
        await nftDrop.claimTo(address, quantity)

      const { receipt, id, data } = tx[0]
      toast.dismiss(notification)
      toast(
        (t) => (
          <div className="flex flex-col">
            <p>You successfully Minted!</p>
            <Link
              passHref
              href={`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`}
            >
              <a className="text-sm text-gray-200 hover:underline">
                View on Etherscan {receipt.transactionHash.substring(0, 12)} ...
              </a>
            </Link>
          </div>
        ),
        {
          duration: 10000,
          style: {
            background: 'green',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        }
      )
    } catch (err) {
      toast.dismiss(notification)

      toast.error('Unable to process.', {
        style: {
          background: 'red',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '17px',
          padding: '17px',
        },
      })
    } finally {
      setLoading(false)
      await fetchNFTDropData()
      toast.dismiss(notification)
    }
  }

  const renderMintButton = () => {
    const isBtnDisabled =
      loading || claimedSupply === totalSupply?.toNumber() || !address

    let clickAction = minNFT

    // const clickHandler =
    let btnText = `Min NFT (${ethPrice} ETH)`
    if (loading) {
      btnText = 'Loading'
    } else if (claimedSupply === totalSupply?.toNumber()) {
      btnText = 'SOLD OUT'
    } else if (!address) {
      btnText = 'Connect wallet to Mint'
    }

    return (
      <button
        className="w-full h-16 mt-10 font-bold text-white transition-colors duration-500 bg-red-500 rounded-full shadow-md hover:bg-red-400 disabled:bg-gray-300"
        disabled={isBtnDisabled}
        onClick={clickAction}
      >
        {btnText}
      </button>
    )
  }

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
            <div className="inline-flex gap-4 lg:p-10">
              {[
                'text-purple-500 ',
                'text-green-500',
                'text-red-500',
                'text-yellow-500',
                'text-blue-300',
                'text-gray-300',
              ].map((color, index) => (
                <div
                  className={`opacity-1 inline-block h-8 w-8 animate-pulse animate-bounce rounded-full bg-current ${color} border`}
                  style={{ animationDelay: `${index * 150}ms` }}
                  key={color}
                  role="status"
                >
                  {index}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Mint button */}
        {renderMintButton()}
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
