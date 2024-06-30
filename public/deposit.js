function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const [balance, setBalance] = React.useState('');
  const [uid, setUid] = React.useState('');

  //Get current balance
  React.useEffect(() => {
    var uid = '';
    const auth  = firebase.auth();
    const user = firebase.auth().currentUser;
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        uid = await user.uid;
        setUid(uid);

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
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus} setBalance={setBalance} uid={uid} balance={balance}/> :
        <DepositMsg setShow={setShow}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [amount, setAmount] = React.useState(''); 

  async function handle(){
    var uid = props.uid
    var deposit = amount;
    if(Number(deposit) !== NaN){
      var currentBalance = Number(props.balance);
      var newBalance = Number(currentBalance) + Number(deposit);
      newBalance = (Math.round(newBalance * 100) / 100).toFixed(2)
      fetch(`/account/updateBalance/${uid}/${newBalance}`)
        .then(response => 
          console.log(response)
        )
        .catch(rejected =>{
          console.log(rejected);
        })
      props.setBalance(newBalance)
      props.setStatus(''); 
      props.setShow(false);
    }else{
      console.log("NOT A NUMBER")
    }
    
  }

  return(<>

    Balance<br/>
    <h3>${props.balance}</h3>
    <br/>
    Deposit amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>Deposit</button>

  </>);
}