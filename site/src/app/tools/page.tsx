import type { Metadata } from "next";
import ToolsDirectoryClient from "./ToolsDirectoryClient";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://aiproductivityhub.co/tools/",
  },
};

export default function ToolsPage() {
  return <ToolsDirectoryClient />;
}
