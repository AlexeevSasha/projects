export const errorsFilesExport: Record<string, string> = {
  500: "serverError",
  502: "server502",
  400: "fileExport400",
  403: "fileExport403",
  404: "fileExport404",
  409: "fileExport409",
  412: "fileExport412",
  errorAccess: "errorAccessFileExport"
};

export const errorsFilesExportWithBody: Record<string, Record<string, string>> = {
  400: {
    UniqueViolateException: "existErrorFileExport",
    EntityInUseException: "useErrorFileExport",
    EntityChangeRestrictException: "notChangedFileExport"
  },
  404: {
    EntityNotFoundException: "deletedErrorFileExport"
  },
  409: {
    DbUpdateConcurrencyException: "сhangedErrorFileExport",
    AlreadyExistException: "existErrorFileExport",
    UniqueViolateException: "existErrorFileExport",
    ObjectAlreadyExists: "existError"
  },
  412: {
    InvalidPreconditionException: "tokenErrorFileExport"
  }
};
