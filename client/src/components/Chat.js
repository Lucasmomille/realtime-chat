import React, {useState, useEffect} from 'react'

function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", messageData);

            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);

    return (
        <div className="flex flex-col w-6/12 mx-auto bg-white border-2 border-green-400 rounded-md">
            <div>Live Chat n°{room}</div>
            
            <div className="p-2 h-48">
            {messageList.map((messageContent) => {
                <div
                className="w-full overflow-y-auto"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="w-full">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="p-2">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            })}
            </div>
            <div className="w-full p-2">
                <input type="text" placeholder="Message..." className="w-8/12" onChange={(e) => {setCurrentMessage(e.target.value)}} />
                <button className="w-2/12 p-2 bg-green-500" onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat
