import './App.scss';
import { Route, Routes } from "react-router-dom";
import Main from './layout/Main';
import Dashboard from './view/Admin/Dashboard';
import Invoice from './view/Admin/Invoice';
import Category from './view/Admin/Category';
import Customer from './view/Admin/Customer';
import Import from './view/Admin/Import';
import Export from './view/Admin/Export';
import Check from './view/Admin/Check';
import Inventory from './view/Admin/Inventory';
import CategoryDetail from './view/Admin/Category/CategoryDetail';
import ImportCreateNew from './view/Admin/ImportCreateNew';
import InvoiceCreateNew from './view/Admin/InvoiceCreateNew';
import CheckInvCreateNew from './view/Admin/CheckInvCreateNew';
import Product from './view/Admin/Product';
import Provider from './view/Admin/Provider';
import Revenue from './view/Admin/Revenue';
import SignIn from './view/Admin/Login/SignIn';
import SignUp from './view/Admin/Login/SignUp';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />} >
        <Route index path='dashboard' element={<Dashboard />} />
        <Route path='invoice' element={<Invoice />} />
        <Route path='category/:id' element={<CategoryDetail />} />
        <Route path='category' element={<Category />} />
        <Route path='product' element={<Product />} />
        <Route path='customer' element={<Customer />} />
        <Route path='provider' element={<Provider />} />
        <Route path='import' element={<Import />} />
        <Route path='export' element={<Export />} />
        <Route path='check' element={<Check />} />
        <Route path='inventory' element={<Inventory />} />
        <Route path='revenue' element={<Revenue />} />
        <Route path='import/new' element={<ImportCreateNew />} />
        <Route path='invoice/new' element={<InvoiceCreateNew />} />
        <Route path='check/new' element={<CheckInvCreateNew />} />
      </Route>
      <Route path='sign-in' element={<SignIn />} />
      <Route path='sign-up' element={<SignUp />} />
    </Routes>
  );
}
export default App;
