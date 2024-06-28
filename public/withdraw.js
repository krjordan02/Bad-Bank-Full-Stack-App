function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [uid, setUid] = React.useState('');
  const [error, setError]   = React.useState(false);
  const [errorMessage, setErrorMessage]   = React.useState('');

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
    <>
      <Card
        bgcolor="light"
        header="Withdraw"
        status={status}
        body={show ? 
          <WithdrawForm setShow={setShow} setStatus={setStatus} setBalance={setBalance} uid={uid} balance={balance} setErrorMessage={setErrorMessage} setError={setError}/> :
          <WithdrawMsg setShow={setShow}/>}
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
    if(newBalance > 0){
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
      props.setError(false);
    }else{
      props.setError(true);
      props.setErrorMessage("Withdraw amount must be lower than account balance.");
    }
  }


  return(<>

    Balance<br/>
    <h3>${props.balance}</h3>
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

function Error(props){
  return(<>
    <h5>Error</h5>
    <p>{props.errorMessage}</p>
  </>);
}
