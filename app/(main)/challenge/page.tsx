import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { EntryForm } from '@/components/entry/EntryForm';

export default async function ChallengePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const challengeId = parseInt(params.id);

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    redirect('/dashboard');
  }

  const userChallenge = await prisma.userChallenge.findUnique({
    where: {
      userId_challengeId: {
        userId: session.user.id,
        challengeId,
      },
    },
    include: {
      entries: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-autumn-50 to-leaf-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* 챌린지 정보 */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-6xl">{challenge.icon}</div>
              <div>
                <div className="text-sm text-autumn-600 font-semibold">
                  Day {challenge.day}
                </div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {challenge.title}
                </h1>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* 일기 작성 폼 */}
          <EntryForm challengeId={challengeId} />
        </div>
      </div>
    </div>
  );
}