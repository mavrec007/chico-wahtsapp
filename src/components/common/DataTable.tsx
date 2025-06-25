
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Download, Trash2, Plus, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { TableColumn, PaginatedResponse, PaginationParams } from '@/types';

interface DataTableProps<T> {
  title: string;
  data?: PaginatedResponse<T>;
  columns: TableColumn<T>[];
  isLoading?: boolean;
  error?: Error | null;
  searchPlaceholder?: string;
  onSearch?: (search: string) => void;
  onFilter?: (filters: Record<string, any>) => void;
  onSort?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onPaginate?: (params: PaginationParams) => void;
  onCreateNew?: () => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onBulkDelete?: (ids: string[]) => void;
  onExport?: (format: 'csv' | 'pdf') => void;
  selectedItems?: string[];
  onSelectionChange?: (ids: string[]) => void;
  filters?: Array<{
    key: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
}

export function DataTable<T extends { id: string }>({
  title,
  data,
  columns,
  isLoading = false,
  error,
  searchPlaceholder = 'البحث...',
  onSearch,
  onFilter,
  onSort,
  onPaginate,
  onCreateNew,
  onEdit,
  onDelete,
  onBulkDelete,
  onExport,
  selectedItems = [],
  onSelectionChange,
  filters = [],
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilters, setCurrentFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...currentFilters, [key]: value };
    setCurrentFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleSort = (columnKey: string) => {
    const newSortOrder = sortBy === columnKey && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(columnKey);
    setSortOrder(newSortOrder);
    onSort?.(columnKey, newSortOrder);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && data?.data) {
      onSelectionChange?.(data.data.map(item => item.id));
    } else {
      onSelectionChange?.([]);
    }
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    if (checked) {
      onSelectionChange?.([...selectedItems, id]);
    } else {
      onSelectionChange?.(selectedItems.filter(item => item !== id));
    }
  };

  const allSelected = data?.data ? selectedItems.length === data.data.length : false;
  const someSelected = selectedItems.length > 0 && selectedItems.length < (data?.data?.length || 0);

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            خطأ في تحميل البيانات: {error.message}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {onCreateNew && (
              <Button onClick={onCreateNew} className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة جديد
              </Button>
            )}
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {filters.map((filter) => (
              <Select
                key={filter.key}
                value={currentFilters[filter.key] || ''}
                onValueChange={(value) => handleFilterChange(filter.key, value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={filter.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الكل</SelectItem>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            
            {onExport && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onExport('csv')}>
                    تصدير CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport('pdf')}>
                    تصدير PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg"
          >
            <span className="text-sm text-blue-700">
              تم تحديد {selectedItems.length} عنصر
            </span>
            {onBulkDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkDelete(selectedItems)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                حذف المحدد
              </Button>
            )}
          </motion.div>
        )}
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {onSelectionChange && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={handleSelectAll}
                      className={someSelected ? 'opacity-50' : ''}
                    />
                  </TableHead>
                )}
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={() => column.sortable && handleSort(String(column.key))}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && sortBy === column.key && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-12">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {isLoading ? (
                  // Loading skeleton
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      {onSelectionChange && (
                        <TableCell>
                          <Skeleton className="h-4 w-4" />
                        </TableCell>
                      )}
                      {columns.map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : data?.data && data.data.length > 0 ? (
                  data.data.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      {onSelectionChange && (
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.includes(record.id)}
                            onCheckedChange={(checked) => handleSelectItem(record.id, checked as boolean)}
                          />
                        </TableCell>
                      )}
                      {columns.map((column) => (
                        <TableCell key={String(column.key)}>
                          {column.render
                            ? column.render(
                                column.key.toString().includes('.')
                                  ? column.key.toString().split('.').reduce((obj, key) => obj?.[key], record as any)
                                  : (record as any)[column.key],
                                record
                              )
                            : String((record as any)[column.key] || '-')}
                        </TableCell>
                      ))}
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {onEdit && (
                              <DropdownMenuItem onClick={() => onEdit(record)}>
                                تعديل
                              </DropdownMenuItem>
                            )}
                            {onDelete && (
                              <DropdownMenuItem
                                onClick={() => onDelete(record)}
                                className="text-red-600"
                              >
                                حذف
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (onSelectionChange ? 2 : 1)}
                      className="h-24 text-center"
                    >
                      لا توجد بيانات
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-2 py-4">
            <div className="text-sm text-muted-foreground">
              عرض {((data.page - 1) * data.pageSize) + 1} إلى{' '}
              {Math.min(data.page * data.pageSize, data.total)} من {data.total} نتيجة
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPaginate?.({ 
                  page: data.page - 1, 
                  pageSize: data.pageSize 
                } as PaginationParams)}
                disabled={data.page <= 1}
              >
                <ChevronRight className="h-4 w-4" />
                السابق
              </Button>
              <span className="text-sm">
                الصفحة {data.page} من {data.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPaginate?.({ 
                  page: data.page + 1, 
                  pageSize: data.pageSize 
                } as PaginationParams)}
                disabled={data.page >= data.totalPages}
              >
                التالي
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
