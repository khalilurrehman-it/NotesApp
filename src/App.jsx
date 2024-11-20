import Header from "./components/Header";
import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <>
{/*    
    <Router>
    <Header />
    </Router> */}
      <AppRoutes />
    </>
  );
}
