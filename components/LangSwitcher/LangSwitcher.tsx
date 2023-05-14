import React from "react";
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import Link from 'next/link';

export const LangSwitcher: React.FC = () => {
    const { t } = useTranslation();
    const router = useRouter()
    const { pathname, asPath, query } = router
    const nextLocale = router.locale === "en" ? "vi" : "en";

    return <Link href={{pathname, query}} locale={nextLocale}>{nextLocale === "en" ? t("Tiếng Anh") : t("Tiếng Việt")}</Link>
};