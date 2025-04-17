// utils/qrcodeHelper.ts
export const generateQRCode = async (text: string): Promise<string> => {
    // 仅在客户端执行
    if (process.server) {
      throw new Error("generateQRCode can only be used on the client side.")
    }
  
    try {
      const QRCode = await import('qrcode')
      const dataUrl = await QRCode.toDataURL(text)
      return dataUrl
    } catch (err) {
      console.error('[QRCode] Failed to generate:', err)
      throw err
    }
  }
  