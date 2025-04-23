export function setupPopupModal() {
  const modal = document.getElementById('popup-modal') as HTMLDivElement
  const closeButton = modal.querySelector('[close-popup]') as HTMLButtonElement
  const openButton = document.querySelector('[open-popup]') as HTMLButtonElement
  let timeoutId: NodeJS.Timeout | null = null

  if (!modal) {
    return
  }

  const settings = {
    timeToTrigger: Math.abs(parseInt(modal.getAttribute('time-to-trigger') || '0')) * 1000
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
  if (settings.timeToTrigger > 0) {
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
