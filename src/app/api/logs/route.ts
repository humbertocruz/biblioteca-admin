
import { NextRequest, NextResponse } from 'next/server'
//import { cookies } from 'next/headers'
import prisma from '../../_prisma'
 
export async function GET(request: NextRequest, response: NextResponse) {
  //const cookieStore = cookies()
  //const token = cookieStore.get('token')

  const page:any = request.nextUrl.searchParams.get('page')
  const take:any = request.nextUrl.searchParams.get('take')
  const startDate:any = request.nextUrl.searchParams.get('startDate')
  const endDate:any = request.nextUrl.searchParams.get('endDate')
  const tipo:any = request.nextUrl.searchParams.get('tipo')
  const search:any = request.nextUrl.searchParams.get('search')||'false'
  const assinante:any = request.nextUrl.searchParams.get('assinante')

  console.log(search)

  const data = await prisma.log.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      createdAt: {
        gte: startDate?new Date(startDate):new Date('2019-01-01'),
        lte: endDate?new Date(endDate):new Date()
      },
      action: tipo!='all'&&tipo!=undefined?tipo:undefined,
      data: {
        contains: search==='true'?'search':undefined
      },
      subscriber: {
        name: {
          contains: assinante?assinante:undefined
        }
      }
    },
    take: take?parseInt(take):10,
    skip: page?parseInt(page)*parseInt(take):0,
    select: {
      id: true,
      createdAt: true,
      subscriber: true,
      action: true,
      data: true
    }
  });
  const counter = await prisma.log.count(
    {
      where: {
        createdAt: {
          gte: startDate?new Date(startDate):new Date('2019-01-01'),
          lte: endDate?new Date(endDate):new Date()
        },
        action: tipo!='all'&&tipo!=undefined?tipo:undefined,
        data:{
          contains: search==='true'?'search':undefined
        },
        subscriber: {
          name: {
            contains: assinante?assinante:undefined
          }
        },
      }
    }
  )
  return Response.json({ data,counter })
}
