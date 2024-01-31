'use client'
import SideMenu from "@/app/_components/side-menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const { back } = useRouter()

  const handlerBackClick = () => {
    back()
  }

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Button onClick={handlerBackClick} size="icon" variant='outline' className="z-50 absolute top-4 left-4">
          <ChevronLeftIcon/>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image 
          src={barbershop.imageUrl} 
          alt={barbershop.name} 
          fill 
          style={{ objectFit: 'cover'}}
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon size={18} className="text-primary"/>
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <StarIcon size={18} className="text-primary"/>
          <p className="text-sm">5,0 (899 avaliações)</p>
        </div>
      </div>
    </div>
  );
}

export default BarbershopInfo;