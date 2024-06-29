function NavBar(){
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  let admin = false;

  React.useEffect(() => {
    const auth  = firebase.auth();
    const user = firebase.auth().currentUser;
    auth.onAuthStateChanged(async (user) => {
      //fetch accounts from API
      if (user) {
        let uid = await user.uid;
        fetch(`/account/all/${uid}/`)
          .then(response => response.json())
          .then(data => {
            setEmail(data.email);
          })
          .catch(rejected =>{
            console.log(rejected);
          })
        setIsAdmin(true)
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setIsAdmin(false)
      }
    })
  }, []);
  

  return(

    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 15px"}}>
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          {!loggedIn && <li className="nav-item">
            <a className="nav-link" href="#/login/">Login</a>
          </li>}
          {loggedIn && <li className="nav-item">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>}
          {loggedIn && <li className="nav-item">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>}
          {loggedIn && <li className="nav-item">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>}
          {isAdmin == true && <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>}
          {loggedIn && <li className="nav-item">
            <a className="nav-link" href="#/logout/">Logout</a>
          </li> }     
        </ul>
      </div>
    </nav>
    <div style={{width: "100%", height: "24px"}}>
      {loggedIn && <p style={{backgroundColor: "#f8f9fa", borderRadius: "0px 0px 0px calc(.25rem - 1px)", float: "right", padding: "5px", margin: "0"}}>{email}</p>}
    </div>
    </>
    

  );
}