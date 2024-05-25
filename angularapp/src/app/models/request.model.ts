// Request Interface to Get the AgroChemical Request

export interface Requests {
    RequestId?: number;
    UserId: number;
    CropId: number;
    AgroChemicalId: number;
    Quantity: number;
    RequestPurpose: string;
    Status: string;
    RequestDate: Date;
}
