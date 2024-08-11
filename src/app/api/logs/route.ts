
import { NextRequest, NextResponse } from 'next/server'
//import { cookies } from 'next/headers'
import prisma from '../../_prisma'
 
export async function GET(request: NextRequest, response: NextResponse) {
  //const cookieStore = cookies()
  //const token = cookieStore.get('token')

  const page = request.nextUrl.searchParams.get('page')
  const take = request.nextUrl.searchParams.get('take')
  const data = await prisma.log.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: take?parseInt(take):10,
    skip: page?parseInt(page)*10:0
  })
  const counter = await prisma.log.count()
  return Response.json({ data,counter })
}
