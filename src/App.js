import logo from './logo.svg';
import './App.css';
import Disperse from './components/Disperse';
import DuplicateAddressesValidator from './components/DuplicateAddressesValidator';
import ValidEthereumAddressesValidator from './components/ValidEthereumAddressesValidator';
import ValidNumbersValidator from './components/ValidNumbersValidator';
import Combine from './components/Combine';

function App() {
  return (
    <div className="App">
    <Disperse /> 
    <DuplicateAddressesValidator />
    <ValidEthereumAddressesValidator />
    <ValidNumbersValidator />
    <Combine />
    </div>
  );
}

export default App;
