export interface IField {
  disabled?: boolean;
  placeholder?: string;
  name: string;
  label?: string;
  validator?: (_: unknown, value: string) => Promise<void>;
  rules?: { required: boolean; max?: number; type?: string };
}
