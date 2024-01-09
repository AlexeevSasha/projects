import { BaseResponce } from "common/interfaces/common";
import { Trainer, TrainerDto, TrainerFilters } from "common/interfaces/trainers";
import { BaseApiService } from "./BaseApiService";

class TrainersRepository extends BaseApiService {
  constructor() {
    super("match");
  }

  fetchByFilter = async (filter: TrainerFilters) => {
    const res = await this.get<BaseResponce<TrainerDto[]>>(
      `odata/Coach?$expand=Teams/team&${this.getODataQuery<TrainerFilters>(filter)}`
    );

    return { trainers: res.value, count: res["@odata.count"] };
  };

  fetchById = async (id: Trainer["Id"]) => {
    const { value } = await this.get<BaseResponce<TrainerDto[]>>(`odata/Coach?$expand=Teams/team&$filter=Id eq ${id}`);
    const {
      Citizenship: { CitizenshipId },
      Teams,
    } = value[0];

    return {
      ...value[0],
      CitizenshipId,
      TeamIds: Teams.map(({ Team }) => Team.Id),
      Teams: Teams.map(({ Team, SortOrder, Position }) => ({ TeamId: Team.Id, SortOrder, Position })),
    };
  };

  publish = async (trainer: Trainer) =>
    await this.post(
      `Coach/Publish${trainer.Id ? `?id=${trainer.Id}` : ""}`,
      JSON.stringify(this.mapTrainerToDto(trainer))
    );

  draft = async (trainer: Trainer) =>
    await this.post(
      `Coach/Draft${trainer.Id ? `?id=${trainer.Id}` : ""}`,
      JSON.stringify(this.mapTrainerToDto(trainer))
    );

  deleteTrainer = async (id: Trainer["Id"]) => await this.delete(`Coach/Delete?id=${id}`);

  mapTrainerToDto = ({ TeamIds, ...trainer }: Trainer) =>
    trainer.Section === "Site" ? { ...trainer, Teams: TeamIds.map((TeamId) => ({ TeamId })) } : trainer;
}

export const trainersRepository = new TrainersRepository();
