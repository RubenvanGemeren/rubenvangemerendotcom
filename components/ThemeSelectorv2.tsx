"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTheme } from "@/lib/theme-context";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button"
import { Sun as SunIcon } from "lucide-react"
import { Moon as MoonIcon } from "lucide-react"

export function ThemeSwitchButton() {
  const { themeName, setTheme } = useTheme();
  const { t } = useI18n();

  if (themeName === "default") {
    return (
      <Button onClick={() => setTheme("dark")} variant="outline" size="icon" aria-label={t("common.ariaLabels.selectTheme")}>
        <SunIcon />
      </Button>
    )
  } else if (themeName === "dark") {
    return (
      <Button onClick={() => setTheme("default")} variant="outline" size="icon" aria-label={t("common.ariaLabels.selectTheme")}>
        <MoonIcon />
      </Button>
    )
  }
}

export function ThemeSelectorv2() {
  const { themeName, setTheme } = useTheme();
  const { t } = useI18n();

  return (
    <Select value={themeName} onValueChange={setTheme}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t("common.ariaLabels.selectTheme")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
