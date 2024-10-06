import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import Emirates from '@/assets/emirates.png';
import Lufthansa from '@/assets/lufthansa.png';
import cities from '@/assets/cities.json'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAirlineLogo(airline: string){
    let airlineImage;

    switch (airline) {
        case 'Emirates':
            airlineImage = Emirates;
            break;
        case 'Lufthansa':
            airlineImage = Lufthansa;
            break;
        default:
            airlineImage = '';
    }

    return airlineImage

}

export function getCityData(cityCode: string){
    return cities.find(e=>e.code == cityCode)
}