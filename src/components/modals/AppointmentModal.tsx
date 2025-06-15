import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Plus, Settings, Users, Target, Waves, Phone, User, FileText, Calculator } from 'lucide-react';
import { format } from 'date-fns';
import { activities } from '@/config/environment';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  activityType: string;
  subType: string;
  selectedDate: Date | undefined;
  selectedTime: string;
  duration: number;
  customerPhone: string;
  customerName: string;
  notes: string;
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const { isRTL, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'details' | 'management'>('details');
  const [formData, setFormData] = useState<FormData>({
    activityType: '',
    subType: '',
    selectedDate: undefined,
    selectedTime: '',
    duration: 1,
    customerPhone: '',
    customerName: '',
    notes: ''
  });

  useEffect(() => {
    const calculatePrice = () => {
      if (!formData.activityType || !formData.subType || !formData.duration) {
        setTotalPrice(0);
        return;
      }

      let pricePerHour = 0;
      const activityCategory = activities[formData.activityType as keyof typeof activities];
      if (activityCategory) {
        const selectedActivity = activityCategory.types.find(type => type.id === formData.subType);
        if (selectedActivity) {
          pricePerHour = selectedActivity.pricePerHour;
        }
      }

      setTotalPrice(pricePerHour * formData.duration);
    };

    calculatePrice();
  }, [formData.activityType, formData.subType, formData.duration]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (formData.activityType && formData.subType) {
      const activityCategory = activities[formData.activityType as keyof typeof activities];
      if (activityCategory) {
        const selectedActivity = activityCategory.types.find(type => type.id === formData.subType);
        if (selectedActivity) {
          setAvailableTimes(selectedActivity.availableHours);
        }
      }
    }
  }, [formData.activityType, formData.subType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating appointment:', formData);
    onClose();
  };

  const handleTabChange = (value: string) => {
    if (value === 'details' || value === 'management') {
      setActiveTab(value);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className={`text-xl font-bold text-gray-900 dark:text-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
            {t('appointment.title')}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="details" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Plus className="h-4 w-4" />
              <span>{t('appointment.bookingDetails')}</span>
            </TabsTrigger>
            <TabsTrigger value="management" className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
              <Settings className="h-4 w-4" />
              <span>{t('appointment.management')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Activity Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className={`text-lg flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <Target className="h-5 w-5 text-blue-600" />
                        <span>{t('appointment.selectActivity')}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="activityType">{t('appointment.activityType')}</Label>
                        <Select
                          value={formData.activityType}
                          onValueChange={(value) => setFormData(prev => ({ 
                            ...prev, 
                            activityType: value, 
                            subType: '',
                            selectedTime: ''
                          }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={t('appointment.selectType')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="courts">
                              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                                <Target className="h-4 w-4" />
                                <span>{t('appointment.courts')}</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="swimming">
                              <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                                <Waves className="h-4 w-4" />
                                <span>{t('appointment.swimming')}</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.activityType && (
                        <div>
                          <Label htmlFor="subType">{t('appointment.selectSubType')}</Label>
                          <Select
                            value={formData.subType}
                            onValueChange={(value) => setFormData(prev => ({ 
                              ...prev, 
                              subType: value,
                              selectedTime: ''
                            }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('appointment.selectSpecific')} />
                            </SelectTrigger>
                            <SelectContent>
                              {activities[formData.activityType as keyof typeof activities]?.types.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  <div className={`flex items-center justify-between w-full space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                                    <span>{type.name}</span>
                                    <Badge variant="secondary" className="text-xs">
                                      {type.pricePerHour} {t('table.riyal')}/h
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Date & Time Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className={`text-lg flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <CalendarIcon className="h-5 w-5 text-green-600" />
                        <span>{t('appointment.selectDate')}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>{t('appointment.date')}</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !formData.selectedDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {formData.selectedDate ? (
                                format(formData.selectedDate, "PPP")
                              ) : (
                                <span>{t('appointment.selectDate')}</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formData.selectedDate}
                              onSelect={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {availableTimes.length > 0 && (
                        <div>
                          <Label>{t('appointment.selectTime')}</Label>
                          <Select
                            value={formData.selectedTime}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, selectedTime: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t('appointment.selectTime')} />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTimes.map((time) => (
                                <SelectItem key={time} value={time}>
                                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                                    <Clock className="h-4 w-4" />
                                    <span>{time}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="duration">{t('appointment.duration')}</Label>
                        <Select
                          value={formData.duration.toString()}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, duration: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour} {t('table.hours')}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Customer Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className={`text-lg flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <User className="h-5 w-5 text-purple-600" />
                        <span>{t('appointment.customerInfo')}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="customerPhone">{t('appointment.phone')}</Label>
                        <div className="relative">
                          <Phone className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`} />
                          <Input
                            id="customerPhone"
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                            placeholder={t('appointment.phonePlaceholder')}
                            className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="customerName">{t('appointment.name')}</Label>
                        <div className="relative">
                          <User className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`} />
                          <Input
                            id="customerName"
                            type="text"
                            value={formData.customerName}
                            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                            placeholder={t('appointment.namePlaceholder')}
                            className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">{t('appointment.notes')}</Label>
                        <div className="relative">
                          <FileText className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-3 h-4 w-4 text-gray-400`} />
                          <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                            placeholder={t('appointment.notesPlaceholder')}
                            className={`${isRTL ? 'pr-10' : 'pl-10'} min-h-[80px]`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Price Calculation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className={`text-lg flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                        <Calculator className="h-5 w-5 text-orange-600" />
                        <span>{t('appointment.priceCalculation')}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className={`flex justify-between items-center ${isRTL ? 'text-right' : 'text-left'}`}>
                          <span className="text-gray-600 dark:text-gray-400">{t('appointment.pricePerHour')}:</span>
                          <span className="font-semibold">
                            {formData.activityType && formData.subType ? 
                              activities[formData.activityType as keyof typeof activities]?.types.find(t => t.id === formData.subType)?.pricePerHour || 0
                              : 0
                            } {t('table.riyal')}
                          </span>
                        </div>
                        <div className={`flex justify-between items-center ${isRTL ? 'text-right' : 'text-left'}`}>
                          <span className="text-gray-600 dark:text-gray-400">{t('appointment.totalHours')}:</span>
                          <span className="font-semibold">{formData.duration} {t('table.hours')}</span>
                        </div>
                        <div className={`flex justify-between items-center border-t pt-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{t('appointment.totalAmount')}:</span>
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {totalPrice} {t('table.riyal')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`flex space-x-4 ${isRTL ? 'space-x-reverse' : ''} pt-6 border-t`}>
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  {t('appointment.cancel')}
                </Button>
                <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  {t('appointment.createBooking')}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="management" className="mt-6">
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t('appointment.management')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Management features will be available here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
