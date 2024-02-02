'use server'
import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"

interface SaveBookingParams {
  barbershopId: string
  userId: string
  serviceId: string
  date: Date
}

export const saveBooking = async ({ barbershopId, date, serviceId, userId }: SaveBookingParams) => {
  await db.booking.create({
    data: {
      userId,
      barbershopId,
      serviceId,
      date
    }
  })
  revalidatePath('/bookings')
}