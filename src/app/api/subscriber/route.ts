import prisma from '../../../app/_prisma'
 
export async function GET() {
  const data = await prisma.subscriber.findMany({
    select: {
      id: true,
      name: true,
      createdAt: true,
      municipioName: true,
      segment: true,
      subscription: true,
      payments: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  return Response.json({ data })
}
