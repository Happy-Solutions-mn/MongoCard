import type { Metadata } from "next";
import { SettingsView } from "@/features/settings/components/settings-view";

export const metadata: Metadata = {
  title: "Тохиргоо",
  description:
    "МонгоКарт аппын тохиргоо: дуу, чичиргээ, насны баталгаа, өөрийн карт.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
