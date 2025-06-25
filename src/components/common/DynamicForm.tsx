
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
  defaultValues?: Record<string, any>;
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
  // Create dynamic Zod schema based on fields
  const createSchema = () => {
    const schemaObj: Record<string, any> = {};
    
    fields.forEach((field) => {
      let fieldSchema;
      
      switch (field.type) {
        case 'email':
          fieldSchema = z.string().email('البريد الإلكتروني غير صحيح');
          break;
        case 'number':
          fieldSchema = z.coerce.number().min(0, 'القيمة يجب أن تكون صفر أو أكثر');
          break;
        case 'checkbox':
          fieldSchema = z.boolean().optional();
          break;
        default:
          fieldSchema = z.string();
      }
      
      if (field.required && field.type !== 'checkbox') {
        fieldSchema = fieldSchema.min(1, 'هذا الحقل مطلوب');
      } else if (!field.required) {
        fieldSchema = fieldSchema.optional();
      }
      
      schemaObj[field.name] = fieldSchema;
    });
    
    return z.object(schemaObj);
  };

  const form = useForm({
    resolver: zodResolver(createSchema()),
    defaultValues,
  });

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  const renderField = (field: FormFieldType) => {
    return (
      <FormField
        key={field.name}
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            <FormLabel className="text-right">
              {field.label}
              {field.required && <span className="text-red-500 mr-1">*</span>}
            </FormLabel>
            <FormControl>
              {field.type === 'textarea' ? (
                <Textarea
                  {...formField}
                  placeholder={field.placeholder}
                  className="resize-none"
                />
              ) : field.type === 'select' ? (
                <Select onValueChange={formField.onChange} value={formField.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder || 'اختر قيمة'} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                  <span className="text-sm">{field.placeholder}</span>
                </div>
              ) : (
                <Input
                  {...formField}
                  type={field.type}
                  placeholder={field.placeholder}
                  step={field.type === 'number' ? '0.01' : undefined}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => renderField(field))}
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                {cancelText}
              </Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'جاري الحفظ...' : submitText}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
