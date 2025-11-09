'use client';

import { motion } from 'framer-motion';
import { Challenge, UserChallenge } from '@/types';

interface ChallengeCardProps {
  challenge: Challenge;
  userChallenge?: UserChallenge;
  onClick: () => void;
}

export function ChallengeCard({
  challenge,
  userChallenge,
  onClick,
}: ChallengeCardProps) {
  const isCompleted = userChallenge?.status === 'COMPLETED';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: isCompleted ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative w-full aspect-square p-4 rounded-xl border-2 transition-all
        ${isCompleted 
          ? 'bg-autumn-50 border-autumn-400 shadow-lg' 
          : 'bg-white border-gray-300 opacity-70 hover:opacity-100'
        }
      `}
    >
      {/* 번호 */}
      <div className={`text-2xl font-bold mb-2 ${isCompleted ? 'text-autumn-600' : 'text-gray-400'}`}>
        {challenge.day}
      </div>

      {/* 제목 */}
      <div className={`text-sm font-semibold text-center line-clamp-2 ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>
        {challenge.title}
      </div>

      {/* 아이콘 */}
      <div className="text-3xl mt-2">{challenge.icon}</div>

      {/* 완료 체크 */}
      {isCompleted && (
        <div className="absolute top-2 right-2 bg-autumn-500 text-white rounded-full p-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </motion.button>
  );
}