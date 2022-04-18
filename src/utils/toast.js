import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// ! toastify kullanıcıya mesaj göstermek için kullanılır
// ! burada istediğimiz mesajı dökümantasyondan seçip buraya import ediyoruz

const Toastify=(msg)=>{
toast.success(msg, {
    position: "bottom-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
}
    export default Toastify;