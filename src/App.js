import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screen/HomeScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetails from './screen/ProductDetails';
import CartScreen from './screen/CartScreen';

function App() {
  return (
    <Router>
      <Header/>
        <Routes>
          <Route exact path='/home' element={<HomeScreen/>}/>
          <Route path='/product/:id' element={<ProductDetails/>} />
          <Route path = '/cart/:id?' element={<CartScreen/>}/>
        </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
