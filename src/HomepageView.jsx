import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './styles/styles.css';
import { useLoginForm } from './hooks/useLogin';
import messageIcon from './assets/message.svg';
import sendmsg from './assets/Send_Web.svg';
import userCircle from './assets/user-circle.svg';
import arrow from './assets/chevron_down.svg';
import logoutIcon from './assets/log-out.svg'; 
import search from './assets/search.svg';
import onlineIcon from './assets/Online.svg';

// const HomepageView = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState({});
//   const [showMenu, setShowMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [username, setUsername] = useState('');
//   const { handleLogout } = useLoginForm();
//   const chatMessagesRef = useRef(null);
//   const socket = useRef(null);

//   useEffect(() => {
//     socket.current = io('http://localhost:3000');

//     socket.current.on('connect', () => {
//       console.log('Connected to the server');
//     });

//     socket.current.on('receiveMessage', (newMessage) => {
//       setChatMessages((prevMessages) => ({
//         ...prevMessages,
//         [newMessage.chatId]: [...(prevMessages[newMessage.chatId] || []), newMessage],
//       }));
//     });

//     return () => {
//       socket.current.disconnect();
//       socket.current.off('receiveMessage');
//     };
//   }, []);

//   useEffect(() => {
//     const firstName = localStorage.getItem('firstName') || '';
//     const lastName = localStorage.getItem('lastName') || '';
//     setUsername(`${firstName} ${lastName}`.trim() || 'Guest');
//   }, []);

//   useEffect(() => {
//     const fetchMessages = async (chatId) => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/chat/get-messages/${chatId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const data = await response.json();
//         console.log("🚀 ~ fetchMessages ~ data:", data)
//         setChatMessages((prevMessages) => ({
//           ...prevMessages,
//           [chatId]: data // Adjust if your API returns messages in a nested property
//         }));
//       } catch (error) {
//         console.error('Failed to fetch messages:', error);
//       }
//     };

//     if (selectedChat && selectedChat.id) {
//       fetchMessages(selectedChat.id);
//     }
//   }, [selectedChat]);

//   const handleSendMessage = () => {
//     if (message.trim() && selectedChat) {
//       const newMessage = { 
//         chatId: selectedChat.id,
//         text: message, 
//         timestamp: new Date(), 
//         status: 'sent',
//         fromMe: true
//       };
      
//       setChatMessages((prevMessages) => ({
//         ...prevMessages,
//         [selectedChat.id]: [...(prevMessages[selectedChat.id] || []), newMessage],
//       }));
//       setMessage('');
//       socket.current.emit('sendMessage', newMessage);
//     }
//   };

//   const toggleMenu = () => setShowMenu(!showMenu);

//   const chats = [
//     { id: 1, name: "Omar Emad", avatar: userCircle, online: true },
//     { id: 2, name: "Mohamed Mossalam", avatar: userCircle, online: false },
//     // Add more chat data here if needed
//   ];

//   const filteredChats = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));

//   useEffect(() => {
//     if (chatMessagesRef.current) {
//       chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
//     }
//   }, [chatMessages, selectedChat]);

