
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SPORTS_CONFIG } from '@/config/sports';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Waves, Target, Users, Trophy } from 'lucide-react';

interface SportSelectorProps {
  selectedSport?: string;
  onSportSelect: (sportId: string) => void;
  className?: string;
}

const IconMap = {
  Waves,
  Target,
  Users,
  Trophy
};

export const SportSelector: React.FC<SportSelectorProps> = ({
  selectedSport,
  onSportSelect,
  className
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {SPORTS_CONFIG.map((sport) => {
        const IconComponent = IconMap[sport.icon as keyof typeof IconMap];
        const isSelected = selectedSport === sport.id;
        
        return (
          <Card
            key={sport.id}
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-lg',
              isSelected && 'ring-2 ring-primary border-primary',
              'dark:bg-gray-800 dark:border-gray-700'
            )}
            onClick={() => onSportSelect(sport.id)}
          >
            <CardContent className="p-6 text-center">
              <div className={cn(
                'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center',
                `bg-${sport.color}-100 dark:bg-${sport.color}-900/20`
              )}>
                <IconComponent className={cn(
                  'w-8 h-8',
                  `text-${sport.color}-600 dark:text-${sport.color}-400`
                )} />
              </div>
              
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
                {isRTL ? sport.nameAr : sport.name}
              </h3>
              
              <Badge variant="secondary" className="text-xs">
                {sport.facilities.length} {t('facilities', 'مرافق')}
              </Badge>
              
              {isSelected && (
                <div className="mt-3">
                  <Badge variant="default" className="bg-primary">
                    {t('selected', 'محدد')}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
