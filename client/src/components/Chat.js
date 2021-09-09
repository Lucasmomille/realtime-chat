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
            
            <div className="p-2 h-48 flex flex-col overflow-y-auto">
            {messageList.map((messageContent) => {
                return (
                <div
                className="w-5/12 text-left text-white"
                key={messageContent.message}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div className="w-full flex flex-col bg-green-400 rounded-md p-2 mb-2">
                  <div className="break-words">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="flex flex-row w-4/12 text-xs message__info">
                    <p id="time" className="mr-1">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
                )
            })}
            </div>
            <div className="w-11/12 mx-auto mb-1 p-2 border-2 border-gray-300">
                <input type="text" placeholder="Message..." value={currentMessage} className="w-8/12 p-2 focus:outline-none focus:ring-2 focus:ring-green-100
                " onChange={(e) => {setCurrentMessage(e.target.value)}} />
                <button 
                    className="w-2/12 p-2 bg-green-500 ml-2 text-white rounded-full" 
                    onClick={()=> {sendMessage()}}
                    onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                sendMessage();
                            }
                        }}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat
