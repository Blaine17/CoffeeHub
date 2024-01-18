import { useState } from 'react'

const useToast = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')

    const notify = (message) => {
      console.log('notify works')
      setIsOpen(true)
      setMessage(message)
      setTimeout(() => setIsOpen(false), 5000)
    }

    const toastEvent = {
      notify
    }

    const toastComponent = {
      get message() {
        return message
      },
      get isOpen() {
        return isOpen
      }
    }

    return {
      toastEvent,
      toastComponent,
    }
  }

  export default useToast