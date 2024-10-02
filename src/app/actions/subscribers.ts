// src/app/actions/posts.ts

// this is a server action
'use server'

// Import the database client and the Post type from Prisma
import { db } from '@/db'
import type { Subscriber } from '@prisma/client'

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Import the Zod library for validation
import { z } from 'zod'

// Define a schema for the post using Zod
const subscriberSchema = z.object({
    // the title must be a string between 3 and 255 characters
    name: z.string().min(3).max(255),
    // the content must be a string between 10 and 4000 characters
    phone: z.string().min(10).max(4000),
    cnpj: z.string().min(10).max(4000),
    email: z.string().min(10).max(4000),
})

// Define an interface for the form state
interface SubscriberFormState {
    errors: {
        name?: string[],
        phone?: string[],
        cnpj: string[],
        email: string[],
        _form?: string[],
    }
}

// Define an asynchronous function to create a post
export async function createSubscriber(
    formState: SubscriberFormState,
    formData: FormData
): Promise<SubscriberFormState> {
    // Validate the form data against the post schema
    // If the form data does not match the schema, the safeParse method returns an object 
    // with a success property of false and an error property containing the validation errors. 
    // If the form data matches the schema, the safeParse method returns an object 
    // with a success property of true and a data property containing the validated data. 
    const result = subscriberSchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        cnpj: formData.get('cnpj'),
        email: formData.get('email')
    })

    // If validation fails, return the errors
    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure 
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Subscriber
    try {
        // If validation passes, create a new post in the database
        post = await db.subscriber.create({
            data: {
                name: result.data.name,
                phone: result.data.phone,
                cnpj: result.data.cnpj,
                email: result.data.email
            }
        })
    } catch (error: unknown) {
        // If there's an error, return it
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Revalidate the path and redirect to the home page
    revalidatePath('/')
    redirect('/')
}

export async function updateSubscriber(
    id: string,
    formState: SubscriberFormState,
    formData: FormData
): Promise<SubscriberFormState> {
    const result = subscriberSchema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        cnpj: formData.get('cnpj'),
        email: formData.get('email')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let subscriber: Subscriber
    try {
        subscriber = await db.subscriber.update({
            where: { id },
            data: {
                name: result.data.name,
                phone: result.data.phone,
                cnpj: result.data.cnpj,
                email: result.data.email
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function deleteSubscriber(
    id: string,
): Promise<SubscriberFormState> {
    let subscriber: Subscriber
    try {
        subscriber = await db.subscriber.delete({
            where: { id },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}