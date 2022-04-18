import './App.css';
import {useState} from "react";
import FormComponent from './components/form/FormComponent';
import Contacts from "./components/contacts/Contacts"
import { AddUser,EditUser } from './utils/functions';
import { ToastContainer } from "react-toastify";
//! kullanılacak paketleri import ediyoruz 
// ! kullanılacak componentleri ve functionsları import ediyoruz

//!başlangıçta bi initial values oluşturuyoruz form yapımız da bu şekilde dataya kayıt işlemini de kullanıcıdan alınacak
//! girdileri de bu formata göre kaydedeceğiz...

const initialValues={username:"",phoneNumber:"",gender:"NO INFO"}

function App() {
  //! state oluşturup başlangıç olarak initialvalues ayarlıyoruz 
 const [info,setInfo]=useState(initialValues);

 const handleFormSubmit=(e)=>{
  // ! form submit de eğer aynı id ye sahip bi kullanıcı varsa add butonu çalışmasın edit butonu çalışsın
  // ! yoksa yeni bi kullanıcı gibi add butonu çalışsın istiyoruz...
   e.preventDefault();
  if (info.id) {
    //! aynı kullanıcı için edit butonu çalıştığında oluşturduğumuz functions içerisindeki
    //! EditUser a info yu gönderiyoruz
    EditUser(info)
  }
  // ! yeni kullanıcı için infoyu AddUser a gönderiyoruz
   else  {AddUser(info)}
 }

//  ! editHandler da parametrelerimiz initial values bir de id olacak
 const editHandler=(id,username,phoneNumber,gender)=>{
  //  ! gelen verilerle infoyu set ediyoruz 
   setInfo({id,username,phoneNumber,gender})
 }

  return (
    //! KLASİK HTML FORM YAPISI
    <div className="App">
      {/* //! Form component e datayı ve submit fonksiyonunu props olarak yolluyoruz  */}
      <FormComponent info={info} setInfo={setInfo} handleFormSubmit={handleFormSubmit}/>
      {/* //! Contacts e de editHandler ı props olarak yolluyoruz  */}
      <Contacts editHandler={editHandler}/>
      {/* //! Toastifyı kullanıcıya vermesini istediğimiz uyarılar için ekledik */}
      <ToastContainer/>
    </div>
  );
}

export default App;
