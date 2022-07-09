import TableBody from "./tableBody";

export function ContainerMatches() {
  return (
    <div className="containerMatches">
      <table className="tableWrapper">
        <TableBody tableCommonResults={false} />
      </table>
    </div>
  );
}
export default ContainerMatches;
