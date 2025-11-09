import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface UploadState {
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
}

export function useImageUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    progress: 0,
    status: 'idle',
  });

  const uploadToCloudinary = async (file: File): Promise<string> => {
    setUploadState({ progress: 0, status: 'uploading' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append('folder', 'my-little-gyuchall');

    try {
      const xhr = new XMLHttpRequest();
      
      return new Promise((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setUploadState({ progress, status: 'uploading' });
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            setUploadState({ progress: 100, status: 'success' });
            resolve(data.secure_url);
          } else {
            setUploadState({ progress: 0, status: 'error' });
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          setUploadState({ progress: 0, status: 'error' });
          reject(new Error('Upload failed'));
        });

        xhr.open(
          'POST',
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
        );
        xhr.send(formData);
      });
    } catch (error) {
      toast.error('이미지 업로드 실패 😢 다시 시도해 주세요.');
      throw error;
    }
  };

  return { uploadToCloudinary, uploadState };
}