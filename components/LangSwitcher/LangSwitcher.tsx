import React from "react";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import Link from 'next/link';

export const LangSwitcher: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter()
    const { pathname, query } = router
    const nextLocale = router.locale === "en" ? "vi" : "en";

    return <div>
      {t('Ngôn ngữ')} &nbsp;
      <Link href={{pathname, query}} locale={nextLocale}>{router.locale === "vi" ? t("Tiếng Việt") : t("Tiếng Anh")}</Link>
    </div>
};
