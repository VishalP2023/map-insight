// Action Interface
export interface Action {
    label: string;
    color: string;
  }
  
  // Sector Interface
  export interface Sector {
    id: number;
    name: string;
    code: string;
    keywords: string | null;
  }
  
  // Place Interface (Main Object)
  export interface Place {
    id: number;
    name: string;
    formattedAddress: string;
    placeId: string;
    businessStatus: string;
    sector: Sector;
    action: Action[];
  }
  