
// 챌린지 타입
export interface Challenge {
    id: number;
    day: number;
    title: string;
    description: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
}

// 사용자 챌린지 타입
export type ChallengeStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';

export interface UserChallenge {
    id: string;
    userId: string;
    challengeId: number;
    status: ChallengeStatus;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

// 일기 타입
export interface Entry {
    id: string;
    userId: string;
    userChallengeId: string;
    content: string;
    imageUrls: string[];
    mood?: string;
    createdAt: Date;
    updatedAt: Date;
}

// API 응답 타입
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

// 업로드 상태 타입
export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface UploadState {
    status: UploadStatus;
    progress: number;
}