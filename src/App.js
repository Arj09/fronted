import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Component/Home';
import { ProductPage } from './Component/ProductPage';
import { Contact } from './Component/Contact';
import { Cart } from './Component/Cart';
import { Profie } from './Component/Profile';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>} />
      <Route path='productpage' element={<ProductPage/>} />
      <Route path='profile' element={<Profie/>} />
      <Route path='cart' element={<Cart/>} />
      <Route path='contact' element={<Contact/>} />
    </Routes>
    
    
    </BrowserRouter>
    
  );
}

export default App;
