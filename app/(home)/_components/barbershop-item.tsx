'use client'
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  const { push } = useRouter()

  const handlerBarbershopClick = () => {
    push(`/barbershops/${barbershop.id}`)
  }

  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        <div className="h-[159px] w-full relative">
          <div className="absolute top-2 left-2 z-50">
            <Badge variant='secondary' className="opacity-90 flex justify-center items-center gap-1">
              <StarIcon size={12} className="fill-primary text-primary"/>
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            style={{
              objectFit: 'cover'
            }}
            className=" rounded-2xl"
            />
        </div>
          <div className="px-2 pb-3">
            <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h2>
            <div className="text-sm text-gray-400 overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</div>
            <Button className="w-full mt-3" variant='secondary' onClick={handlerBarbershopClick}>Reservar</Button>
          </div>
      </CardContent>
    </Card>
  );
}
 
export default BarbershopItem;