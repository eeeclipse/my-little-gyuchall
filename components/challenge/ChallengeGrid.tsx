'use client';

import { ChallengeCard } from './ChallengeCard';
import { useRouter } from 'next/navigation';

interface Challenge {
  id: number;
  day: number;
  title: string;
  description: string;
  icon: string;
}

interface ChallengeGridProps {
  challenges: Challenge[];
  progress: any[];
}

export function ChallengeGrid({ challenges, progress }: ChallengeGridProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 p-4">
      {challenges.map((challenge) => {
        const userChallenge = progress.find(p => p.challengeId === challenge.id);
        
        return (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            userChallenge={userChallenge}
            onClick={() => router.push(`/challenge/${challenge.id}`)}
          />
        );
      })}
    </div>
  );
}