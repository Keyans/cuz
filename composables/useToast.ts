import { ElMessage } from 'element-plus'

export const useToast = () => {
  const success = (message: string) => {
    ElMessage({
      message,
      type: 'success',
      duration: 2000
    })
  }

  const error = (message: string) => {
    ElMessage({
      message,
      type: 'error',
      duration: 3000
    })
  }

  const warning = (message: string) => {
    ElMessage({
      message,
      type: 'warning',
      duration: 3000
    })
  }

  return {
    success,
    error,
    warning
  }
} 