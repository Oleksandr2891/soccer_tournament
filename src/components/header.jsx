import { useState } from "react";
import { tableData } from "./tableBody";

export function Header() {
  const [nameTeam, setNameTeam] = useState("");

  const handleChangeInput = (event) => {
    const { value } = event.currentTarget;
    setNameTeam(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isContact = tableData.some(
      (item) => item.nameTeam.toLowerCase() === nameTeam.toLowerCase()
    );
    if (!isContact) {
      console.log("nameTeam", nameTeam);
      // dispatch(addContact({ name, number }));
      setNameTeam("");
      // } else {
      //   notifyError(`${name} is already in contacts`);
    }
  };

  return (
    <div className="header">
      <form action="submit" onSubmit={handleSubmit}>
        {/* <input type="text" name="teams" id="teams" /> */}
        <input
          className="input"
          onChange={handleChangeInput}
          type="text"
          name="nameTeam"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
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
