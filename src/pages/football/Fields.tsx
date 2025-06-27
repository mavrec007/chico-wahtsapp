import React from 'react'
import { useTranslation } from 'react-i18next'

const FootballFields: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">{t('football.manageFields')}</h1>
      <p>{t('football.dummyContent')}</p>
    </div>
  );
}

export default FootballFields
