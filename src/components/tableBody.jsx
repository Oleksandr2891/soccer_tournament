import { useSelector } from "react-redux";
import Row from "./row";
import { getTeamName } from "../redux/sectors.js/selector";
import { getMatches } from "../redux/sectors.js/selector";
import { useEffect, useState } from "react";

const initalId = 1;

const TableBody = ({ tableCommonResults }) => {
  const { teamsNames } = useSelector(getTeamName);
  const dataMatches = useSelector(getMatches);
  const [matches, setMatches] = useState();
  const [newTeams, setNewTeams] = useState();
  const [oldTeams, setOldTeams] = useState();
  const [dataForRowMatches, setDataForRowMatches] = useState();
  const [newData, setNewData] = useState();

  useEffect(() => {
    setMatches(dataMatches.matches);
    setDataForRowMatches(
      sortDataCommonScore(
        createDataCommonScore(teamsNames, dataMatches.matches)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsNames, dataMatches]);

  useEffect(() => {
    const arrPlayed = createDataCommonScore(
      teamsNames,
      dataMatches.matches
    ).filter((item) => item.played !== teamsNames?.length - 1);
    if (teamsNames.length > 2 && !!arrPlayed?.length) {
      const teamWithoutAllPlay = [];
      if (teamsNames.length < 4) {
        setNewTeams([teamsNames[0].nameTeam]);
        setOldTeams([teamsNames[1].nameTeam, teamsNames[2].nameTeam]);
      } else if (!dataMatches.matches?.length) {
        setNewTeams([teamsNames[0].nameTeam]);
        teamsNames?.forEach((team) => {
          if (team.nameTeam !== teamsNames[0].nameTeam)
            teamWithoutAllPlay.push(team.nameTeam);
        });
        setOldTeams(teamWithoutAllPlay);
      } else {
        teamsNames?.forEach((team) => {
          if (team.nameTeam !== teamsNames[0].nameTeam)
            teamWithoutAllPlay.push(team.nameTeam);
        });
        setNewTeams(teamWithoutAllPlay);
        setOldTeams(teamWithoutAllPlay);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataMatches, teamsNames]);

  useEffect(() => {
    const arrPlayed = createDataCommonScore(
      teamsNames,
      dataMatches.matches
    ).filter((item) => item.played !== teamsNames?.length - 1);
    const gameOver = dataMatches.matches?.filter(
      (match) => match.firstTeamScore !== null
    );
    if (
      newTeams?.length ||
      oldTeams?.length ||
      !!gameOver?.length ||
      !!arrPlayed?.length
    ) {
      setMatches((prevState) => {
        const newItem = {
          match: prevState.length
            ? Math.max(...prevState.map((item) => item.match)) + 1
            : initalId,
          firstTeamName: null,
          firstTeamScore: null,
          secondTeamName: null,
          secondTeamScore: null,
        };
        const data = [...prevState, newItem];
        return data;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsNames, dataMatches]);

  useEffect(() => {
    setNewData(tableCommonResults ? dataForRowMatches : matches);
  }, [dataForRowMatches, tableCommonResults, matches]);

  function createRowCommonScore(team, arr) {
    const newArr = arr?.filter(
      (item) =>
        (item.firstTeamName === team && item.firstTeamScore !== null) ||
        (item.secondTeamName === team && item.secondTeamScore !== null)
    );

    const nameTeam = team;
    const played = newArr?.length;
    const win = newArr?.filter(
      (item) =>
        (item.firstTeamScore > item.secondTeamScore &&
          item.firstTeamName === team) ||
        (item.secondTeamScore > item.firstTeamScore &&
          item.secondTeamName === team)
    ).length;

    const draw = newArr?.filter(
      (item) =>
        (item.firstTeamScore === item.secondTeamScore &&
          item.firstTeamName === team) ||
        (item.secondTeamScore === item.firstTeamScore &&
          item.secondTeamName === team)
    ).length;

    const lost = newArr?.filter(
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

  function createDataCommonScore(arrTeams, arrMatches) {
    const dataCommonScore = [];
    arrTeams?.forEach((item) => {
      dataCommonScore.push(createRowCommonScore(item.nameTeam, arrMatches));
    });
    return dataCommonScore;
  }

  function sortDataCommonScore(arr) {
    return arr.sort((a, b) => b.points - a.points);
  }

  const configWithHeader = tableCommonResults ? true : false;
  return (
    <tbody>
      {newData?.map((row, idx) => {
        return (
          <Row
            key={idx}
            rowData={row}
            idxRow={idx + 1}
            configWithHeader={configWithHeader}
            newTeams={newTeams}
            oldTeams={oldTeams}
          />
        );
      })}
    </tbody>
  );
};

export default TableBody;
