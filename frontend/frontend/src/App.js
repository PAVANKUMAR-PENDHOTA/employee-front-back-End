import './App.css';
import EmployeeDetail from './EmployeeDetails';
import EditEmployee from './EditEmployee';
import { BrowserRouter as Router, Routes, Route, withRouter} from "react-router-dom";
function App(props) {
  return (
 
     <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<EmployeeDetail/>} />
          <Route exact path="/EditEmployee/editID/:id" element={<EditEmployee/>} />
        </Routes>
      </div>
    </Router>
 
  );
}
 
export default App;