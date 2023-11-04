import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
} from '@remix-run/node'

import { uploadImageToCloudinary } from './cloudinary.server'

export const uploadHandler = unstable_composeUploadHandlers(
  // our custom upload handler
  async ({ name, data, contentType }) => {
    // name of input
    if (name !== 'avatar' || !contentType?.startsWith('image/')) {
      return undefined
    }
    const uploadedImage = await uploadImageToCloudinary(data)
    return uploadedImage?.secure_url
  },
  // fallback to memory for everything else
  unstable_createMemoryUploadHandler({
    filter: ({ name }) => name !== 'avatar',
  }),
)
