import { BaseApiService } from "./BaseApiService";
import { IBirthdayPeople } from "./dto/IBirthdayPeople";

class BirthdayPeopleRepository extends BaseApiService {
  constructor() {
    super("match/BirthdayPersons");
  }
  fetchBirthdayPeople = () => this.get<IBirthdayPeople>("/Get");
}

export const birthdayPeopleRepository = new BirthdayPeopleRepository();
