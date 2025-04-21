  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getFirestore ,collection, addDoc,Timestamp, getDocs, doc, deleteDoc,updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  import { getAuth,createUserWithEmailAndPassword , signInWithEmailAndPassword ,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  let getSemail=document.getElementById('semail')
  let getSname=document.getElementById('sname')
  let getSpassword=document.getElementById('spassword')
  let getSform=document.getElementById('sform')
  let getLemail=document.getElementById('lemail')
  let getLpassword=document.getElementById('lpassword')
  let getLform=document.getElementById('lform')
  let getLout=document.getElementById('lout')
  let getLopen=document.querySelector('.lopen')
let getLclose=document.querySelector('.lclose')
let getSopen=document.querySelector('.sopen')
let getSclose=document.querySelector('.sclose')
  let getItemForm=document.getElementById('itemform')
  let getAdminContainer=document.getElementById('admincontainer')
  const firebaseConfig = {
    apiKey: "AIzaSyAx7z2MAurEV3enbiCqL4-qvi-apefG0Ho",
    authDomain: "store-694a5.firebaseapp.com",
    projectId: "store-694a5",
    storageBucket: "store-694a5.firebasestorage.app",
    messagingSenderId: "315100360668",
    appId: "1:315100360668:web:fa3d898bf6d02899302919"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  localStorage.setItem('a',6)
//   onAuthStateChanged(auth,async (user) => {
//     if(localStorage.getItem('a')){
//       let A=false
//     let C=false
//     let At
//     let Ct
//     if (user) {
//       if(getSform||location.pathname.endsWith('/index.html')||location.pathname.endsWith('/login.html')||location.pathname.endsWith('/adminDash.html')||location.pathname.endsWith('/customerDash.html')){
//         const querySnapshot = await getDocs(collection(db, "admin"));
// querySnapshot.forEach((doc) => {
//   if(user.email==doc.data().email){
//     A=true
//     At=doc.data().time.seconds
//   }
// });
// const query = await getDocs(collection(db, "customer"));
// query.forEach((doc) => {
//   if(user.email==doc.data().email){
//     C=true
//     Ct=doc.data().time.seconds
//   }
// });
// if(A==false && C==true){
//   if(!(location.pathname.endsWith('/customerDash.html'))){
//     location.href='./customerDash.html'
//   }
// }
// else if(A==true && C==false){
//   if(!(location.pathname.endsWith('/adminDash.html'))){
//   location.href='./adminDash.html'
//   }
// }
// else if(A==true && C==true){  
//   if(At>Ct){
//     if(!(location.pathname.endsWith('/adminDash.html'))){
//       location.href='./adminDash.html'
//     }
//   }
//   else if(Ct>At){
//     if(!(location.pathname.endsWith('/customerDash.html'))){
//       location.href='./customerDash.html'
//     }
//   }
// }
//       }
//       const uid = user.uid;
//     } else {
//       if(location.pathname.endsWith('/adminDash.html')||location.pathname.endsWith('/customerDash.html')){
//         location.href='./index.html'
//       }
//     }
//     }
//   });
  if(getSform){
    getSopen.addEventListener('click',()=>{
      getSclose.style.display='block'
      getSopen.style.display='none'
      getSpassword.type='text'
  })
  getSclose.addEventListener('click',()=>{
      getSclose.style.display='none'
      getSopen.style.display='block'
      getSpassword.type='password'
  })
    getSform.addEventListener('submit', ()=>{
    Swal.fire({
      title: "How do you want to signup as?",
      showDenyButton: true,
      allowEscapeKey:false,
      allowOutsideClick:false,
      draggable:false,
      confirmButtonText: "Admin",
      denyButtonText: "Customer"
    }).then(async (result) => {//then start
      if (result.isConfirmed) {
        let flag=false
        const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
  if(getSemail.value==doc.data().email){
    flag=true
  }
});
if(flag){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${getSemail.value} exist as admin`,
  });
}else{ //else start
  try {//try start
    const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach((doc) => {
  if(getSemail.value==doc.data().email){
    flag=true
  }
});
if(!flag){
  createUserWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} signedup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async ()=>{
      const { value: rname } = await Swal.fire({
        title: "Restaurant Name",
        input: "text",
        // inputLabel: "Your restaurant name",
        inputPlaceholder: "Enter your restaurant name"
      });
      if (rname) {
        Swal.fire({
          title: "Restaurant added",
          icon: "success",
          draggable: false
        });
      }
      const docRef = await addDoc(collection(db, "admin"), {
        name:getSname.value,
        restaurant:rname,
        time:Timestamp.now(),
        email: getSemail.value,
      });
      console.log("Document written with ID: ", docRef.id);
      getSname.value=''
      getSemail.value=''
      getSpassword.value=''
      signOut(auth).then(()=>{
        location.href='./login.html'
      }).catch(()=>{
        console.log('Error 420');
      })
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;  
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode+' '+errorMessage,
    });
  });
}else{
  localStorage.clear()
  signInWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} signedup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async ()=>{
      const { value: rname } = await Swal.fire({
        title: "Restaurant Name",
        input: "text",
        inputPlaceholder: "Enter your restaurant name"
      });
      if (rname) {
        Swal.fire({
          title: "Restaurant added",
          icon: "success",
          draggable: false
        });
      }
      const docRef = await addDoc(collection(db, "admin"), {
        name:getSname.value,
        time:Timestamp.now(),
        restaurant:rname,
        email: getSemail.value,
      });
      getSname.value=''
      getSemail.value=''
      getSpassword.value=''
      console.log("Document written with ID: ", docRef.id);
      signOut(auth).then(()=>{        
        location.href='./login.html'
      }).catch(()=>{
        console.log('Error 420');
      })
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Use same password',
    });
  });
}
  } catch (e) {//try end or catch start
    console.error("Error adding document: ", e);
  }
} //else end
      } 
      else if (result.isDenied) {
        let flag=false
        const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach((doc) => {
  if(getSemail.value==doc.data().email){
    flag=true
  }
});
if(flag){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${getSemail.value} exist as customer`,
  });
}else{
  try {
    const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
  if(getSemail.value==doc.data().email){
    flag=true
  }
});
if(!flag){
  createUserWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;  
    Swal.fire({
      title: `${user.email} signedup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async ()=>{
      const docRef = await addDoc(collection(db, "customer"), {
        email: getSemail.value,
        name:getSname.value,
        time:Timestamp.now(),
      });
      getSname.value=''
      getSemail.value=''
      getSpassword.value=''
      console.log("Document written with ID: ", docRef.id);
      signOut(auth).then(()=>{
        location.href='./login.html'
      }).catch(()=>{
        console.log('Error 420');
      })
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode+' '+errorMessage,
    });
  });
}else{  
  localStorage.clear()
  signInWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} signedup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async (data)=>{
        const docRef = await addDoc(collection(db, "customer"), {
          email: getSemail.value,
          time:Timestamp.now(),
          name:getSname.value,
        });
        getSname.value=''
        getSemail.value=''
        getSpassword.value=''
        console.log("Document written with ID: ", docRef.id);
        signOut(auth).then(()=>{        
          location.href='./login.html'
        }).catch(()=>{
          console.log('Error 420');
        })
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'Use same password',
    });
  });
}
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
      }
    }); //then end
  })
}
if(getLform){
  getLopen.addEventListener('click',()=>{
    getLclose.style.display='block'
    getLopen.style.display='none'
    getLpassword.type='text'
})
getLclose.addEventListener('click',()=>{
    getLclose.style.display='none'
    getLopen.style.display='block'
    getLpassword.type='password'
})
  getLform.addEventListener('submit', ()=>{
  Swal.fire({
    title: "How do you want to login as?",
    showDenyButton: true,
    allowEscapeKey:false,
    allowOutsideClick:false,
    draggable:false,
    confirmButtonText: "Admin",
    denyButtonText: "Customer"
  }).then(async (result) => {//then start
    if (result.isConfirmed) {
      let flag=false
      const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
if(getLemail.value==doc.data().email){
  flag=true
}
});
if(flag){
  localStorage.clear()
  signInWithEmailAndPassword(auth, getLemail.value, getLpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} login`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async ()=>{
      let flag=false
      let Bj
      const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach(async (doc) => {
  if(user.email==doc.data().email){
    flag=true
    Bj=doc.id
  }
});
if(flag){
  const cityRef = doc(db, 'admin', Bj);
await updateDoc(cityRef, {
time: Timestamp.now()
});
}
      location.href='./adminDash.html'
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode+' '+errorMessage,
    });
  });
}else{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${getLemail} does'nt exist as admin`,
  });
}
    } 
    else if (result.isDenied) {
      let flag=false
      const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach((doc) => {
if(getLemail.value==doc.data().email){
flag=true
}
});
if(flag){
  localStorage.clear()
  signInWithEmailAndPassword(auth, getLemail.value, getLpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} login`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async ()=>{
      let flag=false
      let Bj
      const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach(async (doc) => {
  if(user.email==doc.data().email){
    flag=true
    Bj=doc.id
  }
});
    if(flag){
      const cityRef = doc(db, 'customer', Bj);
await updateDoc(cityRef, {
    time: Timestamp.now()
});
    }
      location.href='./customerDash.html'
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorCode+' '+errorMessage,
    });
  });
}else{
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${getLemail} does'nt exist as customer`,
  });
}
    }
    getLemail.value=''
    getLpassword.value=''
  });
})
}
if(getLout){
  getLout.addEventListener('click',()=>{
    localStorage.clear()
    signOut(auth).then(()=>{
      Swal.fire({
        title: `You signedout`,
        icon: "success",
        draggable: true,
        allowOutsideClick:false,
        allowEscapeKey:false,
      }).then(()=>{
        location.href='./index.html'
      })
    }).catch(()=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.code+' '+error.message,
      });
    })
  })
  getItemForm.addEventListener('submit',()=>{
    let getItemName=document.getElementById('itemname')
    let getItemPrice=document.getElementById('itemprice')
    let getItemDescription=document.getElementById('itemdescription')
    let getItemImage=document.getElementById('itemimage')
    let getItemCategory=document.getElementById('itemcategory')
    let file=getItemImage.files[0]
    let reader=new FileReader()
    reader.addEventListener('load', async ()=>{
      let sel
            Array.from(getItemCategory.childNodes).forEach(cv=>{
              if(cv.selected){
                sel=cv
              }
            })
      try {
        const docRef = await addDoc(collection(db, "items"), {
          name: getItemName.value,
          price:getItemPrice.value,
          description:getItemDescription.value,
          category:sel.innerHTML,
          url:reader.result,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      getItemName.value=''
      getItemPrice.value=''
      getItemDescription.value=''
      getItemImage.value=''
      getItemCategory.selectedIndex = 0
      readData()
    })
    reader.readAsDataURL(file)
  })
  async function readData(){
    getAdminContainer.innerHTML=''
    let flag=false
    const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    flag=true
    // getAdminContainer.innerHTML+=`<div class="col">
    //   <div class="card">
    //     <img src="${doc.data().url}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //       <h5 class="card-title">${doc.data().name}</h5>
    //       <p class="card-text">${doc.data().price} Rs</p>
    //       <p class="card-text">${doc.data().description}</p>
    //       <p class="card-text d-flex justify-content-evenly"><button value='${doc.id}' class="btn btn-danger w-25 bttnsdel">Delete</button><button value='${doc.id}' class="btn btn-primary w-25 bttnsedit" data-bs-toggle="modal" data-bs-target="#staticBuckdrop">Edit</button></p>
    //     </div>
    //   </div>
    // </div>`
    getAdminContainer.innerHTML+=`<div class="card my-2" style="width: 16rem;">
  <img src="${doc.data().url}" height="250px" class="card-img-top" alt="..." style="object-fit:cover;">
  <div class="card-body">
    <h5 class="card-title">${doc.data().name}</h5>
           <p class="card-text">Rs ${doc.data().price}</p>
           <p class="card-text">${doc.data().category}</p>
           <p class="card-text">${doc.data().description}</p>
           <p class="card-text d-flex justify-content-evenly"><button value='${doc.id}' class="card-btn bttnsdel">Delete</button><button value='${doc.id}' class="card-btn bttnsedit" data-bs-toggle="modal" data-bs-target="#staticBuckdrop">Edit</button></p>
  </div>
</div>`
  });
  if(flag){
    let getBttnsDel=document.querySelectorAll('.bttnsdel')
    let getBttnsEdit=document.querySelectorAll('.bttnsedit')
    Array.from(getBttnsDel).forEach((cv,ci)=>{
      cv.addEventListener('click',async (e)=>{
        await deleteDoc(doc(db, "items", e.srcElement.value));
        readData()
      })
      getBttnsEdit[ci].addEventListener('click',(e)=>{
        const cityRef = doc(db, 'items', e.srcElement.value);
        let getEditForm=document.getElementById('itemeditform')
        let getEditName=document.getElementById('itemeditname')
        let getEditPrice=document.getElementById('itemeditprice')
        let getEditDescription=document.getElementById('itemeditdescription')
        let getEditImage=document.getElementById('itemeditimage')
        let getEditCategory=document.getElementById('itemeditcategory')
        getEditForm.addEventListener('submit',()=>{
          let file=getEditImage.files[0]
          let reader=new FileReader()
          reader.addEventListener('load',async ()=>{
            let sel
            Array.from(getEditCategory.childNodes).forEach(cv=>{
              if(cv.selected){
                sel=cv
              }
            })
            await updateDoc(cityRef, {
              name: getEditName.value,
              price:getEditPrice.value,
              category:sel.innerHTML,
              description:getEditDescription.value,
              url:reader.result,
              });
              getEditName.value=''
              getEditPrice.value=''
              getEditDescription.value=''
              getEditImage.value=''
              getEditCategory.selectedIndex=0
                readData()
          })
          reader.readAsDataURL(file)
        })
      })
    })
  }
  }
  readData()
}