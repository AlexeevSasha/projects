import type { RcFile } from 'antd/es/upload';

export const acceptFiles = (extensions?: string[]): string => {
  if (extensions && extensions.length) {
    const microsoftTypes = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'pps'];
    const imageTypes = ['jpg', 'png', 'jpeg', 'gif', 'svg'];
    const octetStreamTypes = ['bin', 'exe', 'class', 'dms', 'lha', 'lzh'];
    let acceptExtensions = extensions?.map((extension) => {
      switch (true) {
        case microsoftTypes.includes(extension):
          return `.${extension}`;
        case imageTypes.includes(extension):
          return `image/${extension}`;
        case octetStreamTypes.includes(extension):
          return `application/octet-stream`;
        default:
          return `application/${extension}`;
      }
    });

    acceptExtensions = acceptExtensions.reduce<string[]>((result, item) => {
      return result.includes(item) ? result : [...result, item];
    }, []);

    return acceptExtensions.join(',');
  }
  return '';
};

export const acceptFilesNames = (extensions?: string[]): string => {
  if (extensions && extensions.length) {
    return extensions.join(', ');
  }
  return '';
};

export const fileLoadValidator = (
  file: string | RcFile | Blob,
  acceptTypes: string[] = [],
  maxMbSize: number = 10,
): {
  status: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (typeof file === 'string') {
    errors.push('Файл не поддерживается.');
    return { status: false, errors };
  }

  const fileName = (file as RcFile).name;
  const fileType = fileName.toLowerCase().split('.').pop() || file.type;
  const fileTypeAccept = !acceptTypes.length || acceptTypes.some((type) => type.includes(fileType));

  if (!fileTypeAccept) {
    errors.push('Файл неверного формата.');
  }

  const fileSizeAccept = file.size / 1024 / 1024 < maxMbSize;

  if (!fileSizeAccept) {
    errors.push(`Размер файла не должен превышать ${maxMbSize} МБ.`);
  }

  return { status: fileTypeAccept && fileSizeAccept, errors };
};
