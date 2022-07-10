import "./App.css";
import Container from "./components/container";
import ContainerMatches from "./components/containerMatches";
import ContainerTable from "./components/containerTable";
import Header from "./components/header";

function App() {
  return (
    <Container>
      <Header />
      <div className="flexBox">
        <ContainerTable />
        <ContainerMatches />
      </div>
    </Container>
  );
}

export default App;
