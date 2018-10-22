import '@/assets/styles/style.css'
import imagesLoaded from 'imagesloaded'

document.addEventListener(
  'DOMContentLoaded',
  async () => {
    await init()
  },
  false
)

function init() {
  return new Promise((resolve) => {
    const imgLoad = imagesLoaded(document.querySelector('body'))

    imgLoad.on('always', (instance) => {
      console.log('Hello Starter Kit')
      resolve()
    })
  })
}
