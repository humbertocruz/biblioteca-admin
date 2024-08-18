import prisma from '../../_prisma'
 
export async function GET() {
  const data = await prisma.payment.findMany({
    select: {
      id: true,
      createdAt: true,
      value: true,
      status: true,
      method: true,
      subscriber: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return Response.json({ data })
}
