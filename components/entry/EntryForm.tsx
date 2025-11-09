'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUpload } from './ImageUpload';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const entrySchema = z.object({
  content: z.string().min(1, '내용을 입력해주세요🥳'),
});

type EntryFormData = z.infer<typeof entrySchema>;

interface EntryFormProps {
  challengeId: number;
}

export function EntryForm({ challengeId }: EntryFormProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const { uploadToCloudinary, uploadState } = useImageUpload();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
  });

  const createEntryMutation = useMutation({
    mutationFn: async (data: { content: string; imageUrls: string[] }) => {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          challengeId,
        }),
      });
      if (!response.ok) throw new Error('Failed to save entry');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      toast.success('챌린지 완료! 🎉');
      router.push('/dashboard');
    },
    onError: () => {
      toast.error('저장에 실패했습니다 😢 다시 시도해주세요.');
    },
  });

  const handleImageAdd = async (files: File[]) => {
    setIsUploading(true);
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      try {
        const url = await uploadToCloudinary(file);
        uploadedUrls.push(url);
      } catch (error) {
        console.error('Image upload failed:', error);
      }
    }
    
    setImages([...images, ...uploadedUrls]);
    setIsUploading(false);
  };

  const onSubmit = async (data: EntryFormData) => {
    await createEntryMutation.mutateAsync({
      content: data.content,
      imageUrls: images,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 텍스트 에디터 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          내용
        </label>
        <textarea
          {...register('content')}
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-autumn-500 focus:border-transparent"
          placeholder="오늘의 챌린지에 대한 생각을 자유롭게 작성해보세요..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          사진 (선택)
        </label>
        <ImageUpload
          images={images}
          onAdd={handleImageAdd}
          onRemove={(index) => setImages(images.filter((_, i) => i !== index))}
        />
      </div>

      {/* 업로드 진행률 */}
      {isUploading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-autumn-500 h-full rounded-full transition-all"
              style={{ width: `${uploadState.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center">
            이미지 업로드 중...  {uploadState.progress}%
          </p>
        </div>
      )}

      {/* 버튼들 */}
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 text-gray-600 hover:text-gray-800"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={createEntryMutation.isPending || isUploading}
          className="px-6 py-2 bg-autumn-500 text-white rounded-lg hover:bg-autumn-600 disabled:opacity-50"
        >
          업로드
        </button>
      </div>
    </form>
  );
}