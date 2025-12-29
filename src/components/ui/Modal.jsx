import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({
  isOpen,
  onClose,
  children,
  title = '',
  size = 'default' // 'small', 'default', 'large', 'full'
}) {
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // Focus trap and scroll lock
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement

      // Focus modal
      setTimeout(() => {
        dialogRef.current?.focus()
      }, 100)

      // Lock scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.dataset.scrollY = scrollY.toString()
    } else {
      // Restore scroll
      const scrollY = parseInt(document.body.dataset.scrollY || '0', 10)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollY)
      delete document.body.dataset.scrollY

      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      delete document.body.dataset.scrollY
    }
  }, [isOpen])

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const sizeClasses = {
    small: 'modal--small',
    default: 'modal--default',
    large: 'modal--large',
    full: 'modal--full'
  }

  return createPortal(
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={`modal ${sizeClasses[size]}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex="-1"
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Modalı bağla"
          type="button"
        >
          ✕
        </button>
        <div className="modal__content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}
