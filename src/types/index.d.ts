declare type IAirport = {
  name: string
  code: string
  city: string
  country: string
}

declare type ICustomInput = {
  data: IAirport[]
  placeholder: string
  className?: string
  value: string | null
  onChange: (val: string | null) => void
}

declare type IFlight = {
  airline: string
  flightNumber: string
  departure: string
  arrival: string
  route: string
  duration: string
  stops: string
  additionalInfo?: string,
  departureCityCode: string,
  arrivalCityCode: string,
  arrivalAirport: string,
  departureAirport: string
}

declare type IItinerary = {
  flights: IFlight[]
  price: string
}

declare type FlightQuery = {
  fromCity: string
  toCity: string
  departureDate: string
  returnDate?: string
}
