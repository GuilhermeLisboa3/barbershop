'use server'
import { db } from "@/app/_lib/prisma"

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
}