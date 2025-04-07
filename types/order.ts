export interface Customer {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface ProductionStep {
  name: string;
  status: string;
}

export interface Order {
  id: string;
  customer: Customer;
  product: string;
  quantity: number;
  deadline: string;
  status: string;
  priority: string;
  isHighPriority: boolean;
  isUrgent: boolean;
  totalAmount: number;
  orderDate: string;
  deliveryDate: string;
  productName: string;
  productCode: string;
  category: string;
  specification: string;
  unitPrice: number;
  paymentTerms: string;
  progress: number;
  productionSteps: ProductionStep[];
  productionStartDate: string;
  productionEndDate: string;
  salesPerson: string;
  notes: string;
  productType: string;
}
