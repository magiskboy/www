import React, { ChangeEventHandler } from 'react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';

export const ThemeSwitcher: React.FC = () => {
  const { setTheme, theme, themes } = useTheme();
  const { t } = useTranslation();

  const handler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setTheme(e.target.value);
  };

  return <div>
    <label> {t('Chế độ xem')} &nbsp;
      <select defaultValue={theme} onChange={handler}>
        {themes.map(theme => <option value={theme} key={theme}>{t(theme)}</option>)}
      </select>
    </label>
  </div>
}
