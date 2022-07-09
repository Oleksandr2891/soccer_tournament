import { configTable, configWighoutHeader } from "./headerTable";

const Row = ({ rowData, idxRow, configWithHeader }) => {
  const config = configWithHeader ? configTable : configWighoutHeader;
  // eslint-disable-next-line array-callback-return
  const baseRow = config.map((column, idx) => {
    if (configWithHeader) {
      switch (column.name) {
        case "Place": {
          return <td key={`${rowData.rowNumber}${idx}`}>{idxRow}</td>;
        }
        case "Team": {
          return <td key={`${rowData.rowNumber}${idx}`}>{rowData.nameTeam}</td>;
        }
        case "Played": {
          return <td key={`${rowData.rowNumber}${idx}`}>{rowData.played}</td>;
        }
        case "Win": {
          return <td key={`${rowData.rowNumber}${idx}`}>{rowData.win}</td>;
        }
        case "Draw": {
          return <td key={`${rowData.rowNumber}${idx}`}>{rowData.draw}</td>;
        }
        case "Lost": {
          return <td key={`${rowData.rowNumber}${idx}`}>{rowData.lost}</td>;
        }
        case "Points": {
          return <td key={`${rowData.rowNumber}${idx}`}>{rowData.points}</td>;
        }
        default:
          // eslint-disable-next-line no-unused-expressions
          null;
      }
    } else {
      switch (column) {
        case "firstTeamName": {
          return <td key={idx}>{rowData.firstTeamName}</td>;
        }
        case "firstTeamScore": {
          return <td key={idx}>{rowData.firstTeamScore}</td>;
        }
        case "dots": {
          return <td key={idx}>:</td>;
        }
        case "secondTeamName": {
          return <td key={idx}>{rowData.secondTeamScore}</td>;
        }
        case "secondTeamScore": {
          return <td key={idx}>{rowData.secondTeamName}</td>;
        }
        default:
          // eslint-disable-next-line no-unused-expressions
          null;
      }
    }
  });
  return <tr className="row">{baseRow}</tr>;
};

export default Row;
