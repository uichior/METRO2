"use client";

/**
 * CSVエクスポート用のヘッダー定義
 */
export interface CSVHeader {
  key: string;
  label: string;
}

/**
 * データをCSVファイルとしてエクスポートする関数
 * @param data エクスポートするデータの配列
 * @param headers CSVヘッダー定義の配列
 * @param filename ファイル名（拡張子なし）
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  headers: CSVHeader[],
  filename: string
): void {
  // ヘッダー行を作成
  const headerRow = headers.map(header => `"${header.label}"`).join(',');
  
  // データ行を作成
  const rows = data.map(item => {
    return headers
      .map(header => {
        const value = item[header.key];
        // 値がnullまたはundefinedの場合は空文字を返す
        if (value === null || value === undefined) {
          return '""';
        }
        // 文字列の場合はダブルクォートでエスケープ
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(',');
  });
  
  // CSVコンテンツを作成
  const csvContent = [headerRow, ...rows].join('\n');
  
  // BOMを追加してUTF-8エンコーディングを明示
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // ダウンロードリンクを作成
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${formatDate(new Date())}.csv`;
  
  // リンクをクリックしてダウンロード開始
  document.body.appendChild(link);
  link.click();
  
  // リンクを削除
  document.body.removeChild(link);
}

/**
 * 日付を YYYYMMDD_HHMMSS 形式にフォーマットする関数
 * @param date フォーマットする日付
 * @returns フォーマットされた日付文字列
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}
