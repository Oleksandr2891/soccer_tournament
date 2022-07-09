export const configTable = [
  {
    columnNumber: 1,
    name: "Place",
    minWidth: "40px",
  },
  {
    columnNumber: 2,
    name: "Team",
    minWidth: "100px",
  },
  {
    columnNumber: 3,
    name: "Played",
    minWidth: "40px",
  },
  {
    columnNumber: 4,
    name: "Win",
    minWidth: "40px",
  },
  {
    columnNumber: 5,
    name: "Draw",
    minWidth: "40px",
  },
  {
    columnNumber: 6,
    name: "Lost",
    minWidth: "40px",
  },
  {
    columnNumber: 7,
    name: "Points",
    minWidth: "40px",
  },
];

export const configWighoutHeader = [
  "firstTeamName",
  "firstTeamScore",
  "dots",
  "secondTeamName",
  "secondTeamScore",
];

const HeaderTable = () => {
  return (
    <thead>
      <tr>
        {configTable.map((column) => {
          return (
            <th
              key={column.columnNumber}
              style={{ minWidth: `${column.minWidth}` }}
            >
              {column.name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default HeaderTable;
