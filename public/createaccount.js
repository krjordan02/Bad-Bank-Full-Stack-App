const firebaseConfig = {
  apiKey: "AIzaSyDeDfK5AphB_FpNogTrJncd7CnGV-8cmMo",
  authDomain: "bad-bank-d92f7.firebaseapp.com",
  projectId: "bad-bank-d92f7",
  storageBucket: "bad-bank-d92f7.appspot.com",
  messagingSenderId: "386603581282",
  appId: "1:386603581282:web:682d01fd892bae65ebb63b"
};

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="light"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  //create auth user and add user document to the DB
  async function handle(){
    var uid = '';
    const auth  = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password)
      .then(async (userCredential) => {
        uid = await userCredential.user.uid;
      }).then(() => {
        const url = `account/create/${uid}/${name}/${email}/${password}/`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          props.setShow(false);
        })();
      })
    
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>Create Account</button>

  </>);
}