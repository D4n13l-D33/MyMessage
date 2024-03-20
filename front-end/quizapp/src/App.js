import ethers from "ethers";
import contractABI from "./abi.json";
import { useEffect, useState, useCallback } from "react";

function App() {
  const contractAddress = "0x9C2b55836dE5d405A5CBEcF89BF442359285E5ec";

  // Use state to store the contract and the message instances
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");

  // Use effect to initialize the contract when the component mounts
  useEffect(() => {
    async function initContract() {
      const contract = new ethers.Contract(contractAddress, contractABI);
      setContract(contract); // Set the contract state
    }
    initContract();
  }, []); // Use an empty array to run only once

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Use callback to memoize the setMessage function and specify its dependencies
  const setContractMessage = useCallback(async () => {
    const signer = await contract.signer; // Get the signer from the contract
    const connectedContract = contract.connect(signer); // Connect the contract to the signer
    const newMessage = document.getElementById("newMessageInput").value;
    // Convert the message from a string to a bytes32 type
    const bytesMessage = ethers.utils.formatBytes32String(newMessage);
    await connectedContract.setMessage(bytesMessage);
    getMessage();
  }, [contract]); // Update the function when the contract changes

  // Use callback to memoize the getMessage function and specify its dependencies
  const getMessage = useCallback(async () => {
    // Call the contract function to get the message
    const bytesMessage = await contract.getMessage();
    // Convert the message from a bytes32 type to a string
    const currentMessage = ethers.utils.parseBytes32String(bytesMessage);
    // Update the message state
    setMessage(currentMessage);
  }, [contract]); // Update the function when the contract changes

  // Use effect to call the getMessage function whenever the contract changes
  useEffect(() => {
    if (contract) {
      getMessage();
    }
  }, [contract, getMessage]); // Run the effect when the contract or the getMessage function changes

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={setContractMessage}>Set Message</button>
        </div>
        <div>
          <button onClick={getMessage}>Get Message</button>
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* Use a React component to display the message as a prop */}
        <MessageDisplay message={message} />
      </header>
    </div>
  );
}

// Define a React component to display the message
function MessageDisplay({ message }) {
  return <div>{message}</div>;
}

export default App;
