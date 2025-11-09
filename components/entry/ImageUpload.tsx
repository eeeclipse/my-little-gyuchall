'use client';

import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploadProps {
  images: string[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
}

export function ImageUpload({ images, onAdd, onRemove }: ImageUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      onAdd(acceptedFiles);
    },
  });

  return (
    <div className="space-y-4">
      {/* 드래그앤드롭 영역 */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors
          ${isDragActive 
            ? 'border-autumn-500 bg-autumn-50' 
            : 'border-gray-300 hover:border-autumn-400'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="text-4xl">📷</div>
          {isDragActive ? (
            <p className="text-autumn-600">여기에 규챌 인증 이미지를 놓아주세요!</p>
          ) : (
            <>
              <p className="text-gray-600">
                사진을 드래그하거나 클릭하여 업로드
              </p>
              <p className="text-xs text-gray-400">
                최대 5장까지 가능 
              </p>
            </>
          )}
        </div>
      </div>

      {/* 미리보기 */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}