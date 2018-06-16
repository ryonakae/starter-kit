import '@/index.ejs'
import '@/styles/index.css'
import { Utils } from 'web-utility-js'

const utils = new Utils()

document.addEventListener('DOMContentLoaded', init, false)

function init () {
  utils.init()
  document.body.dataset.device = utils.getDevice()
  console.log('hello')
}
