
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField as FormFieldType } from '@/types';

interface DynamicFormProps {
  fields: FormFieldType[];
  defaultValues?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
}

export function DynamicForm({
  fields,
  defaultValues = {},
  onSubmit,
  onCancel,
  isLoading = false,
  submitText = 'حفظ',
  cancelText = 'إلغاء',
}: DynamicFormProps) {
  // Generate Zod schema dynamically
  const schema = z.object(
    fields.reduce((acc, field) => {
      let fieldSchema: any;
      
      switch (field.type) {
        case 'email':
          fieldSchema = z.string().email('بريد إلكتروني غير صحيح');
          break;
        case 'number':
          fieldSchema = z.number().min(0, 'يجب أن تكون القيمة أكبر من أو تساوي 0');
          break;
        case 'checkbox':
          fieldSchema = z.boolean();
          break;
        case 'date':
          fieldSchema = z.string();
          break;
        default:
          fieldSchema = z.string();
      }
      
      if (field.required && field.type !== 'checkbox') {
        fieldSchema = fieldSchema.min(1, 'هذا الحقل مطلوب');
      }
      
      if (!field.required) {
        fieldSchema = fieldSchema.optional();
      }
      
      acc[field.name] = fieldSchema;
      return acc;
    }, {} as Record<string, any>)
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const renderField = (field: FormFieldType) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            className="min-h-20"
          />
        );
      
      case 'select':
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || 'اختر...'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-${option.value}`}
                  value={option.value}
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <Checkbox />
        );
      
      case 'number':
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            min="0"
            step="0.01"
          />
        );
      
      case 'email':
        return (
          <Input
            type="email"
            placeholder={field.placeholder}
          />
        );
      
      case 'date':
        return (
          <Input
            type="date"
            placeholder={field.placeholder}
          />
        );
      
      case 'time':
        return (
          <Input
            type="time"
            placeholder={field.placeholder}
          />
        );
      
      case 'datetime':
        return (
          <Input
            type="datetime-local"
            placeholder={field.placeholder}
          />
        );
      
      default:
        return (
          <Input
            type="text"
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={field.type === 'textarea' ? 'md:col-span-2' : ''}
            >
              <FormField
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                      {React.cloneElement(renderField(field), {
                        ...formField,
                        value: formField.value || '',
                      })}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          ))}
        </div>
        
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'جاري الحفظ...' : submitText}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              {cancelText}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
