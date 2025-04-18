  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getFirestore ,collection, addDoc,Timestamp, getDocs, doc, deleteDoc,updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
  import { getAuth,createUserWithEmailAndPassword , signInWithEmailAndPassword ,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  let getSemail=document.getElementById('semail')
  let getSpassword=document.getElementById('spassword')
  let getSform=document.getElementById('sform')
  let getLemail=document.getElementById('lemail')
  let getLpassword=document.getElementById('lpassword')
  let getLform=document.getElementById('lform')
  let getLout=document.getElementById('lout')
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
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     if(getSform||location.pathname.endsWith('/index.html')||location.pathname.endsWith('/login.html')){
  //       location.href='./adminDash.html'
  //     }
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     if(location.pathname.endsWith('/adminDash.html')){
  //       location.href='./index.html'
  //     }
  //     // User is signed out
  //     // ...
  //   }
  // });
  if(getSform){getSform.addEventListener('submit', ()=>{
    Swal.fire({
      title: "How do you want to signup as?",
      showDenyButton: true,
      allowEscapeKey:false,
      allowOutsideClick:false,
      draggable:false,
      confirmButtonText: "Admin",
      denyButtonText: "Customer"
    }).then(async (result) => {
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
}else{
  try {
    flag=false
    const querySnapshot = await getDocs(collection(db, "customer"));
querySnapshot.forEach((doc) => {
  if(getSemail.value==doc.data().email){
    flag=true
  }
});
if(!flag){
  const docRef = await addDoc(collection(db, "admin"), {
    email: getSemail.value,
  });
  console.log("Document written with ID: ", docRef.id);
  createUserWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} signedup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(()=>{
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
  signInWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} signup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async ()=>{
      const docRef = await addDoc(collection(db, "admin"), {
        email: getSemail.value,
      });
      console.log("Document written with ID: ", docRef.id);
      location.href='./adminDash.html'
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
    flag=false
    const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
  if(getSemail.value==doc.data().email){
    flag=true
  }
});
if(!flag){
  const docRef = await addDoc(collection(db, "customer"), {
    email: getSemail.value,
  });
  console.log("Document written with ID: ", docRef.id);
  createUserWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;  
    Swal.fire({
      title: `${user.email} signedup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(()=>{
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
  signInWithEmailAndPassword(auth, getSemail.value, getSpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} signup`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(async ()=>{
      const docRef = await addDoc(collection(db, "customer"), {
        email: getSemail.value,
      });
      console.log("Document written with ID: ", docRef.id);
      location.href='./customerDash.html'
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
      getSemail.value=''
      getSpassword.value=''
    });
  })
}
if(getLform){getLform.addEventListener('submit', ()=>{
  Swal.fire({
    title: "How do you want to login as?",
    showDenyButton: true,
    allowEscapeKey:false,
    allowOutsideClick:false,
    draggable:false,
    confirmButtonText: "Admin",
    denyButtonText: "Customer"
  }).then(async (result) => {
    if (result.isConfirmed) {
      let flag=false
      const querySnapshot = await getDocs(collection(db, "admin"));
querySnapshot.forEach((doc) => {
if(getLemail.value==doc.data().email){
  flag=true
}
});
if(flag){
  signInWithEmailAndPassword(auth, getLemail.value, getLpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} login`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(()=>{
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
  signInWithEmailAndPassword(auth, getLemail.value, getLpassword.value)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      title: `${user.email} login`,
      icon: "success",
      draggable: true,
      allowOutsideClick:false,
      allowEscapeKey:false,
    }).then(()=>{
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
    let file=getItemImage.files[0]
    let reader=new FileReader()
    reader.addEventListener('load', async ()=>{
      try {
        const docRef = await addDoc(collection(db, "items"), {
          name: getItemName.value,
          price:getItemPrice.value,
          description:getItemDescription.value,
          url:reader.result,
          // time:Timestamp.now(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      getItemName.value=''
      getItemPrice.value=''
      getItemDescription.value=''
      getItemImage.value=''
      readData()
    //   getAdminContainer.innerHTML+=`<div class="col">
    //   <div class="card">
    //     <img src="${reader.result}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //       <h5 class="card-title">${getItemName.value}</h5>
    //       <p class="card-text">${getItemPrice.value} Rs</p>
    //       <p class="card-text">${getItemDescription.value}</p>
    //       <p class="card-text d-flex justify-content-evenly"><button class="btn btn-danger w-25">Delete</button><button class="btn btn-primary w-25">Edit</button></p>
    //     </div>
    //   </div>
    // </div>`
    })
    reader.readAsDataURL(file)
  })
  async function readData(){
    getAdminContainer.innerHTML=''
    let flag=false
    const querySnapshot = await getDocs(collection(db, "items"));
  querySnapshot.forEach((doc) => {
    flag=true
    getAdminContainer.innerHTML+=`<div class="col">
      <div class="card">
        <img src="${doc.data().url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${doc.data().name}</h5>
          <p class="card-text">${doc.data().price} Rs</p>
          <p class="card-text">${doc.data().description}</p>
          <p class="card-text d-flex justify-content-evenly"><button value='${doc.id}' class="btn btn-danger w-25 bttnsdel">Delete</button><button value='${doc.id}' class="btn btn-primary w-25 bttnsedit" data-bs-toggle="modal" data-bs-target="#staticBuckdrop">Edit</button></p>
        </div>
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
        getEditForm.addEventListener('submit',()=>{
          let file=getEditImage.files[0]
          let reader=new FileReader()
          reader.addEventListener('load',async ()=>{
            await updateDoc(cityRef, {
              name: getEditName.value,
              price:getEditPrice.value,
              description:getEditDescription.value,
              url:reader.result,
              });
              getEditName.value=''
              getEditPrice.value=''
              getEditDescription.value=''
              getEditImage.value=''
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