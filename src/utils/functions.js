// Database bilgi ekleme,bilgiyi alma, bilgi silme ve değiştirme
import {useState,useEffect} from "react";
import { getDatabase,ref,set,push,onValue, remove,update} from "firebase/database";
import Toastify from "./toast";
import {firebase} from "./firebase";


// ! firebase de yapılacak işlemleri burada çağırıyoruz hepsi firebase in kendi paketleri


// Bilgi Ekleme
// ! Add user ile ve sonraki güncelleme silme işlemlerinde de kullanılacak klasik yapı 
// ! database(db) tanımlıyoruz getDatabase() ile
// ! bu yapı olduğu gibi dökümandan alındı....
export const AddUser=(info)=>{
    const db = getDatabase();
    const userRef=ref(db,"contacts");
    //! yeni bir kullanıcıyı userRef ile ekliyoruz ve database e gönderiyoruz
    const newUserRef=push(userRef)
    //! newUserRef ile eklediğimiz kullanıcıyı set ediyoruz
    set((newUserRef),{
        username:info.username,
        phoneNumber:info.phoneNumber,
        gender:info.gender,
    })
}

// Bilgi Çağırma

//! database e eklenen verileri çağırıyoruz
export const useFetch=()=>{
    const [isLoading,setIsLoading]=useState();
    const [contactList,setContactList]=useState();

    useEffect(() => {
        setIsLoading(true)
// ! yine aynı syntax ı kullanıyoruz bu yapıyı dökümandan alıyoruz...
        const db = getDatabase();
        const userRef=ref(db,"contacts");
// !    dökümandan aldığımız yapıyı kullanarak verileri çağırıyoruz...
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            //! bi array oluşturuyoruz verileri bruaya atıyoruz daha sonra contacts a gönderip tabloya ekleyeceğiz 
            const baglantiArray=[];

            for(let id in data){
                baglantiArray.push({id,...data[id]})
            }          
            // ! arrayi contact list e atıyoruz
            setContactList(baglantiArray);
            setIsLoading(false);
        });
    },[])
    //! isLoading i ve contactList i return ediyoruz contacts kısmında çağırmak için
    return {isLoading,contactList}
}

// Bilgi silme
//! verileri silme işlemini DeleteUser ile yapıyoruz
export const DeleteUser=(id)=>{
    // ! yine db i tanımlıyoruz
        const db = getDatabase();
        //! silerken kullanılacak syntax tek bu yapıyı da dökümandan aldık
        remove(ref(db,"contacts/"+id))

        Toastify("Kullanıcı bilgisi silindi")
}

// Bilgi Değiştirme
// ! edituser ile değiştirme işlemini yapıyoruz
export const EditUser=(info)=>{
    // ! db i tanımlıyoruz
    const db = getDatabase();
    //! boş bi update objesi oluşturuyoruz
    const updates = {};
// ! dökümandan alınan syntax data dan alıyoruz id ile birlikte çağırıyoruz
    updates["contacts/"+info.id]=info;
    //! yapılan değişiklikleri return ediyoruz
    return update(ref(db),updates);

}