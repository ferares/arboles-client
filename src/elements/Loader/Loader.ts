import LoaderTemplate from './Loader.html?raw'

export default class Loader extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = LoaderTemplate
    document.addEventListener('arbolado:loading', (event) => {
      if ((event as CustomEvent).detail.loading) this.show()
      else this.hide()
    })
  }

  show() {
    this.classList.add('active')
    this.setAttribute('aria-hidden', 'false')
  }

  hide() {
    this.classList.remove('active')
    this.setAttribute('aria-hidden', 'true')
  }
}