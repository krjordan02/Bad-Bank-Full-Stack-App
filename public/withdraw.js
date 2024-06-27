function Withdraw(){
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
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus} setBalance={setBalance} uid={uid} balance={balance}/> :
        <WithdrawMsg setShow={setShow}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-primary" 
      onClick={() => props.setShow(true)}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [amount, setAmount] = React.useState('');

  function handle(){
    var uid = props.uid
    var withdraw = amount;
    var currentBalance = Number(props.balance);
    var newBalance = Number(currentBalance) - Number(withdraw);
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
  }


  return(<>

    Balance<br/>
    {props.balance}<br/>
    <br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}
