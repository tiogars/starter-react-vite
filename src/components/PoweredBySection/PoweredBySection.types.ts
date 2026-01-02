import type { PoweredBySectionProps } from "./PoweredBySection.types";

export interface PoweredByLink {
  label: string;
  url: string;
  Icon: React.ComponentType<{ fontSize?: string }>;
}

export interface PoweredBySectionProps {
  links?: PoweredByLink[];
}
