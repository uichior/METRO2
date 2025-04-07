import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Order } from "@/types/order";

interface OrderSelectionProps {
  orders: Order[];
  filteredOrders: Order[];
}

export function useOrderSelection({ orders, filteredOrders }: OrderSelectionProps) {
  // 親コンポーネントから渡された注文データを参照するためのリファレンス
  const ordersRef = { current: orders };
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checkedOrderIds, setCheckedOrderIds] = useState<string[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const { toast } = useToast();

  // 選択された注文の詳細を取得
  useEffect(() => {
    // ordersが更新されたらリファレンスを更新
    ordersRef.current = orders;
    
    // 注文IDが選択されている場合
    if (selectedOrderId) {
      try {
        // 選択されたIDが存在するか確認
        const orderExists = orders.some(order => order.id === selectedOrderId);
        
        if (orderExists) {
          // 正常に注文が見つかった場合
          const order = orders.find((order) => order.id === selectedOrderId);
          window.sessionStorage.removeItem('hasOrderError');
          if (order) {
            setSelectedOrder(order);
          }
        } else {
          // 注文が見つからない場合はエラーフラグを設定
          console.log(`注文ID ${selectedOrderId} が存在しないため、最初の注文を選択します`);
          window.sessionStorage.setItem('hasOrderError', 'true');
          
          // 存在する最初の注文を選択
          if (orders.length > 0) {
            setSelectedOrderId(orders[0].id);
            setSelectedOrder(orders[0]);
          } else {
            setSelectedOrderId(null);
            setSelectedOrder(null);
          }
          
          toast({
            title: "エラー",
            description: `注文ID ${selectedOrderId} が見つかりません。データを初期化します。`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('注文の選択処理でエラーが発生しました', error);
        // エラー発生時は最初の注文を選択
        if (orders.length > 0) {
          setSelectedOrderId(orders[0].id);
          setSelectedOrder(orders[0]);
        }
      }
    } else {
      window.sessionStorage.removeItem('hasOrderError');
      setSelectedOrder(null);
    }
  }, [selectedOrderId, orders, toast]);

  // 初期選択
  useEffect(() => {
    try {
      // ローカルストレージから選択された注文IDを削除
      window.localStorage.removeItem('selectedOrderId');
      
      if (orders.length > 0) {
        // 現在選択されているIDが存在するか確認
        const orderExists = selectedOrderId ? orders.some(order => order.id === selectedOrderId) : false;
        
        // 選択されていないか、選択されたIDが存在しない場合は最初の注文を選択
        if (!selectedOrderId || !orderExists) {
          setSelectedOrderId(orders[0].id);
        }
      }
    } catch (error) {
      console.error('初期選択処理でエラーが発生しました', error);
      // エラー発生時は最初の注文を選択
      if (orders.length > 0) {
        setSelectedOrderId(orders[0].id);
      }
    }
  }, [orders, selectedOrderId]);

  // チェックボックスの状態を切り替える関数
  const toggleOrderCheck = (orderId: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedOrderIds((prev) => [...prev, orderId]);
    } else {
      setCheckedOrderIds((prev) => prev.filter((id) => id !== orderId));
    }
  };

  // すべての注文を選択/解除
  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setCheckedOrderIds(filteredOrders.map((order) => order.id));
    } else {
      setCheckedOrderIds([]);
    }
  };

  // すべての注文が選択されているかチェック
  const isAllSelected = filteredOrders.length > 0 && checkedOrderIds.length === filteredOrders.length;

  // 新規注文の追加
  const handleAddNew = () => {
    setIsEditing(false);
    setIsFormOpen(true);
  };

  // 注文の編集
  const handleEdit = () => {
    if (selectedOrder) {
      setIsEditing(true);
      setIsFormOpen(true);
    }
  };

  // ステータス更新ダイアログを表示
  const handleStatusUpdateClick = () => {
    if (selectedOrder) {
      setIsStatusDialogOpen(true);
    }
  };

  // 注文の削除
  const handleDelete = () => {
    if (selectedOrder) {
      if (window.confirm(`注文 ${selectedOrder.id} を削除してもよろしいですか？`)) {
        // 実際の削除処理
        const updatedOrders = ordersRef.current.filter((order) => order.id !== selectedOrder.id);
        
        // ローカルストレージに保存
        window.localStorage.setItem('ordersData', JSON.stringify(updatedOrders));
        
        // ローカルストレージの変更イベントを発火させるためにカスタムイベントを発行
        window.dispatchEvent(new Event('ordersUpdated'));
        
        if (updatedOrders.length > 0) {
          setSelectedOrderId(updatedOrders[0].id);
        } else {
          setSelectedOrderId(null);
        }
        
        toast({
          title: "削除完了",
          description: `注文 ${selectedOrder.id} が削除されました`,
        });
      }
    }
  };

  // 注文フォームの送信
  const handleFormSubmit = async (data: Partial<Order>) => {
    try {
      if (isEditing && selectedOrderId) {
        // 既存の注文を更新
        const updatedOrder = { ...ordersRef.current.find((o) => o.id === selectedOrderId), ...data };
        const updatedOrders = ordersRef.current.map((order) => (order.id === selectedOrderId ? (updatedOrder as Order) : order));
        // 注文データを更新
        window.localStorage.setItem('ordersData', JSON.stringify(updatedOrders));
        
        // ローカルストレージの変更イベントを発火させるためにカスタムイベントを発行
        window.dispatchEvent(new Event('ordersUpdated'));
        
        // 状態を更新
        setSelectedOrder(updatedOrder as Order);
        toast({
          title: "更新完了",
          description: `注文 ${updatedOrder.id} が更新されました`,
        });
      } else {
        // 新規注文を作成
        const newId = `ORD-${new Date().getFullYear()}-${String(ordersRef.current.length + 1).padStart(3, "0")}`;
        const newOrder = { 
          id: newId, 
          ...data,
          status: data.status || "未着手",
          priority: data.priority || "通常",
          isHighPriority: data.priority === "重要" || data.priority === "緊急",
          isUrgent: data.priority === "緊急",
          progress: 0,
          productionSteps: [
            { name: "材料調達", status: "未着手" },
            { name: "切断", status: "未着手" },
            { name: "加工", status: "未着手" },
            { name: "検査", status: "未着手" }
          ],
          orderDate: new Date().toISOString().split('T')[0],
          productType: data.category?.includes("金属") ? "金属" : 
                      data.category?.includes("プラスチック") ? "プラスチック" : "電子"
        } as Order;
        const updatedOrders = [...ordersRef.current, newOrder];
        // 注文データを保存
        window.localStorage.setItem('ordersData', JSON.stringify(updatedOrders));
        
        // ローカルストレージの変更イベントを発火させるためにカスタムイベントを発行
        window.dispatchEvent(new Event('ordersUpdated'));
        
        // 状態を更新
        setSelectedOrderId(newId);
        toast({
          title: "登録完了",
          description: `注文 ${newId} が登録されました`,
        });
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("注文の保存に失敗しました:", error);
      toast({
        title: "エラー",
        description: "注文の保存に失敗しました",
        variant: "destructive",
      });
    }
  };

  // 注文のステータス更新
  const handleStatusUpdate = async (status: string) => {
    try {
      if (selectedOrderId) {
        // 実際の更新処理（モックデータ）
        const updatedOrder = { ...orders.find((o) => o.id === selectedOrderId), status };
        // setOrders(orders.map((order) => (order.id === selectedOrderId ? (updatedOrder as any) : order)));
        setSelectedOrder(updatedOrder as Order);
        setIsStatusDialogOpen(false);
        
        toast({
          title: "ステータス更新",
          description: `注文 ${selectedOrderId} のステータスが「${status}」に更新されました`,
        });
      }
    } catch (error) {
      console.error("ステータスの更新に失敗しました:", error);
      toast({
        title: "エラー",
        description: "ステータスの更新に失敗しました",
        variant: "destructive",
      });
    }
  };

  // 優先度の更新
  const handlePriorityChange = async (orderId: string, priority: string) => {
    try {
      // 実際の更新処理（モックデータ）
      const updatedOrder = { ...orders.find((o) => o.id === orderId), priority };
      // setOrders(orders.map((order) => (order.id === orderId ? ({ ...order, priority } as any) : order)));

      if (selectedOrderId === orderId) {
        setSelectedOrder((prev) => (prev ? ({ ...prev, priority } as Order) : null));
      }

      toast({
        title: "優先度更新",
        description: `注文 ${orderId} の優先度が「${priority}」に更新されました`,
      });
    } catch (error) {
      console.error("優先度の更新に失敗しました:", error);
      toast({
        title: "エラー",
        description: "優先度の更新に失敗しました",
        variant: "destructive",
      });
    }
  };

  // 一括アクションハンドラー
  const handleBulkArrange = () => {
    if (checkedOrderIds.length === 0) return;
    
    toast({
      title: "手配処理",
      description: `${checkedOrderIds.length}件の注文を手配しました`,
    });
    
    // 実際の処理はここに実装（今回はトースト表示のみ）
  };
  
  const handleBulkDeliver = () => {
    if (checkedOrderIds.length === 0) return;
    
    toast({
      title: "納品処理",
      description: `${checkedOrderIds.length}件の注文を納品済みにしました`,
    });
    
    // 実際の処理はここに実装（今回はトースト表示のみ）
  };

  return {
    selectedOrderId,
    setSelectedOrderId,
    selectedOrder,
    checkedOrderIds,
    isFormOpen,
    setIsFormOpen,
    isEditing,
    isStatusDialogOpen,
    setIsStatusDialogOpen,
    isAllSelected,
    toggleOrderCheck,
    toggleSelectAll,
    handleAddNew,
    handleEdit,
    handleStatusUpdateClick,
    handleDelete,
    handleFormSubmit,
    handleStatusUpdate,
    handlePriorityChange,
    handleBulkArrange,
    handleBulkDeliver
  }
}
