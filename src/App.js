import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './Component/Home';
import { ProductPage } from './Component/ProductPage';
import { Contact } from './Component/Contact';
import { Cart } from './Component/Cart';

import { UserContextProvider} from "./Component/ContextAPI/ContextProvider"
import { Login } from './Component/Login';
import { Navbar } from './Component/Navbar';
import { Image } from './Component/Image';
import { AddProduct } from './Component/AddProduct';
import { History } from './Component/History';
import { Profile } from "./Component/Profile"
import { Detail } from './Component/Detail';
import { PaymentPage } from './Component/Payment';
import { Admin } from './Component/Admin';

function App() {

  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>} />
      <Route index element={<Admin/>} />
      <Route path='login' element={<Login/>}/>
      <Route path='productpage' element={<ProductPage/>} />
      <Route path='cart' element={<Cart/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path='nav' element={<Navbar/>} />
      <Route path='image' element={<Image/>} />
      <Route path='addProduct' element={<AddProduct/>} />
      <Route path='detail' element={<Detail/>}  />
      <Route path='payment' element={<PaymentPage/>} />
      <Route path='profile'>
        <Route index element={ <Profile/>}/>
        <Route path='orderHistory' element={<History/>} />
      </Route>
    </Routes>
    
    
    </BrowserRouter>
    </UserContextProvider>
    
  );
}

export default App;
