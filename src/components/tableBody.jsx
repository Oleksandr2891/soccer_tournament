import Row from "./row";
import matches from "../matches.json";

const tableData = [
  {
    id: 1,
    nameTeam: "Greece",
  },
  {
    id: 2,
    nameTeam: "Argentina",
  },
  {
    id: 3,
    nameTeam: "Germany",
  },
  {
    id: 4,
    nameTeam: "Italy",
  },
  {
    id: 5,
    nameTeam: "Ukraine",
  },
];

const TableBody = ({ tableCommonResults }) => {
  function createRowCommonScore(team, arr) {
    const newArr = arr.filter(
      (item) =>
        (item.firstTeamName === team && item.firstTeamScore !== null) ||
        (item.secondTeamName === team && item.secondTeamScore !== null)
    );

    const nameTeam = team;
    const played = newArr.length;
    const win = newArr.filter(
      (item) =>
        (item.firstTeamScore > item.secondTeamScore &&
          item.firstTeamName === team) ||
        (item.secondTeamScore > item.firstTeamScore &&
          item.secondTeamName === team)
    ).length;

    const draw = newArr.filter(
      (item) =>
        (item.firstTeamScore === item.secondTeamScore &&
          item.firstTeamName === team) ||
        (item.secondTeamScore === item.firstTeamScore &&
          item.secondTeamName === team)
    ).length;

    const lost = newArr.filter(
      (item) =>
        (item.firstTeamScore < item.secondTeamScore &&
          item.firstTeamName === team) ||
        (item.secondTeamScore < item.firstTeamScore &&
          item.secondTeamName === team)
    ).length;

    const points = win * 3 + draw * 1;

    return {
      nameTeam,
      played,
      win,
      draw,
      lost,
      points,
    };
  }

  function createDataCommonScore(arr) {
    const dataCommonScore = [];
    arr.forEach((item) => {
      dataCommonScore.push(createRowCommonScore(item.nameTeam, matches));
    });
    return dataCommonScore;
  }

  function sortDataCommonScore(arr) {
    return arr.sort((a, b) => b.points - a.points);
  }

  const data = tableCommonResults
    ? sortDataCommonScore(createDataCommonScore(tableData))
    : matches;
  const configWithHeader = tableCommonResults ? true : false;
  return (
    <tbody>
      {data.map((row, idx) => {
        return (
          <Row
            key={idx}
            rowData={row}
            idxRow={idx + 1}
            configWithHeader={configWithHeader}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
