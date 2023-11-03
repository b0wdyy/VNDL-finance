import { writeAsyncIterableToWritable } from '@remix-run/node'
import type { UploadApiResponse } from 'cloudinary'
import { v2 as cloudinary } from 'cloudinary'
export const cld = cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
})

export const uploadImageToCloudinary = async (
  data: AsyncIterable<Uint8Array>,
  nestedFolder: string = '',
) => {
  if (!process.env.CLOUDINARY_FOLDER) {
    throw new Error('CLOUDINARY_FOLDER must be set')
  }

  const uploadPromise = new Promise<UploadApiResponse | undefined>(
    async (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `${process.env.CLOUDINARY_FOLDER}/${nestedFolder}`,
        },
        (error, result) => {
          if (error) {
            reject(error)
            return
          }
          resolve(result)
        },
      )
      await writeAsyncIterableToWritable(data, uploadStream)
    },
  )

  return uploadPromise
}
