"use client";

import { useState, useEffect } from "react";
import type { Customer } from "@/types/customer";

// 取引先タイプの定義
export type CustomerType = "all" | "client" | "supplier";

interface CustomersFilterProps {
  customers: Customer[];
  initialSearchTerm?: string;
  initialCustomerType?: CustomerType;
}

export function useCustomersFilter({ 
  customers, 
  initialSearchTerm = "", 
  initialCustomerType = "all" 
}: CustomersFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedIndustry, setSelectedIndustry] = useState<string | undefined>(undefined);
  const [selectedRating, setSelectedRating] = useState<string | undefined>(undefined);
  const [selectedCustomerType, setSelectedCustomerType] = useState<CustomerType>(initialCustomerType);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);

  // 業種の一覧を取得
  const industries = Array.from(new Set(customers.filter(c => c.industry).map(c => c.industry as string)));
  
  // 与信格付けの一覧を取得
  const ratings = Array.from(new Set(customers.filter(c => c.creditRating).map(c => c.creditRating as string)));

  // 検索条件が変更されたときにフィルタリングを実行
  useEffect(() => {
    const filtered = customers.filter((customer) => {
      // 検索語句でフィルタリング
      const matchesSearch = !searchTerm
        ? true
        : customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (customer.contactPerson && customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (customer.industry && customer.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()));

      // 業種でフィルタリング
      const matchesIndustry =
        selectedIndustry === undefined ? true : customer.industry === selectedIndustry;

      // 与信格付けでフィルタリング
      const matchesRating =
        selectedRating === undefined ? true : customer.creditRating === selectedRating;
        
      // 取引先タイプでフィルタリング
      const matchesCustomerType = 
        selectedCustomerType === "all" ? true : 
        selectedCustomerType === "client" ? customer.type === "client" || customer.type === undefined : 
        customer.type === "supplier";

      return matchesSearch && matchesIndustry && matchesRating && matchesCustomerType;
    });

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, selectedIndustry, selectedRating, selectedCustomerType]);

  // 業種フィルターの変更ハンドラー
  const handleIndustryFilter = (industry: string | undefined) => {
    setSelectedIndustry(industry);
  };

  // 与信格付けフィルターの変更ハンドラー
  const handleRatingFilter = (rating: string | undefined) => {
    setSelectedRating(rating);
  };
  
  // 取引先タイプフィルターの変更ハンドラー
  const handleCustomerTypeFilter = (type: CustomerType) => {
    setSelectedCustomerType(type);
  };

  return {
    filteredCustomers,
    industries,
    ratings,
    selectedIndustry,
    selectedRating,
    selectedCustomerType,
    searchTerm,
    setSearchTerm,
    handleIndustryFilter,
    handleRatingFilter,
    handleCustomerTypeFilter,
  };
}
