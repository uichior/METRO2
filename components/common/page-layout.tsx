"use client";

import { ReactNode } from "react";
import DashboardLayout from "@/app/dashboard-layout";
import { Header } from "@/components/common/header";
import { ManagementLayout } from "@/components/common/management-layout";

interface PageLayoutProps {
  // ヘッダー関連のプロパティ
  header: {
    onMenuToggle?: () => void;
    onSearch?: (query: string) => void;
    searchValue?: string;
    searchPlaceholder?: string;
    onAddNew?: () => void;
    onExportCsv?: () => void;
    showUndeliveredOnly?: {
      checked: boolean;
      onChange: (checked: boolean) => void;
    };
  };
  // レイアウト関連のプロパティ
  navigationPanel?: ReactNode;
  listPanel: ReactNode;
  detailPanel: ReactNode;
  sidebarColor?: string;
  // オプションのプロパティ
  formPanel?: ReactNode;
}

/**
 * 統一レイアウトコンポーネント
 * マスタページも管理ページも同じ構成で作成できるようにするための共通レイアウト
 */
export function PageLayout({
  header,
  navigationPanel,
  listPanel,
  detailPanel,
  sidebarColor,
  formPanel,
}: PageLayoutProps) {
  return (
    <DashboardLayout>
      <Header
        onMenuToggle={header.onMenuToggle}
        onSearch={header.onSearch}
        searchValue={header.searchValue}
        searchPlaceholder={header.searchPlaceholder}
        onAddNew={header.onAddNew}
        onExportCsv={header.onExportCsv}
        showUndeliveredOnly={header.showUndeliveredOnly}
      />
      <ManagementLayout
        navigationPanel={navigationPanel}
        listPanel={listPanel}
        detailPanel={detailPanel}
        sidebarColor={sidebarColor}
      />
      {formPanel}
    </DashboardLayout>
  );
}
