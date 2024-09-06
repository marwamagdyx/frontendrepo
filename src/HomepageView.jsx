import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import './styles/styles.css';
import messageIcon from './assets/message.svg';
import sendmsg from './assets/Send_Web.svg';
import userCircle from './assets/user-circle.svg';
import arrow from './assets/chevron_down.svg';
import logoutIcon from './assets/log-out.svg';
import search from './assets/search.svg';
import onlineIcon from './assets/Online.svg';
import { Link } from 'react-router-dom';

const HomepageView = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const chatMessagesRef = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:5000');

    socket.current.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.current.on('receiveMessage', (newMessage) => {
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [newMessage.chatId]: [...(prevMessages[newMessage.chatId] || []), newMessage],
      }));
    });

    return () => {
      socket.current.off('receiveMessage');
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (user && user.id) {
      setLoggedInUser(user);
    }
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
        const loggedInUser = JSON.parse(localStorage.getItem('user'));

        // Exclude the logged-in user from the users list
        const filteredUsers = usersData.filter(user => user._id !== loggedInUser.id);

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchLoggedInUser = () => {
      const storedUser = localStorage.getItem('user');
      console.log('Stored user:', storedUser); // Debugging line
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (user && user.id) {
        setLoggedInUser(user);
        setUsername(`${user.firstName} ${user.lastName}`.trim() || 'Guest');
      } else {
        console.error('Logged-in user is null or user ID is missing');
        // Redirect to login if no user found
      }
    };

    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    // Fetch messages when a chat is selected
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/chat/get-messages/${selectedChat.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch messages');
          const messages = await response.json();
          setChatMessages((prevMessages) => ({
            ...prevMessages,
            [selectedChat.id]: messages,
          }));
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      };
      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    const storedChat = localStorage.getItem('selectedChat');
    if (storedChat) {
      const chatData = JSON.parse(storedChat);
      setSelectedChat(chatData);

      // Fetch messages for the restored chat
      const fetchMessages = async (chatId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/chat/get-messages/${chatId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch messages');
          const messages = await response.json();
          setChatMessages((prevMessages) => ({
            ...prevMessages,
            [chatId]: messages,
          }));
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      };

      fetchMessages(chatData.id);
    }
  }, []);

  const handleCreateOrSelectChat = async (selectedUser) => {
    if (!selectedUser || !selectedUser._id) {
      console.error('Selected user is null or ID is missing');
      return;
    }

    try {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));

      if (!loggedInUser || !selectedUser || loggedInUser.id === selectedUser._id) {
        console.error("Cannot create or select chat with the logged-in user");
        return;
      }

      const loggedInUserId = loggedInUser.id;
      const participantId = selectedUser._id;

      const response = await fetch('http://localhost:5000/api/chat/get-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ participantIds: [loggedInUserId, participantId] }),
      });

      if (response.status === 404) {
        const createChatResponse = await fetch('http://localhost:5000/api/chat/create-chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ participants: [loggedInUserId, participantId] }),
        });

        if (!createChatResponse.ok) throw new Error('Failed to create new chat');

        const newChat = await createChatResponse.json();
        const selectedChatData = {
          id: newChat._id,
          name: selectedUser.name,
          online: selectedUser.online,
        };
        setSelectedChat(selectedChatData);
        localStorage.setItem('selectedChat', JSON.stringify(selectedChatData));
      } else if (response.ok) {
        const existingChat = await response.json();
        const selectedChatData = {
          id: existingChat._id,
          name: selectedUser.name,
          online: selectedUser.online,
        };
        setSelectedChat(selectedChatData);
        localStorage.setItem('selectedChat', JSON.stringify(selectedChatData));
      } else {
        throw new Error('Failed to fetch existing chat');
      }
    } catch (error) {
      console.error('Failed to create or fetch chat:', error);
    }
  };


  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    const newMessage = {
      chatId: selectedChat.id,
      text: message,
      timestamp: new Date().toISOString(),
      status: 'sent',
      sender: loggedInUser.id,  // Set the sender to the logged-in user's ID
    };

    try {
      const response = await fetch('http://localhost:5000/api/chat/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) throw new Error('Failed to save message to the server');

      const savedMessage = await response.json();
      setChatMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat.id]: [...(prevMessages[selectedChat.id] || []), savedMessage],
      }));

      socket.current.emit('sendMessage', savedMessage);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  const handleLogout = () => {
    // Remove user session data
    localStorage.removeItem('token');
    localStorage.removeItem('selectedChat');

    // Clear state related to chat
    setSelectedChat(null);
    setChatMessages({});
    <Link to="/login" className="form-link">Signup</Link>  // Assuming you use react-router for redirecting
  };

  const toggleMenu = () => setShowMenu(!showMenu);
  const filteredChats = users.filter(user => user.name.toLowerCase() !== "undefined undefined" && user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages, selectedChat]);


  const renderMessages = () => {
    if (!selectedChat || !chatMessages[selectedChat.id]) return null;

    return chatMessages[selectedChat.id].map((msg) => {
      // Ensure msg.sender is an object and log its structure
      const senderId = msg.sender && msg.sender._id ? msg.sender._id.toString() : null;

      console.log(`Rendering message from: ${senderId}, Logged-in user: ${loggedInUser.id}`);

      const isMyMessage = senderId === loggedInUser.id;

      return (
        <div key={msg._id} className={`message-row ${isMyMessage ? 'my-message-row' : 'their-message-row'}`}>
          {!isMyMessage && (
            <img src={userCircle || messageIcon} alt="Sender Avatar" className="message-avatar" />
          )}
          <div className="message-content">
            <div className={`message-bubble ${isMyMessage ? 'my-message' : 'their-message'}`}>
              {msg.text}
            </div>
            <div className="message-info">
              {isMyMessage && (
                <span className="message-status">
                  {msg.status === 'sent' && '✓'}
                  {msg.status === 'received' && '✓✓'}
                  {msg.status === 'read' && <span style={{ color: 'blue' }}>✓✓</span>}
                </span>
              )}
              <span className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

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
              <Link to="/login">Log out</Link>
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
                {renderMessages()}
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