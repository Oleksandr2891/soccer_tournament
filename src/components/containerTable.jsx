import HeaderTable from "./headerTable";
import TableBody from "./tableBody";

export function ContainerTable() {
  return (
    <div className="containerTable">
      <table className="tableWrapper">
        <HeaderTable />
        <TableBody tableCommonResults={true} />
      </table>
    </div>
  );
}

export default ContainerTable;
