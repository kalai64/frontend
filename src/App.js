
import './App.css';
import Navbar from './Components/Nabar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import Cart from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import laptop_banner from './Components/Assets/banner_laptop.png'
import desktop_banner from './Components/Assets/banner_desktop.png'
import accessories_banner from './Components/Assets/banner_accessories.png'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile';
import MyOrders from './Pages/MyOrders';




function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/laptop' element={<ShopCategory banner={laptop_banner} category={"laptop"}/>} />
        <Route path='/desktop' element={<ShopCategory banner={desktop_banner} category={"desktop"}/>} />
        <Route path='/accessories' element={<ShopCategory banner={accessories_banner} category={"accessories"}/>} />
        
        <Route path='/product' element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
        </Route> 
        
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>   
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/editprofile' element={<EditProfile/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
