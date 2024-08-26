import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../app/_prisma'
 
export async function GET(request: NextRequest, response: NextResponse) {
  const subscriberId:any = request.nextUrl.searchParams.get('id')
  const data = await prisma.log.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      subscriberId: subscriberId,
      productId: null
    }
  })
  const count = await prisma.log.count({
    where: {
      subscriberId: subscriberId,
      productId: null
    }
  })

  const dataProd = await prisma.log.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      subscriberId: subscriberId,
      productId: {
        not: null
      }
    }
  })
  const subscriberLogins = await prisma.log.count({
    where: {
      subscriberId: subscriberId,
      action: 'Login'
    }
  })
  const subscriberConsultas = await prisma.log.count({
    where: {
      subscriberId: subscriberId,
      action: 'Consulta'
    }
  })
  const subscriberPagamentos = await prisma.log.count({
    where: {
      subscriberId: subscriberId,
      action: 'Payment'
    }
  })
  return Response.json({data,count, dataProd, subscriberLogins,subscriberConsultas,subscriberPagamentos})
}
