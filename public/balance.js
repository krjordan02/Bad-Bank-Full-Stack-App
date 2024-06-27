function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const [balance, setBalance] = React.useState('');  

  React.useEffect(() => {
    var uid = '';
    const auth  = firebase.auth();
    const user = firebase.auth().currentUser;
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        uid = await user.uid;

        //fetch all accounts from API
        fetch(`/account/all/${uid}/`)
          .then(response => response.json())
          .then(data => {
            setBalance(data.ballance);
          })
          .catch(rejected =>{
            console.log(rejected);
          })
      }
    })
  }, []);

  return (
    <Card
      bgcolor="light"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus} balance={balance}/> :
        <BalanceMsg setShow={setShow}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  
  const ctx = React.useContext(UserContext);

  return (
  <>
    {props.balance}<br/>
  </>);
}