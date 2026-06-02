
export interface Period {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  name: string;
  description: string;
  startDate: string;
  period: {
    start: Date,
    end: Date
  };
  endDate: string;
  billsCreated: boolean;
  invoicesCreated: boolean;
  status: string;
}