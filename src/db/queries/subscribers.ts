// src/db/queries/subscribers.ts

import type { Subscriber } from '@prisma/client' 
import { db } from '@/db'
import { notFound } from 'next/navigation' 

export async function fetchSubscribers(): Promise<Subscriber[]> { 
    return await db.subscriber.findMany({
        orderBy: [
            {
                createdAt: 'desc',
            }
        ],
    })
}

export async function fetchSubscriberById(id: string): Promise<Subscriber | null> { 
    const subscriber = await db.subscriber.findFirst({
        where: {
            id
        }
    })

    if (!subscriber) {
        notFound()
    }

    return subscriber
}