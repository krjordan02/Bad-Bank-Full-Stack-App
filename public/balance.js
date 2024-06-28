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
            let balance = (Math.round(data.ballance * 100) / 100).toFixed(2);
            setBalance(balance);
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
      body=
        <BalanceForm setShow={setShow} setStatus={setStatus} balance={balance}/>
    />
  )

}

function BalanceForm(props){
  
  const ctx = React.useContext(UserContext);

  return (
  <>
    <h3>${props.balance}</h3>
  </>);
}