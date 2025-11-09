import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const challenges = [
  { day: 1, title: '다정한 댓글 50개', description: '다른 사람의 게시물이나 콘텐츠에 진심 어린 댓글을 50개 남겨보세요.', icon: '💬' },
  { day: 2, title: '완상소국집 op.3 Monster 챌린지 리뷰', description: '완상소국집 op.3 Monster를 감상하고, 자신만의 리뷰를 작성해보세요.', icon: '🎵' },
  { day: 3, title: 'Monster 콘서트 로비 이벤트 & 후기', description: 'Monster 콘서트의 로비 이벤트에 참여하거나, 콘서트 후기를 작성해보세요.', icon: '🎤' },
  { day: 4, title: '디지털 디톡스', description: '하루 동안 스마트폰 사용을 최소화하고, 아날로그 활동에 집중해보세요.', icon: '📵' },
  { day: 5, title: '휴대폰 없는 산책', description: '휴대폰 없이 30분 이상 산책하며 자연과 주변을 온전히 느껴보세요.', icon: '🚶' },
  // ... 나머지 20개 챌린지
];

async function main() {
  console.log('🌱 Starting seed...');

  for (const challenge of challenges) {
    await prisma.challenge.create({ data: challenge });
    console.log(`✅ Created challenge ${challenge.day}: ${challenge.title}`);
  }

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