//   return (
//     <div className="chat-home-container">
//       <div className="user-header">
//         <div className="user-info">
//           <img src={userCircle} alt="User Avatar" className="user-avatar" />
//           <span className="user-name">{username}</span>
//           <button className="moreInfo" onClick={toggleMenu}>
//             <img src={arrow} alt="Arrow" />
//           </button>
//         </div>
//         {showMenu && (
//           <div className="dropdown-menu">
//             <div className="menu-item" onClick={handleLogout}>
//               <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />
//               <span>Log Out</span>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="chat-body">
//         <div className="chat-list">
//           <div className="searchContainer">
//             <div className="searchWrapper">
//               <input
//                 type="text"
//                 className="search-bar"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <img src={search} className='searchIcon' alt="searchicon" />
//             </div>
//           </div>
//           {filteredChats.map(chat => (
//             <div
//               key={chat.id}
//               className="chat-list-item"
//               onClick={() => setSelectedChat(chat)}
//             >
//               <div className="chat-avatar-wrapper">
//                 <img src={chat.avatar} alt="User Avatar" className="chat-avatar" />
//                 {chat.online && <img src={onlineIcon} alt="Online" className="online-icon" />}
//               </div>
//               <div className="chat-info">
//                 <span className="chat-name">{chat.name}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="chat-window">
//           {!selectedChat ? (
//             <div className="no-chats-container">
//               <img src={messageIcon} alt="No messages yet" className="no-messages-image1" />
//               <div className="no-messages1">No chats here yet…</div>
//             </div>
//           ) : (
//             <>
//               <div className="chat-header">
//                 <div className="chat-avatar-wrapper">
//                   <img src={selectedChat.avatar || messageIcon} alt="User Avatar" className="chat-avatar" />
//                   {selectedChat.online && <img src={onlineIcon} alt="Online" className="online-icon" />}
//                 </div>
//                 <div className="chatContainer">
//                   <span className="chat-header-name">{selectedChat.name}</span>
//                   <span className="user-status">{selectedChat.online ? 'Online' : 'Offline'}</span>
//                 </div>
//               </div>

//               <div className="chat-messages" ref={chatMessagesRef}>
//                 {chatMessages[selectedChat.id]?.length === 0 ? (
//                   <div className="no-messages-container">
//                     <img src={messageIcon} alt="No messages" className="no-messages-image" />
//                     <p className="no-messages">You haven't started chatting yet</p>
//                   </div>
//                 ) : (
//                   chatMessages[selectedChat.id]?.map((msg, idx) => (
//                     <div key={idx} className={`message-row ${msg.fromMe ? 'my-message-row' : 'their-message-row'}`}>
//                       {!msg.fromMe && (
//                         <img src={selectedChat.avatar || messageIcon} alt="Sender Avatar" className="message-avatar" />
//                       )}
//                       <div className="message-content">
//                         <div className={`message-bubble ${msg.fromMe ? 'my-message' : 'their-message'}`}>
//                           {msg.text}
//                         </div>
//                         <div className="message-info">
//                           {msg.fromMe && (
//                             <span className="message-status">
//                               {msg.status === 'sent' && '✓'}
//                               {msg.status === 'received' && '✓✓'}
//                               {msg.status === 'read' && <span style={{ color: 'blue' }}>✓✓</span>}
//                             </span>
//                           )}
//                           <span className="message-time">
//                             {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div className="chat-input">
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Type your message..."
//                 />
//                 <button onClick={handleSendMessage} className="sendButton">
//                   <img src={sendmsg} alt="Send message" />
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomepageView;
// const HomepageView = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState({});
//   const [showMenu, setShowMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [username, setUsername] = useState('');
//   const [users, setUsers] = useState([]);
//   const { handleLogout } = useLoginForm();
//   const chatMessagesRef = useRef(null);
//   const socket = useRef(null);

//   useEffect(() => {
//     socket.current = io('http://localhost:3000');

//     socket.current.on('connect', () => {
//       console.log('Connected to the server');
//     });

//     socket.current.on('receiveMessage', (newMessage) => {
//       setChatMessages((prevMessages) => ({
//         ...prevMessages,
//         [newMessage.chatId]: [...(prevMessages[newMessage.chatId] || []), newMessage],
//       }));
//     });

//     return () => {
//       socket.current.disconnect();
//       socket.current.off('receiveMessage');
//     };
//   }, []);

//   useEffect(() => {
//     const firstName = localStorage.getItem('firstName') || '';
//     const lastName = localStorage.getItem('lastName') || '';
//     setUsername(`${firstName} ${lastName}`.trim() || 'Guest');
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/users', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }

//         const usersData = await response.json();
//         setUsers(usersData);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//  useEffect(() => {
//   const fetchChats = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/chat/fetch-chats', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const chatsData = await response.json();
//       setChatMessages(chatsData);

//       // Fetch users (if there's an endpoint to get users)
//       const usersResponse = await fetch('http://localhost:5000/api/users', {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       const usersData = await usersResponse.json();
//       setUsers(usersData);

