import { format } from "date-fns";
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { Barbershop, Booking } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)

  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user ? db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true
      }
    }) : Promise.resolve([])
  ])

  return (
    <div>
      <Header/>
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Guilherme!</h2>
        <p className="capitalize text-sm">
          {
            format(new Date(), "EEEE',' d 'de' MMMM ", {
              locale: ptBR
            })
          }
        </p>
      </div>

      <div className="px-5 mt-6">
        <Search/>
      </div>

      <div className="mt-6">
        <h2 className="pl-5 text-xs uppercase text-gray-400 font-bold mb-3">agendamentos</h2>
        <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking: any) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">recomendados</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop: Barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
            ))
          }
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="text-xs px-5 uppercase text-gray-400 font-bold mb-3">populares</h2>
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop: Barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop}/>
            ))
          }
        </div>
      </div>

    </div>
  );
}
