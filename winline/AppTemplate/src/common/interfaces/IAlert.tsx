export interface IAlert {
  description: string | JSX.Element;
  message?: string | boolean;
  type: "success" | "info" | "warning" | "error" | undefined;
  style?: Record<string, string | number>;
}
