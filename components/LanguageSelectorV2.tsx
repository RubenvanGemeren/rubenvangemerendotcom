"use client";

import { useI18n } from "@/lib/i18n-context";
import { useTheme } from "@/lib/theme-context";
import { availableLocales, type Locale } from "@/locales";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function LanguageSelectorV2() {
  const { locale, setLocale, availableLocales: available, t } = useI18n();
  const { theme } = useTheme();
  const selector = theme.components.themeSelector;

  return (
    <div className="relative">
      <Select
        value={locale}
        onValueChange={setLocale}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={t("common.nav.languages.default")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="en-EN">{t("common.nav.languages.en")}</SelectItem>
            <SelectItem value="nl-NL">{t("common.nav.languages.nl")}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}