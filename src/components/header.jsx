export function Header() {
  return (
    <div className="header">
      <form action="submit">
        <input type="text" name="teams" id="teams" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Header;
