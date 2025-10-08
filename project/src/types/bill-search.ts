export interface SearchResult {
  id: string;
  billNumber: string;
  taxYear: string;
  parcelId: string;
  billType: string;
  ownerName: string;
  propertyAddress: {
    street: string;
    cityStateZip: string;
  };
  billFlag: string;
  billAmount: number;
  billStatus: string;
  billDueAmount: number;
  dueDate: string;
  interestBegins: string;
  lastPayment: string | null;
}