// Roman Urdu: File frontend/src/utils/prepareProductImage.js ka code. Har line ki tafseel CODE-LINE-BY-LINE-ROMAN-URDU.md mein milti hai.
/** Convert JPG/PNG to high-quality WebP before uploading. Animated GIF remains GIF. */
export async function prepareProductImage(file) {
  if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) throw Error('Supported formats: JPG, PNG, WebP and GIF.')
  if (file.size > 5 * 1024 * 1024) throw Error('Maximum original file size is 5 MB.')
  if (file.type === 'image/gif' || file.type === 'image/webp') return file
  const bitmap = await createImageBitmap(file)
  try {
    const max = 2200, ratio = Math.min(1,max/Math.max(bitmap.width,bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width=Math.round(bitmap.width*ratio);canvas.height=Math.round(bitmap.height*ratio)
    canvas.getContext('2d',{alpha:true}).drawImage(bitmap,0,0,canvas.width,canvas.height)
    const blob = await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',0.91))
    if (!blob || blob.type !== 'image/webp') throw Error('Browser could not convert image to WebP')
    return new File([blob], file.name.replace(/\.[^.]+$/,'')+'.webp',{type:'image/webp'})
  } finally { bitmap.close() }
}
