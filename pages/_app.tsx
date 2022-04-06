import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProgressBar from '@badrap/bar-of-progress'
import Router from 'next/router'
import { Toaster } from 'react-hot-toast'

const progress = new ProgressBar({
  size: 10,
  color: '#3c0a75',
  className: 'z-50',
  delay: 500,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
      <Toaster />
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
