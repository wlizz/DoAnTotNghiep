import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './View/Cart';
import Category from './View/Category';
import Contact from './View/Contact';
import Dashboard from './View/Dashboard';
import Main from './View/Main';
import { Order } from './View/Order/tsx';
import SignIn from './View/SignIn';
import SignUp from './View/SignUp';
import User from './View/User';
import ChatBox from './components/ChatBox';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} >
          <Route path='dashboard' element={<Dashboard />} />
          <Route index path='category' element={<Category />} />
          <Route index path='category/:id' element={<Category />} />
          <Route index path='contact' element={<Contact />} />
          <Route index path='order' element={<Order />} />
          <Route index path='cart' element={<Cart />} />
          <Route index path='user' element={<User />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>

      <ChatBox />
    </>
  );
}
export default App;
