function Logout(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="light"
      header="Logout"
      status={status}
      body={show ? 
        <LogoutForm setShow={setShow} setStatus={setStatus}/> :
        <LogoutMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LogoutMsg(props){
  return(<>
    <h5>Success</h5>
    <a href="#/login/">
      <button type="submit" 
        className="btn btn-primary"
        onClick={() => props.setShow(true)}>
          Back to login
      </button>
    </a>
  </>);
}

function LogoutForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    const auth  = firebase.auth();
    const promise = auth.signOut()
      .then(async (userCredential) => {
        // Signed out
        props.setStatus('');
        props.setShow(false);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });     
  }

  return (<>
    <button type="submit" className="btn btn-primary" onClick={handle}>Login</button>
  </>);
}