import Row from "./row";
import matches from "../matches.json";

const tableData = [
  {
    id: 1,
    name: "Greece",
    played: 2,
    win: 2,
    draw: 0,
    lost: 0,
    points: 6,
  },
  {
    id: 2,
    name: "Argemtina",
    played: 2,
    win: 1,
    draw: 0,
    lost: 1,
    points: 3,
  },
  {
    id: 3,
    name: "Germany",
    played: 1,
    win: 0,
    draw: 1,
    lost: 0,
    points: 1,
  },
  {
    id: 4,
    name: "Italy",
    played: 3,
    win: 0,
    draw: 1,
    lost: 2,
    points: 1,
  },
];

const TableBody = ({ tableCommonResults }) => {
  // function createDataMathes(obj) {
  //   let dataMatches = [];
  //   obj.forEach((item, idx) => {
  //     for (var key in item) {
  //       let newItem = {};
  //       dataMatches.push({
  //         ...newItem,
  //         ...{ match: idx, team: key, goal: item[key] },
  //       });
  //     }
  //   });
  //   return dataMatches;
  // }

  function createScorePlayed(team, arr) {
    return arr.filter(
      (item) =>
        (item.firstTeamName === team && item.firstTeamScore) ||
        (item.secondTeamName === team && item.secondTeamScore)
    ).length;
  }

  function createScoreWin(team, arr) {
    return arr
      .filter(
        (item) =>
          (item.firstTeamName === team && item.firstTeamScore) ||
          (item.secondTeamName === team && item.secondTeamScore)
      )
      .filter(
        (item) =>
          (item.firstTeamScore > item.secondTeamScore &&
            item.firstTeamName === team) ||
          (item.secondTeamScore > item.firstTeamScore &&
            item.secondTeamName === team)
      ).length;
  }

  function createScoreDraw(team, arr) {
    return arr
      .filter(
        (item) =>
          (item.firstTeamName === team && item.firstTeamScore) ||
          (item.secondTeamName === team && item.secondTeamScore)
      )
      .filter(
        (item) =>
          (item.firstTeamScore === item.secondTeamScore &&
            item.firstTeamName === team) ||
          (item.secondTeamScore === item.firstTeamScore &&
            item.secondTeamName === team)
      ).length;
  }

  // function createScoreDraw(team, arr) {
  //   return arr
  //     .filter(
  //       (item) =>
  //         (item.firstTeamName === team && item.firstTeamScore) ||
  //         (item.secondTeamName === team && item.secondTeamScore)
  //     )
  //     .filter(
  //       (item) =>
  //         (item.firstTeamScore === item.secondTeamScore &&
  //           item.firstTeamName === team) ||
  //         (item.secondTeamScore === item.firstTeamScore &&
  //           item.secondTeamName === team)
  //     ).length;
  // }

  console.log(
    "createScorePlayed(team, arr)",
    createScorePlayed("Argentina", matches),
    "createScoreWin(team, arr)",
    createScoreWin("Argentina", matches),
    "createScoreDraw(team, arr)",
    createScoreDraw("Argentina", matches)
  );

  const data = tableCommonResults ? tableData : matches;
  const configWithHeader = tableCommonResults ? true : false;
  return (
    <tbody>
      {data.map((row, idx) => {
        return (
          <Row key={idx} rowData={row} configWithHeader={configWithHeader} />
        );
      })}
    </tbody>
  );
};

export default TableBody;
