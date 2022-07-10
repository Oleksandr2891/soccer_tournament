import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewMatchScore } from "../redux/reducer/dataMatches";
import { getMatches } from "../redux/sectors.js/selector";
import { configTable, configWighoutHeader } from "./headerTable";

const Row = ({ rowData, idxRow, configWithHeader, newTeams, oldTeams }) => {
  const [newFirstTeamScore, setNewFirstTeamScore] = useState("");
  const [newSecondTeamScore, setSecondTeamScore] = useState("");
  const [newfirstTeamName, setFirstTeamName] = useState("");
  const [newSecondTeamName, setSecondTeamName] = useState("");
  const [optionsForSelect1, setOptionsForSelect1] = useState([]);
  const [optionsForSelect2, setOptionsForSelect2] = useState([]);

  const dispatch = useDispatch();
  const { matches } = useSelector(getMatches);

  const config = configWithHeader ? configTable : configWighoutHeader;

  function submitRow(value, nameOfField) {
    if (value !== "") {
      if (nameOfField === "firstTeamScore") {
        setNewFirstTeamScore(value);
      } else if (nameOfField === "secondTeamScore") {
        setSecondTeamScore(value);
      } else if (nameOfField === "firstTeamName") {
        setFirstTeamName(value);
        updateOption();
      } else if (nameOfField === "secondTeamName") {
        setSecondTeamName(value);
        updateOption();
      }
    }
  }

  useEffect(() => {
    if (newfirstTeamName !== "" && newSecondTeamName !== "") {
      dispatch(
        createNewMatchScore({
          ...rowData,
          firstTeamName: newfirstTeamName,
          secondTeamName: newSecondTeamName,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newfirstTeamName, newSecondTeamName]);

  useEffect(() => {
    if (
      newFirstTeamScore !== "" &&
      newSecondTeamScore !== "" &&
      rowData.firstTeamName &&
      rowData.secondTeamName
    ) {
      dispatch(
        createNewMatchScore({
          ...rowData,
          firstTeamScore: newFirstTeamScore,
          secondTeamScore: newSecondTeamScore,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFirstTeamScore, newSecondTeamScore, rowData]);

  useEffect(() => {
    updateOption();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTeams, oldTeams, newfirstTeamName, newSecondTeamName, rowData]);

  function updateOption() {
    const options1 = [""];
    const options2 = [""];
    options1.push(newTeams);
    oldTeams?.forEach((team) => {
      if (team !== newfirstTeamName && team !== newSecondTeamName) {
        options2.push(team);
      } else if (team !== newfirstTeamName) {
        options2.push(team);
      }
    });
    setOptionsForSelect1(options1);
    setOptionsForSelect2(options2);
  }

  function onBlur(e) {
    submitRow(e.target.value, e.target.name);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      submitRow(e.target.value, e.target.name);
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
          return (
            <td key={idx}>
              {rowData.firstTeamName !== null ? (
                rowData.firstTeamName
              ) : (
                <select
                  name="firstTeamName"
                  className="inputForTeam"
                  onBlur={onBlur}
                >
                  {optionsForSelect1?.map((element, idx) => {
                    return (
                      <option key={idx} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              )}
            </td>
          );
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
          return (
            <td key={idx}>
              {rowData.secondTeamName !== null ? (
                rowData.secondTeamName
              ) : (
                <select
                  name="secondTeamName"
                  className="inputForTeam"
                  onBlur={onBlur}
                >
                  {optionsForSelect2?.map((element, idx) => {
                    return (
                      <option key={idx} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              )}
            </td>
          );
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
