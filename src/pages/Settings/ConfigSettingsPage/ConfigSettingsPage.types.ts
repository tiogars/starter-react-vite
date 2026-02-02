export type ConfigSectionType = 'api' | 'app' | 'build';

export interface ConfigItem {
  key: string;
  value: string | boolean | undefined;
  description: string;
  section: ConfigSectionType;
  isSensitive?: boolean;
}

export interface ConfigSettingsPageProps {}
