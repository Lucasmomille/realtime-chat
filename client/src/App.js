import io from 'socket.io-client';
import {useState} from 'react';
import Chat from './components/Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("")

const joinRoom = () =>{
  if(username !== "" && room !== ""){
    socket.emit("join_room", room);
  } else {
    alert("Il manque le prénom ou l'id")
  }
}
  return (
    <div className="container mx-auto w-9/12 bg-green-100 p-4 text-center">
      <h1>Chat online</h1>
      <div className="w-7/12 mx-auto flex flex-col my-4">
        <input type="text" placeholder="Ton prénom" onChange={(e) => {setUsername(e.target.value)}}/>
        <input type="text" placeholder="id du chat" onChange={(e) => {setRoom(e.target.value)}}/>
        <button className="p-2 inline-block text-center w-3/12 mx-auto bg-blue-300 text-white rounded-md" onClick={joinRoom}>Rejoins un chat</button>
      </div>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
}

export default App;
