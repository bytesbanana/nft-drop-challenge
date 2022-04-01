import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

const NFTDropPage = (props: any) => {
  const connectWithMetamask = useMetamask()
  const address: string | undefined = useAddress()
  const disconect = useDisconnect()

  const markAddress = () => {
    return (
      address?.substring(0, 4) +
      '.....' +
      address?.substring(address?.length - 5)
    )
  }

  return (
    <div className="flex flex-col h-screen lg:grid lg:grid-cols-10">
      {/* {Left} */}
      <div className="bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="p-2 bg-gradient-to-br from-yellow-400 to-purple-600">
            <img
              src="https://links.papareact.com/8sg"
              alt="hero-pic"
              className="object-cover w-44 rounded-xl lg:h-96 lg:w-72"
            />
          </div>
          <div className="p-5 space-y-2 text-center">
            <h1 className="text-4xl font-bold text-white">SomeNFT Apes</h1>
            <h2 className="text-xl text-gray-300">
              A collection of SomeNFT Apes who live & breathe React!
            </h2>
          </div>
        </div>
      </div>
      {/* {Right} */}
      <div className="flex flex-col flex-1 p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <h1 className="text-xl cursor-pointer w-52 font-extralight sm:w-80">
            The{' '}
            <span className="font-extrabold underline decoration-pink-600/50">
              SomeNFT
            </span>{' '}
            NFT Market Place
          </h1>

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
            src="https://links.papareact.com/bdy"
            className="object-cover pb-10 w-80 lg:h-40"
            alt=""
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            The SomeNFT Ape Coding Club | NFT Drop
          </h1>
          <p className="pt-2 text-xl text-green-500"> 13/21 NFT's claimed</p>
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
