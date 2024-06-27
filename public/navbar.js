function NavBar(){
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const auth  = firebase.auth();
    const user = firebase.auth().currentUser;
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    })
  }, []);

  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
          {loggedIn && <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>}
          {loggedIn && <li className="nav-item">
            <a className="nav-link" href="#/logout/">Logout</a>
          </li> }     
        </ul>
      </div>
    </nav>

  );
}