import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Component/Home';
import { ProductPage } from './Component/ProductPage';
import { Contact } from './Component/Contact';
import { Cart } from './Component/Cart';
import { Profie } from './Component/Profile';
import { UserContextProvider} from "./Component/ContextAPI/ContextProvider"
import { Login } from './Component/Login';
import { Navbar } from './Component/Navbar';
import { Image } from './Component/Image';

function App() {

  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>} />
      <Route path='login' element={<Login/>}/>
      <Route path='productpage' element={<ProductPage/>} />
      <Route path='profile' element={<Profie/>} />
      <Route path='cart' element={<Cart/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='nav' element={<Navbar/>} />
      <Route path='image' element={<Image/>} />
    </Routes>
    
    
    </BrowserRouter>
    </UserContextProvider>
    
  );
}

export default App;
