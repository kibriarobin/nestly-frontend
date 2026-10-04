import type { Metadata } from "next";
import PropertyManager from "@/components/modules/owner/manage/PropertyManager";

export const metadata: Metadata = { title: "Manage Property" };

export default async function ManagePropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PropertyManager id={id} />;
}
