export type CustomerType = "client" | "supplier";

export interface Customer {
  id: string;
  name: string;
  type?: CustomerType; // 取引先タイプ（顧客/仕入先）
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  industry?: string;
  establishedDate?: string;
  creditRating?: string;
  notes?: string;
}
