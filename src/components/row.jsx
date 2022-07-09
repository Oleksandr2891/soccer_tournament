// import { useState } from "react";
import { configTable, configWighoutHeader } from "./headerTable";

const Row = ({ rowData, idxRow, configWithHeader }) => {
  // const [editedRow, setEditedRow] = useState({});
  const config = configWithHeader ? configTable : configWighoutHeader;

  function submitRow(value, idOfFIeld, nameOfField) {
    const row = rowData;
    console.log("value", value);
    if (value !== "") {
      if (nameOfField === "firstTeamScore") {
        row.firstTeamScore = value;
      } else {
        row.secondTeamScore = value;
      }

      if (row.firstTeamScore !== null && row.secondTeamScore !== null) {
        console.log("row", row);
      }
    }
  }

  function onBlur(e) {
    // console.log("потеря фокуса", e.target.value, e.target.id);
    submitRow(e.target.value, e.target.id, e.target.name);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      // console.log("нажат ентер", e.target, e.target.id);
      submitRow(e.target.value, e.target.id, e.target.name);
      e.target.blur();
    }
  }

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
          return (
            <td key={idx}>
              {rowData.firstTeamScore !== null ? (
                rowData.firstTeamScore
              ) : (
                <input
                  className="inputForScore"
                  type="number"
                  id={`${rowData.firstTeamName}`}
                  name="firstTeamScore"
                  onBlur={onBlur}
                  onKeyDown={handleKeyPress}
                />
              )}
            </td>
          );
        }
        case "dots": {
          return <td key={idx}>:</td>;
        }
        case "secondTeamName": {
          return (
            <td key={idx}>
              {rowData.secondTeamScore !== null ? (
                rowData.secondTeamScore
              ) : (
                <input
                  className="inputForScore"
                  type="number"
                  id={`${rowData.secondTeamName}`}
                  name="secondTeamScore"
                  onBlur={onBlur}
                  onKeyDown={handleKeyPress}
                />
              )}
            </td>
          );
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
