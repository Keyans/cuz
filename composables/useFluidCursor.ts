export const useFluidCursor = () => {
    const isEnabled = useState('fluidCursorEnabled', () => true)
    
    const enable = () => {
      isEnabled.value = true
      const canvas = document.getElementById('fluid-cursor')
      if (canvas) canvas.style.display = 'block'
    }
    
    const disable = () => {
      isEnabled.value = false
      const canvas = document.getElementById('fluid-cursor')
      if (canvas) canvas.style.display = 'none'
    }
    
    return {
      isEnabled,
      enable,
      disable
    }
  }