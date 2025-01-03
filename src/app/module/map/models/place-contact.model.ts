// Interface for the response from the API
export interface PlaceContact {
    id: number;
    placeId: string;
    createdBy: string;
    createdAt: string;  // ISO 8601 date string
    updatedBy: string;
    updatedAt: string;  // ISO 8601 date string
    deleted: boolean;
    name: string;
    formatted_address: string;
    formatted_phone_number: string;
    website: string | null;
  }
  