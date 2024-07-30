import { IPlayerFilters } from "../../api/dto/IPlayer";

export const generateODataQueryPlayers = (filterData: IPlayerFilters | undefined) => {
  if (!filterData) {
    return "$count=true";
  }

  const sizePage = 10;
  const skipValue = filterData.pagination * sizePage - sizePage;

  let oDataQuery = `$count=true&$skip=${skipValue}&$top=${sizePage}`;
  if (filterData.fullname || filterData.position || filterData.team) {
    const filters: string[] = [];

    if (filterData.fullname) {
      const name = filterData.fullname.split(" ");
      if (name[1]) {
        filters.push(
          `(contains(tolower(firstName), '${encodeURIComponent(filterData.fullname.toLowerCase())}' )` +
            ` or ` +
            `contains(tolower(lastName), '${encodeURIComponent(name[1].toLowerCase())}' )` +
            ` and ` +
            `contains(tolower(firstName), '${encodeURIComponent(name[0].toLowerCase())}' )` +
            ` or ` +
            `contains(tolower(firstName), '${encodeURIComponent(name[1].toLowerCase())}' )` +
            ` and ` +
            `contains(tolower(lastName), '${encodeURIComponent(name[0].toLowerCase())}' )` +
            ` or ` +
            `contains(tolower(lastName), '${encodeURIComponent(filterData.fullname.toLowerCase())}' ))`
        );
      } else {
        filters.push(
          `(contains(tolower(firstName), '${encodeURIComponent(filterData.fullname.toLowerCase())}' )` +
            ` or ` +
            `contains(tolower(lastName), '${encodeURIComponent(filterData.fullname.toLowerCase())}' ))`
        );
      }
    }

    if (filterData.position) {
      filters.push(`Position/Id eq ${filterData.position}`);
    }
    if (filterData.team) {
      filters.push(`Team/Id eq ${filterData.team}`);
    }
    oDataQuery += `&$filter=${filters.join(" and ")}`;
  }
  if (filterData.sorting) {
    if (filterData.sorting.includes("season")) {
      const season = filterData.sorting.split(" ");
      season[0] = "Season/Name";
      oDataQuery += `&$orderby=${season[0]} ${season[1]}`;
    } else if (filterData.sorting.includes("position")) {
      const position = filterData.sorting.split(" ");
      position[0] = "Position/Name";
      oDataQuery += `&$orderby=${position[0]} ${position[1]}`;
    } else if (filterData.sorting.includes("team")) {
      const team = filterData.sorting.split(" ");
      team[0] = "Team/Name";
      oDataQuery += `&$orderby=${team[0]} ${team[1]}`;
    } else if (filterData.sorting.includes("undefined")) {
      const name = filterData.sorting.split(" ");
      name[0] = "firstName";
      oDataQuery += `&$orderby=${name[0]} ${name[1]}`;
    } else if (!filterData.sorting.includes("season" || "team" || "position")) {
      oDataQuery += `&$orderby=${filterData.sorting}`;
    }
  } else {
    oDataQuery += `&$orderby=createdUtc desc`;
  }

  return oDataQuery;
};