//     } catch (error) {
//       console.error('Failed to fetch data:', error);
//     }
//   };
//   fetchChats();
// }, []);


//   useEffect(() => {
//     const fetchMessages = async (chatId) => {
//       try {
//         const response = await fetch(`http://localhost:5000/api/chat/get-messages/${chatId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         const data = await response.json();
//         setChatMessages((prevMessages) => ({
//           ...prevMessages,
//           [chatId]: data // Adjust if your API returns messages in a nested property
//         }));
//       } catch (error) {
//         console.error('Failed to fetch messages:', error);
//       }
//     };

//     if (selectedChat && selectedChat.id) {
//       fetchMessages(selectedChat.id);
//     }
//   }, [selectedChat]);

//   // const handleCreateOrSelectChat = async (chat) => {
//   //   try {
//   //     // Ensure the participant ID is a string
//   //     const participantId = chat.id.toString();
      
//   //     // Validate ID format (24-character hex string for MongoDB ObjectId)
//   //     if (!/^[0-9a-fA-F]{24}$/.test(participantId)) {
//   //       throw new Error('Invalid participant ID format');
//   //     }
  
//   //     // Fetch existing chat
//   //     const response = await fetch('http://localhost:5000/api/chat/get-chat', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': `Bearer ${localStorage.getItem('token')}`
//   //       },
//   //       body: JSON.stringify({ participantIds: [participantId] })
//   //     });
  
//   //     if (!response.ok) {
//   //       throw new Error(`Failed to fetch existing chat: ${response.statusText}`);
//   //     }
  
//   //     const existingChat = await response.json();
  
//   //     if (existingChat) {
//   //       setSelectedChat({
//   //         id: existingChat._id,
//   //         name: chat.name,
//   //         avatar: chat.avatar,
//   //         online: chat.online
//   //       });
//   //       setChatMessages((prevMessages) => ({
//   //         ...prevMessages,
//   //         [existingChat._id]: existingChat.messages
//   //       }));
//   //     } else {
//   //       // Create new chat
//   //       const createResponse = await fetch('http://localhost:5000/api/chat/create-chat', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           'Authorization': `Bearer ${localStorage.getItem('token')}`
//   //         },
//   //         body: JSON.stringify({ participants: [participantId] })
//   //       });
  
//   //       if (!createResponse.ok) {
//   //         throw new Error(`Failed to create chat: ${createResponse.statusText}`);
//   //       }
  
//   //       const newChat = await createResponse.json();
//   //       setSelectedChat({
//   //         id: newChat._id,
//   //         name: chat.name,
//   //         avatar: chat.avatar,
//   //         online: chat.online
//   //       });
//   //       setChatMessages((prevMessages) => ({
//   //         ...prevMessages,
//   //         [newChat._id]: newChat.messages
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     console.error('Failed to create or fetch chat:', error);
//   //   }
//   // };

//   const handleCreateOrSelectChat = async (user) => {
//     try {
//       const participantId = user._id.toString();

//       if (!/^[0-9a-fA-F]{24}$/.test(participantId)) {
//         throw new Error('Invalid participant ID format');
//       }

