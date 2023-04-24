import { GeoPoint } from "firebase/firestore/lite"

export type ListingType = "HOUSE" | "CAR" | "TICKET" | "LAND";

export type ListedForType = "FOR SALE" | "FOR LEASE" | "FOR RENT";

export type RentalForm = "ENTIRE PLACE" | "PRIVATE ROOM" | "SHARED ROOM";

export type ExperienceListingType = "NATIONAL" | "INTERNATIONAL";

export type ListingStorStatusType =
    | "NEWLY_ADDED"
    | "SUSPENDED"
    | "UNSAVED"
    | "SOLD";

export type SizeType = {
    width?: number;
    height?: number;
    length?: number;
};

export type ImageUrlsType = {
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    main: string;
};

export type ImageFileType = {
    imageUrls: ImageUrlsType;
    description: string;
};

/**
* This is the  entire set of images a product can have
*/
export type ListingImagesType = {
    imageFiles: Array<ImageFileType>;
    mainFile: ImageFileType;
};

export type UserMetadataType = {
    id: string;
    fullName: string;
    thumbnailImageURL: string;
    rating: number;
};

export type ListingDTOType = {
    listedFor?: ListedForType,
    dateOfListing?: string;
    name?: string;
    // createdAt: string,
    // updatedAt: string,
    // deletedAt: string,
    soldAt?: string;
    salesOff?: string;
    productImages: ListingImagesType;
    listedByUser: UserMetadataType;
    price?: PriceType;
    likesCount?: number;
    commentCount?: number;
    viewCount?: number;
    reviewCount?: number;
    starRating?: number;
    saleOff?: string;
    id: string;
    description: string;
    isAds: boolean;
};
export type StayDTOType = HouseDTOType;

export type HouseDTOType = ListingDTOType & {
    address: AddressType;
    numberOfRooms?: number;
    guests: number;
    beds: number;
    baths: number;
    bedrooms: number;
    amenities: Array<HouseAmenitiesType>;
    facilities: Array<HouseFacilitiesType>;
    numberOfAmenities: number;
    numberOfFacilities: number;
    propertyType: Array<HouseRentalPropertyType | HouseSalesPropertyType>;
};

export type LandDTOType = ListingDTOType & {
    location: AddressType;
    size?: SizeType;
};

export type CarDTOType = ListingDTOType & {
    packingAddress?: AddressType;
    countryOfAssembly?: string;
    size?: SizeType;
    slogan?: string;
    bodyType: CarBodyType;
    modelDate?: string;
    productionDate?: string;
    knownVehicleDamages?: string;
    mileageFromOdometer?: string;
    numberOfDoors?: string;
    numberOfForwardGears?: string;
    numberOfAxles?: string;
    numberOfAirbags?: string;
    numberOfPreviousOwners?: string;
    speed?: string;
    steeringPosition?: SteeringPositionValue;
    brand?: string;
    color?: Array<string>;
    seatingCapacity?: number;
    fuelType?: CarFuelType;
    gearshiftType?: GearshiftType;
    carGeneralAmenities?: Array<CarGeneralAmenitiesType>;
    carSafetyAmenities?: Array<CarSafetyAmenitiesType>;
    carOtherAmenities?: Array<CarOtherAmenitiesType>;
};

export type CarFuelType = "PETROL" | "DIESEL" | "ELECTRIC" | "GASOLINE" | "BIO-DIESEL" | "OTHER";
export type GearshiftType =
    | "MANUAL TRANSMISSION"
    | "AUTOMATIC TRANSMISSION"
    | "CONTINUOUS VARIABLE TRANSMISSION (CVT)"
    | "SEMI-AUTOMATIC AND DUAL-CLUTCH TRANSMISSION";

export type CarGeneralAmenitiesType =
    | "SPARE TIRE"
    | "AIR CONDITIONER"
    | "BLUETOOTH"
    | "BACKUP CAMERA"
    | "HEATED SEATS"
    | "POWER DRIVER'S SEAT";

export type CarSafetyAmenitiesType =
    | "BACKUP CAMERA"
    | "DUAL-ZONE CLIMATE CONTROL";
export type CarOtherAmenitiesType = "DIGITAL DASHBOARD";

export type AddressType = {
    type: AddressTypeType;
    addressLocality: string;
    addressRegion: string;
    streetAddress: string;
    addressCity: string;
    addressCountry: string;
    geoPoint: GeoPoint;
};

export type CarBodyType =
    | "MICRO"
    | "SEDAN"
    | "HATCH BACK"
    // | "UNIVERSAL"
    // | "LIFT BACK"
    | "COUPE"
    | "CUV"
    | "CABRIOLETS"
    | "ROADSTER"
    // | "TARGA"
    | "LIMOUSINE"
    | "MUSCLE CAR"
    | "SPORT CAR"
    | "SUPER CAR"
    | "SUV"
    // | "CROSSOVER"
    | "PICKUP"
    | "STATION WAGON"
    | "VAN"
    | "MINI VAN"
    | "MINI TRUCK"
    | "CAMPER VAN"
    | "BUS"
    | "TRUCK"
    | "MONSTER TRUCK"
    | "BIG TRUCK"
    | "OTHER";

export type AddressTypeType = "HOUSE" | "SCHOOL" | "OFFICE" | "SALES";
export type SteeringPositionValue = "LEFT" | "RIGHT";

export type CurrencyType = "SLL" | "USD";
export type PriceType = {
    amount: number;
    currency: CurrencyType;
};

export type ExperienceType = {
    trips: Array<TripType>;
};

export type TripType = {
    touristType: TouristType;
    arrivalTime: string;
    departureTime: string;
    // offers:
    // demand:
};

export type CommentType = {
    children: Array<CommentType>;
    id: string;
    parentId: string;
    // createdAt: string,
    // updatedAt: string,
    // deletedAt: string,
    author: UserMetadataType;
    date: string;
    content: string;
    like: number;
};

export type TouristType = "NATIONAL" | "INTERNATIONAL";

export type HouseAmenitiesType =
    | "KEY"
    | "SHOWER"
    | "SWIMMING-POOL"
    | "TV"
    | "UTENSILS"
    | "WIFI"
    | "BATH-TUB"
    | "HOT-TUB"
    | "BED"
    | "GYM";

export type HouseFacilitiesType = "SWIMMING-POOL" | "GYM";

export type HouseRentalPropertyType =
    | "HOUSE"
    | "BED AND BREAKFAST"
    | "APARTMENT"
    | "BOUTIQUE"
    | "HOTEL"
    | "BUNGALOW"
    | "CHALET"
    | "CONDOMINIUM"
    | "COTTAGE"
    | "GUEST SUITE"
    | "GUESTHOUSE"
    | "OTHER";
export type HouseSalesPropertyType =
    | "HOUSE"
    | "APARTMENT"
    | "BOUTIQUE"
    | "HOTEL"
    | "BUNGALOW"
    | "CHALET"
    | "CONDOMINIUM"
    | "COTTAGE"
    | "OTHER";

export type AssetOwnerType = {
    collectonName?: string;
    documentId?: string;
    ismainAsset?: boolean;
};
