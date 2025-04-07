"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Customer } from "@/types/customer";
import { generateCustomerId } from "@/data/customers-data";

interface CustomerSelectionProps {
  customers: Customer[];
  filteredCustomers: Customer[];
}

export function useCustomerSelection({ customers, filteredCustomers }: CustomerSelectionProps) {
  // 親コンポーネントから渡された顧客データを参照するためのリファレンス
  const customersRef = { current: customers };
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [checkedCustomerIds, setCheckedCustomerIds] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // 選択された顧客の詳細を取得
  useEffect(() => {
    // customersが更新されたらリファレンスを更新
    customersRef.current = customers;
    
    // 顧客IDが選択されている場合
    if (selectedCustomerId) {
      try {
        // 選択されたIDが存在するか確認
        const customerExists = customers.some(customer => customer.id === selectedCustomerId);
        
        if (customerExists) {
          // 正常に顧客が見つかった場合
          const customer = customers.find((customer) => customer.id === selectedCustomerId);
          if (customer) {
            setSelectedCustomer(customer);
          }
        } else {
          // 顧客が見つからない場合は最初の顧客を選択
          console.log(`顧客ID ${selectedCustomerId} が存在しないため、最初の顧客を選択します`);
          
          // 存在する最初の顧客を選択
          if (customers.length > 0) {
            setSelectedCustomerId(customers[0].id);
            setSelectedCustomer(customers[0]);
          } else {
            setSelectedCustomerId(null);
            setSelectedCustomer(null);
          }
          
          toast({
            title: "エラー",
            description: `顧客ID ${selectedCustomerId} が見つかりません。データを初期化します。`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('顧客の選択処理でエラーが発生しました', error);
        // エラー発生時は最初の顧客を選択
        if (customers.length > 0) {
          setSelectedCustomerId(customers[0].id);
          setSelectedCustomer(customers[0]);
        }
      }
    } else {
      setSelectedCustomer(null);
    }
  }, [selectedCustomerId, customers, toast]);

  // 初期選択
  useEffect(() => {
    try {
      if (customers.length > 0) {
        // 現在選択されているIDが存在するか確認
        const customerExists = selectedCustomerId ? customers.some(customer => customer.id === selectedCustomerId) : false;
        
        // 選択されていないか、選択されたIDが存在しない場合は最初の顧客を選択
        if (!selectedCustomerId || !customerExists) {
          setSelectedCustomerId(customers[0].id);
        }
      }
    } catch (error) {
      console.error('初期選択処理でエラーが発生しました', error);
      // エラー発生時は最初の顧客を選択
      if (customers.length > 0) {
        setSelectedCustomerId(customers[0].id);
      }
    }
  }, [customers, selectedCustomerId]);

  // チェックボックスの状態を切り替える関数
  const toggleCustomerCheck = (customerId: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedCustomerIds((prev) => [...prev, customerId]);
    } else {
      setCheckedCustomerIds((prev) => prev.filter((id) => id !== customerId));
    }
  };

  // すべての顧客を選択/解除
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckedCustomerIds(filteredCustomers.map((customer) => customer.id));
    } else {
      setCheckedCustomerIds([]);
    }
  };

  // すべての顧客が選択されているかチェック
  const isAllSelected = filteredCustomers.length > 0 && checkedCustomerIds.length === filteredCustomers.length;

  // 新規顧客の追加
  const handleAddNew = () => {
    setIsEditing(false);
    setIsFormOpen(true);
  };

  // 顧客の編集
  const handleEdit = () => {
    if (selectedCustomer) {
      setIsEditing(true);
      setIsFormOpen(true);
    }
  };

  // 顧客の削除
  const handleDelete = () => {
    if (selectedCustomer) {
      if (window.confirm(`取引先 ${selectedCustomer.name} を削除してもよろしいですか？`)) {
        // 実際の削除処理
        const updatedCustomers = customersRef.current.filter((customer) => customer.id !== selectedCustomer.id);
        
        // ローカルストレージに保存
        window.localStorage.setItem('customersData', JSON.stringify(updatedCustomers));
        
        // ローカルストレージの変更イベントを発火させるためにカスタムイベントを発行
        window.dispatchEvent(new Event('customersUpdated'));
        
        if (updatedCustomers.length > 0) {
          setSelectedCustomerId(updatedCustomers[0].id);
        } else {
          setSelectedCustomerId(null);
        }
        
        toast({
          title: "削除完了",
          description: `取引先 ${selectedCustomer.name} が削除されました`,
        });
      }
    }
  };

  // 顧客フォームの送信
  const handleFormSubmit = async (data: Partial<Customer>) => {
    try {
      if (isEditing && selectedCustomerId) {
        // 既存の顧客を更新
        const updatedCustomer = { ...customersRef.current.find((c) => c.id === selectedCustomerId), ...data };
        const updatedCustomers = customersRef.current.map((customer) => (customer.id === selectedCustomerId ? (updatedCustomer as Customer) : customer));
        
        // 顧客データを更新
        window.localStorage.setItem('customersData', JSON.stringify(updatedCustomers));
        
        // ローカルストレージの変更イベントを発火させるためにカスタムイベントを発行
        window.dispatchEvent(new Event('customersUpdated'));
        
        // 状態を更新
        setSelectedCustomer(updatedCustomer as Customer);
        toast({
          title: "更新完了",
          description: `取引先 ${updatedCustomer.name} が更新されました`,
        });
      } else {
        // 新規顧客を作成
        const newId = generateCustomerId();
        const newCustomer = { 
          id: newId, 
          ...data
        } as Customer;
        const updatedCustomers = [...customersRef.current, newCustomer];
        
        // 顧客データを保存
        window.localStorage.setItem('customersData', JSON.stringify(updatedCustomers));
        
        // ローカルストレージの変更イベントを発火させるためにカスタムイベントを発行
        window.dispatchEvent(new Event('customersUpdated'));
        
        // 状態を更新
        setSelectedCustomerId(newId);
        toast({
          title: "登録完了",
          description: `取引先 ${newCustomer.name} が登録されました`,
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("顧客の保存に失敗しました:", error);
      toast({
        title: "エラー",
        description: "顧客の保存に失敗しました",
        variant: "destructive",
      });
    }
  };

  return {
    selectedCustomerId,
    setSelectedCustomerId,
    selectedCustomer,
    checkedCustomerIds,
    isFormOpen,
    setIsFormOpen,
    isEditing,
    isAllSelected,
    toggleCustomerCheck,
    toggleSelectAll,
    handleAddNew,
    handleEdit,
    handleDelete,
    handleFormSubmit
  };
}
