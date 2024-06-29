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
  const [error, setError]   = React.useState(false);
  const [errorMessage, setErrorMessage]   = React.useState('');


  return (
    <>
    <Card
      bgcolor="light"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow} setErrorMessage={setErrorMessage} setError={setError}/> : 
        <CreateMsg setShow={setShow}/>}
    />
    {error && <Message
        bgcolor="danger"
        status={status}
        body={
          <Error error={error} errorMessage={errorMessage}/>
        }
      />}
    </>
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <a href="#/deposit/">
      <button type="submit" 
        className="btn btn-primary" 
        onClick={() => props.setShow(true)}>Deposit</button>
    </a>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const [admin, setAdmin] = React.useState('');
  const [adminCheck, setAdminCheck] = React.useState(false);

  //create auth user and add user document to the DB
  async function handle(){
    let isAdmin = false;
    if(admin !== '' && admin !== "secret"){
      //fail
      props.setError(true);
      props.setErrorMessage("Invalid admin key.");
      return
    }else if(admin !== '' && admin === "secret"){
      //pass
      props.setError(false);
      isAdmin = true;
    }else{
      props.setError(false);
      isAdmin = false;
    }
    var uid = '';
    const auth  = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password)
      .then(async (userCredential) => {
        uid = await userCredential.user.uid;
      }).then(() => {
        const url = `account/create/${uid}/${name}/${email}/${password}/${isAdmin}/`;
        (async () => {
          var res = await fetch(url);
          var data = await res.json();
          props.setShow(false);
          props.setError(false);
        })();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        props.setError(true);
        if(errorCode == "auth/internal-error"){
          props.setErrorMessage("Invalid username or password");
        }else{
          props.setErrorMessage(errorMessage);
        }
      });
    
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
    
    
    <input type="checkbox" 
      value={adminCheck}
      onClick={e => setAdminCheck(!adminCheck)}
      style={{marginRight: "5px"}}/>
      Admin<br/>
    <br/>

    {adminCheck && 
    <>
      Admin key<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Admin key: secret" 
        value={admin} 
        onChange={e => setAdmin(e.currentTarget.value)}/><br/>
    </>
    }

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>Create Account</button>

  </>);
}

function Error(props){
  return(<>
    <h5>Error</h5>
    <p>{props.errorMessage}</p>
  </>);
}