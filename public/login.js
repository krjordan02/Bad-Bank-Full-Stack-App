function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [error, setError]   = React.useState(false);
  const [errorMessage, setErrorMessage]   = React.useState('');

  return (
    <>
      <Card
        bgcolor="light"
        header="Login"
        status={status}
        body={show ? 
          <LoginForm setShow={setShow} setStatus={setStatus} setErrorMessage={setErrorMessage} setError={setError}/> :
          <LoginMsg setShow={setShow} setStatus={setStatus}/>}
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

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <a href="#/deposit/">
      <button type="submit" 
        className="btn btn-primary" 
        onClick={() => props.setShow(true)}>
          Deposit
      </button>
    </a>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    const auth  = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        // Signed in
        props.setStatus('');
        props.setShow(false);
        props.setError(false);
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

  function handleGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    const auth  = firebase.auth();
    const promise = auth.signInWithPopup(provider)
      .then(async (result) => {
        // Signed in
        props.setStatus('');
        props.setShow(false);
        props.setError(false);
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

    Email<br/>
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
    onClick={handle}
    >Login</button>

    <button type="submit" 
    className="btn btn-primary" 
    onClick={handleGoogle} 
    style={{marginLeft: "10px"}}
    >Login with Google</button>

  </>);
}

function Error(props){
  return(<>
    <h5>Error</h5>
    <p>{props.errorMessage}</p>
  </>);
}