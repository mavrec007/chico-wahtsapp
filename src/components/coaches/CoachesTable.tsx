
import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { useCoaches, useBulkDeleteCoaches, useDeleteCoach } from '@/hooks/useCoaches';
import { useDataStore } from '@/stores/useDataStore';
import { Coach, TableColumn, PaginationParams } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export function CoachesTable() {
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 1,
    pageSize: 10,
  });

  const { data, isLoading, error, refetch } = useCoaches(paginationParams);
  const deleteCoachMutation = useDeleteCoach();
  const bulkDeleteMutation = useBulkDeleteCoaches();
  
  const {
    selectedItems,
    setSelectedItems,
    clearSelectedItems,
    openModal,
  } = useDataStore();

  const selectedCoaches = selectedItems['coaches'] || [];

  const columns: TableColumn<Coach>[] = [
    {
      key: 'specialty',
      label: 'التخصص',
      sortable: true,
      render: (value) => (
        <Badge variant="secondary">{value}</Badge>
      ),
    },
    {
      key: 'certification',
      label: 'الشهادة',
      sortable: true,
      render: (value) => value || 'غير محدد',
    },
    {
      key: 'experience_years',
      label: 'سنوات الخبرة',
      sortable: true,
      render: (value) => `${value || 0} سنة`,
    },
    {
      key: 'email',
      label: 'البريد الإلكتروني',
      render: (value) => value || 'غير محدد',
    },
    {
      key: 'phone',
      label: 'الهاتف',
      render: (value) => value || 'غير محدد',
    },
    {
      key: 'hourly_rate',
      label: 'الأجر بالساعة',
      sortable: true,
      render: (value) => `${value || 0} ريال`,
    },
    {
      key: 'created_at',
      label: 'تاريخ الإنشاء',
      sortable: true,
      render: (value) => format(new Date(value), 'dd/MM/yyyy', { locale: ar }),
    },
  ];

  const filters = [
    {
      key: 'specialty',
      label: 'التخصص',
      options: [
        { value: 'swimming', label: 'سباحة' },
        { value: 'football', label: 'كرة قدم' },
        { value: 'basketball', label: 'كرة سلة' },
        { value: 'tennis', label: 'تنس' },
      ],
    },
  ];

  const handleSearch = (search: string) => {
    setPaginationParams(prev => ({ ...prev, search, page: 1 }));
  };

  const handleFilter = (filters: Record<string, any>) => {
    setPaginationParams(prev => ({ ...prev, filters, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setPaginationParams(prev => ({ ...prev, sortBy, sortOrder }));
  };

  const handlePaginate = (params: PaginationParams) => {
    setPaginationParams(prev => ({ ...prev, ...params }));
  };

  const handleCreateNew = () => {
    openModal('coach-form', 'create');
  };

  const handleEdit = (coach: Coach) => {
    openModal('coach-form', 'edit', coach);
  };

  const handleDelete = async (coach: Coach) => {
    if (confirm('هل أنت متأكد من حذف هذا المدرب؟')) {
      await deleteCoachMutation.mutateAsync(coach.id);
      refetch();
    }
  };

  const handleBulkDelete = async (ids: string[]) => {
    if (confirm(`هل أنت متأكد من حذف ${ids.length} مدرب؟`)) {
      await bulkDeleteMutation.mutateAsync(ids);
      clearSelectedItems('coaches');
      refetch();
    }
  };

  const handleSelectionChange = (ids: string[]) => {
    setSelectedItems('coaches', ids);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Implement export functionality
    console.log(`Exporting coaches as ${format}`);
  };

  return (
    <DataTable
      title="إدارة المدربين"
      data={data}
      columns={columns}
      isLoading={isLoading}
      error={error}
      searchPlaceholder="البحث في المدربين..."
      onSearch={handleSearch}
      onFilter={handleFilter}
      onSort={handleSort}
      onPaginate={handlePaginate}
      onCreateNew={handleCreateNew}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onBulkDelete={handleBulkDelete}
      onExport={handleExport}
      selectedItems={selectedCoaches}
      onSelectionChange={handleSelectionChange}
      filters={filters}
    />
  );
}
