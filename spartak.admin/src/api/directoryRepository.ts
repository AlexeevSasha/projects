import { BaseApiService } from "./BaseApiService";

class DirectoryRepository extends BaseApiService {
  constructor() {
    super("advertisement");
  }

  getUserLevels = async () => {
    return await this.get(`Directory/UserLevels`);
  };
}

export const directoryRepository = new DirectoryRepository();