//       const response = await fetch('http://localhost:5000/api/chat/get-chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ participantIds: [participantId] })
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch existing chat: ${response.statusText}`);
//       }

//       const existingChat = await response.json();

//       if (existingChat) {
//         setSelectedChat({
//           id: existingChat._id,
//           name: user.name,
//           avatar: user.avatar,
//           online: user.online
//         });
//         setChatMessages((prevMessages) => ({
//           ...prevMessages,
//           [existingChat._id]: existingChat.messages
//         }));
//       } else {
//         const createResponse = await fetch('http://localhost:5000/api/chat/create-chat', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           },
//           body: JSON.stringify({ participants: [participantId] })
//         });

//         if (!createResponse.ok) {
//           throw new Error(`Failed to create chat: ${createResponse.statusText}`);
//         }

//         const newChat = await createResponse.json();
//         setSelectedChat({
//           id: newChat._id,
//           name: user.name,
//           avatar: user.avatar,
//           online: user.online
//         });
//         setChatMessages((prevMessages) => ({
//           ...prevMessages,
//           [newChat._id]: newChat.messages
//         }));
//       }
//     } catch (error) {
//       console.error('Failed to create or fetch chat:', error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (message.trim() && selectedChat) {
//       const newMessage = { 
//         chatId: selectedChat.id,
//         text: message, 
//         timestamp: new Date(), 
//         status: 'sent',
//         fromMe: true
//       };
      
//      // Update the chat messages in the state
//      setChatMessages((prevMessages) => ({
//       ...prevMessages,
//       [selectedChat.id]: [...(prevMessages[selectedChat.id] || []), newMessage],
//     }));
//     setMessage('');

//     // Emit the message through Socket.io
//     socket.current.emit('sendMessage', newMessage);

//     try {
//       // Send the message to the backend to be saved
//       const response = await fetch('http://localhost:5000/api/chat/send-message', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(newMessage),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send message');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   }
// };

//   const toggleMenu = () => setShowMenu(!showMenu);

//   const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

//   useEffect(() => {
//     if (chatMessagesRef.current) {
//       chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
//     }
//   }, [chatMessages, selectedChat]);

//   return (
//     <div className="chat-home-container">
//       <div className="user-header">
//         <div className="user-info">
//           <img src={userCircle} alt="User Avatar" className="user-avatar" />
//           <span className="user-name">{username}</span>
//           <button className="moreInfo" onClick={toggleMenu}>
//             <img src={arrow} alt="Arrow" />
//           </button>
//         </div>
//         {showMenu && (
//           <div className="dropdown-menu">
//             <div className="menu-item" onClick={handleLogout}>
//               <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />
//               <span>Log Out</span>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="chat-body">
//         <div className="chat-list">
//           <div className="searchContainer">
//             <div className="searchWrapper">
//               <input
//                 type="text"
//                 className="search-bar"
//                 placeholder="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <img src={search} className='searchIcon' alt="searchicon" />
//             </div>
//           </div>
//           {filteredChats.map(users => (
//             <div
//                key={users._id}
//               className="chat-list-item"
//               onClick={() => handleCreateOrSelectChat(users)}
//             >
//               <div className="chat-avatar-wrapper">
//                 <img src={users.avatar} alt="User Avatar" className="chat-avatar" />
//                 {users.online && <img src={onlineIcon} alt="Online" className="online-icon" />}
//               </div>
//               <div className="chat-info">
//                 <span className="chat-name">{users.name}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="chat-window">
//           {!selectedChat ? (
//             <div className="no-chats-container">
//               <img src={messageIcon} alt="No messages yet" className="no-messages-image1" />
//               <div className="no-messages1">No chats here yet…</div>
//             </div>
//           ) : (
//             <>
//               <div className="chat-header">
//                 <div className="chat-avatar-wrapper">
//                   <img src={selectedChat.avatar || messageIcon} alt="User Avatar" className="chat-avatar" />
//                   {selectedChat.online && <img src={onlineIcon} alt="Online" className="online-icon" />}
//                 </div>
//                 <div className="chatContainer">
//                   <span className="chat-header-name">{selectedChat.name}</span>
//                   <span className="user-status">{selectedChat.online ? 'Online' : 'Offline'}</span>
//                 </div>
//               </div>

//               <div className="chat-messages" ref={chatMessagesRef}>
//                 {chatMessages[selectedChat.id]?.length === 0 ? (
//                   <div className="no-messages-container">
//                     <img src={messageIcon} alt="No messages" className="no-messages-image" />
//                     <p className="no-messages">You haven't started chatting yet</p>
//                   </div>
//                 ) : (
//                   chatMessages[selectedChat.id]?.map((msg, idx) => (
//                     <div key={idx} className={`message-row ${msg.fromMe ? 'my-message-row' : 'their-message-row'}`}>
//                       {!msg.fromMe && (
//                         <img src={selectedChat.avatar || messageIcon} alt="Sender Avatar" className="message-avatar" />
//                       )}
//                       <div className="message-content">
//                         <div className={`message-bubble ${msg.fromMe ? 'my-message' : 'their-message'}`}>
//                           {msg.text}
//                         </div>
//                         <div className="message-info">
//                           {msg.fromMe && (
//                             <span className="message-status">
//                               {msg.status === 'sent' && '✓'}
//                               {msg.status === 'received' && '✓✓'}
//                               {msg.status === 'read' && <span style={{ color: 'blue' }}>✓✓</span>}
//                             </span>
//                           )}
//                           <span className="message-time">
//                             {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div className="chat-input">
//                 <input
//                   type="text"
//                   placeholder="Type your message here…"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//                 />
//                <button onClick={handleSendMessage} className="sendButton">
//                   <img src={sendmsg} alt="Send message" />
//                  </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomepageView;
// 
const HomepageView = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const { handleLogout } = useLoginForm();
  const chatMessagesRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3000');

    socket.current.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.current.on('receiveMessage', (newMessage) => {
      console.log('Received message via socket:', newMessage);
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [newMessage.chatId]: [...(prevMessages[newMessage.chatId] || []), newMessage],
      }));
    });

    return () => {
      socket.current.disconnect();
      socket.current.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    const firstName = localStorage.getItem('firstName') || '';
    const lastName = localStorage.getItem('lastName') || '';
    setUsername(`${firstName} ${lastName}`.trim() || 'Guest');
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chat/auth/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMessages = async (chatId) => {
      console.log('Fetching messages for chat ID:', chatId);
      try {
        const response = await fetch(`http://localhost:5000/api/chat/get-messages/${chatId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const chatMessages = await response.json();
        console.log('Fetched messages:', chatMessages);
        setChatMessages((prevMessages) => ({
          ...prevMessages,
          [chatId]: chatMessages
        }));
      } catch (error) {
        console.error('Error fetching chat messages:', error);
      }
    };
    if (selectedChat && selectedChat.id) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    const storedChat = localStorage.getItem('selectedChat');
    if (storedChat) {
      const chatData = JSON.parse(storedChat);
      console.log('Restored chat from localStorage:', chatData);
      setSelectedChat(chatData);

      const fetchMessages = async (chatId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/chat/get-messages/${chatId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const messages = await response.json();
          console.log('Fetched messages for restored chat:', messages);
          setChatMessages((prevMessages) => ({
            ...prevMessages,
            [chatId]: messages
          }));
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      };

      fetchMessages(chatData.id);
    }
  }, []);

  const handleCreateOrSelectChat = async (user) => {
    try {
      const participantId = user._id;
      console.log('Participant ID:', participantId);
      console.log('Selected Chat:', selectedChat);

      if (!/^[0-9a-fA-F]{24}$/.test(participantId)) {
        throw new Error('Invalid participant ID format');
      }

      // Try to fetch the existing chat
      const response = await fetch('http://localhost:5000/api/chat/get-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ participantIds: [participantId] })
      });

      console.log('Fetch Chat Response:', response);

      if (!response.ok) {
        throw new Error(`Failed to fetch existing chat: ${response.statusText}`);
      }

      const existingChat = await response.json();

      console.log('Existing Chat:', existingChat);

      // Set the selected chat
      const selectedChatData = {
        id: existingChat._id,
        name: user.name,
        online: user.online
      };
      localStorage.removeItem('selectedChat');
      setSelectedChat(selectedChatData);
      localStorage.setItem('selectedChat', JSON.stringify(selectedChatData));

      // Fetch the messages for the selected chat
      await fetchChatMessages(existingChat._id);

    } catch (error) {
      console.error('Failed to create or fetch chat:', error);
    }
  };

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/get-messages/${chatId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const messages = await response.json();
      console.log('Fetched messages:', messages);

      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [chatId]: messages
      }));
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() && selectedChat) {
      try {
        // Check if the chat exists, otherwise create it
        if (!selectedChat.id) {
          const chatResponse = await fetch('http://localhost:5000/api/chat/create-chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ participants: [selectedChat.participantId] })
          });

          if (!chatResponse.ok) {
            throw new Error('Failed to create chat');
          }

          const newChat = await chatResponse.json();
          setSelectedChat((prevChat) => ({ ...prevChat, id: newChat._id }));
        }

        // Now proceed to send the message since chat exists
        const newMessage = { 
          chatId: selectedChat.id,
          text: message, 
          timestamp: new Date().toISOString(),  
          status: 'sent',
          fromMe: true
        };

        setChatMessages((prevMessages) => ({
          ...prevMessages,
          [selectedChat.id]: [...(prevMessages[selectedChat.id] || []), newMessage],
        }));
        setMessage('');

        socket.current.emit('sendMessage', newMessage);

        const messageResponse = await fetch('http://localhost:5000/api/chat/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(newMessage),
        });

        if (!messageResponse.ok) {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        console.error('Error creating chat or sending message:', error);
      }
    }
  };
  
  const toggleMenu = () => setShowMenu(!showMenu);
  const filteredChats = users.filter(user => user.name.toLowerCase() !== "undefined undefined" && user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, selectedChat]);

  return (
    <div className="chat-home-container">
      <div className="user-header">
        <div className="user-info">
          <img src={userCircle} alt="User Avatar" className="user-avatar" />
          <span className="user-name">{username}</span>
          <button className="moreInfo" onClick={toggleMenu}>
            <img src={arrow} alt="Arrow" />
          </button>
        </div>
        {showMenu && (
          <div className="dropdown-menu">
            <div className="menu-item" onClick={handleLogout}>
              <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />
              <span>Log Out</span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-body">
        <div className="chat-list">
          <div className="searchContainer">
            <div className="searchWrapper">
             <input
                type="text"
                 className="search-bar"
                 placeholder="Search"
                 value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <img src={search} className='searchIcon' alt="searchicon" />
            </div>
          </div>
          {filteredChats.map(chat => (
            <div
              key={chat.id}
              className="chat-list-item"
              onClick={() => handleCreateOrSelectChat(chat)}
            >
              <div className="chat-avatar-wrapper">
                <img src={userCircle} alt="User Avatar" className="chat-avatar" />
                {chat.online && <img src={onlineIcon} alt="Online" className="online-icon" />}
              </div>
              <div className="chat-info">
                <span className="chat-name">{chat.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-window">
          {!selectedChat ? (
            <div className="no-chats-container">
              <img src={messageIcon} alt="No messages yet" className="no-messages-image1" />
              <div className="no-messages1">No chats here yet…</div>
            </div>
          ) : (
            <>
              <div className="chat-header">
                <div className="chat-avatar-wrapper">
                  <img src={userCircle || messageIcon} alt="User Avatar" className="chat-avatar" />
                  {selectedChat.online && <img src={onlineIcon} alt="Online" className="online-icon" />}
                </div>
                <div className="chatContainer">
                  <span className="chat-header-name">{selectedChat.name}</span>
                  <span className="user-status">{selectedChat.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>

              <div className="chat-messages" ref={chatMessagesRef}>
  {(chatMessages[selectedChat.id]?.length > 0) ? (
   chatMessages[selectedChat.id]?.map((msg, idx) => (
  <div key={msg._id || idx} className={`message-row ${msg.fromMe ? 'my-message-row' : 'their-message-row'}`}>
        {!msg.fromMe && (
          <img src={selectedChat.avatar || messageIcon} alt="Sender Avatar" className="message-avatar" />
        )}
        <div className="message-content">
          <div className={`message-bubble ${msg.fromMe ? 'my-message' : 'their-message'}`}>
            {msg.text}
          </div>
          <div className="message-info">
            {msg.fromMe && (
              <span className="message-status">
                {msg.status === 'sent' && '✓'}
                {msg.status === 'received' && '✓✓'}
                {msg.status === 'read' && <span style={{ color: 'blue' }}>✓✓</span>}
              </span>
            )}
            <span className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}  // Convert timestamp correctly
            </span>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="no-messages-container">
      <img src={messageIcon} alt="No messages" className="no-messages-image" />
      <p className="no-messages">You haven't started chatting yet</p>
    </div>
  )}
</div>

              <div className="chat-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button onClick={handleSendMessage} className="sendButton">
                  <img src={sendmsg} alt="Send message" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomepageView;