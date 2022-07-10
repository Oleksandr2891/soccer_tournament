import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTeam } from "../redux/reducer/tableTeamName";
import { getTeamName } from "../redux/sectors.js/selector";

const initalId = 1;

export function Header() {
  const dispatch = useDispatch();
  const { teamsNames } = useSelector(getTeamName);
  const [nameTeam, setNameTeam] = useState("");
  const handleChangeInput = (event) => {
    const { value } = event.currentTarget;
    setNameTeam(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isContact = teamsNames.some(
      (item) => item.nameTeam.toLowerCase() === nameTeam.toLowerCase()
    );
    function getIdForNewTeam() {
      return Math.max(...teamsNames.map((item) => item.id)) + 1;
    }

    if (!isContact) {
      dispatch(
        addNewTeam({
          id: getIdForNewTeam() || initalId,
          nameTeam,
        })
      );
      setNameTeam("");
    }
  };

  return (
    <div className="header">
      <form action="submit" onSubmit={handleSubmit}>
        <input
          className="input"
          onChange={handleChangeInput}
          type="text"
          name="nameTeam"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={nameTeam}
          required
        />
        <button type="submit" className="buttonSubmit">
          Add
        </button>
      </form>
    </div>
  );
}

export default Header;
