export function setupPopupModal() {
  const modal = document.getElementById('popup-modal') as HTMLDivElement
  const closeButton = modal.querySelector('[close-popup]') as HTMLButtonElement
  const openButton = document.querySelector('[open-popup]') as HTMLButtonElement
  let timeoutId: NodeJS.Timeout | null = null

  if (!modal) {
    return
  }

  const settings = {
    timeToTrigger: Math.abs(parseInt(modal.getAttribute('time-to-trigger') || '0')) * 1000,
    popupId: modal.getAttribute('popup-id') || '',
  }

  const setSeenCookie = () => {
    const date = new Date()
    date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000) // Set cookie for 1 year
    const expires = 'expires=' + date.toUTCString()
    document.cookie = `popup-id-${settings.popupId}=seen; ${expires}; path=/`
  }

  const getSeenCookie = () => {
    const name = 'popup-id-' + settings.popupId + '=seen'
    const decodedCookie = decodeURIComponent(document.cookie)
    const cookieArray = decodedCookie.split(';')
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim()
      if (cookie.indexOf(name) === 0) {
        return true
      }
    }
    return false
  }

  const close = () => {
    const focused = document.activeElement as HTMLElement
    if (focused) {
      focused.blur()
    }
    modal.style.display = 'none'
    modal.setAttribute('aria-hidden', 'true')
    modal.setAttribute('tabindex', '-1')
    modal.setAttribute('aria-modal', 'false')
    document.body.style.overflow = 'auto'
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const open = () => {
    modal.style.display = 'flex'
    modal.classList.add('show')
    modal.setAttribute('aria-hidden', 'false')
    modal.setAttribute('tabindex', '0')
    document.body.style.overflow = 'hidden'

    setSeenCookie()
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      close()
    }
  })

  if (closeButton) {
    closeButton.addEventListener('click', (e) => {
      e.preventDefault()
      close()
    })
  }

  if (openButton) {
    openButton.addEventListener('click', (e) => {
      e.preventDefault()
      open()
    })
  }

  // Trigger the modal after a certain time
  if (settings.timeToTrigger > 0 && !getSeenCookie()) {
    timeoutId = setTimeout(() => {
      open()
    }, settings.timeToTrigger)
  }
  // Close the modal when the user presses the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      close()
    }
  })


}
