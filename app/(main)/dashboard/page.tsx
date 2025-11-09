import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ChallengeGrid } from '@/components/challenge/ChallengeGrid';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  // 모든 챌린지 가져오기
  const challenges = await prisma.challenge.findMany({
    orderBy: { day: 'asc' },
  });

  // 사용자 진행 상황
  const progress = await prisma.userChallenge.findMany({
    where: { userId: session.user.id },
  });

  const completedCount = progress.filter(p => p.status === 'COMPLETED').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-autumn-50 to-leaf-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-autumn-700">
                🍂 규챌
              </h1>
              <p className="text-gray-600 mt-1">
                {session.user.name}님의 가을 챌린지
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-autumn-600">
                {completedCount}/25
              </div>
              <div className="text-sm text-gray-600">완료</div>
            </div>
          </div>
        </div>
      </div>

      {/* 챌린지 그리드 */}
      <ChallengeGrid challenges={challenges} progress={progress} />
    </div>
  );
}