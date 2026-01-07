import { PathName } from "@/routers/types";

export interface NavItemType {
  id: string;
  name: string;
  href?: PathName;
  targetBlank?: boolean;
  children?: NavItemType[];
  type?: "dropdown" | "megaMenu" | "none";
  isNew?: boolean;
}











