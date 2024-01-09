import type { UploadFile } from 'antd';

export type FeedbackFormValues = {
  title: string;
  text: string;
  files: {
    file: UploadFile;
    fileList: UploadFile[];
  };
  category: number;
  email: string;
};
