import { Utils } from 'web-utility-js'
const utils = new Utils()

document.addEventListener('DOMContentLoaded', () => {
  init()
})

function init () {
  utils.init()
  document.body.dataset.device = utils.getDevice()
  console.log('hello')
}
