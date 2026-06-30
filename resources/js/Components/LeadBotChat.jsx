import React, { useState, useRef, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function LeadBotChat() {
    const { settings } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { 
            sender: 'bot', 
            text: 'Hi there! 👋\n\nWelcome to Versatile Business School. How can we help you today?',
            options: [
                { label: 'View MBA Programs', link: '/program' },
                { label: 'Contact Details', link: '/contact' },
                { label: 'Speak to a Counselor', action: 'callback' }
            ]
        }
    ]);
    const [chatEnded, setChatEnded] = useState(false);
    const messagesEndRef = useRef(null);

    // Default to a fallback number if not set in admin panel
    const rawPhone = settings?.whatsapp_number || settings?.phone || '+91 9876543210';
    const whatsappNumber = rawPhone.replace(/\D/g, '');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const processUserMessage = (userMsg) => {
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setMessage('');
        setChatEnded(true); // Prevent further typing
        
        setTimeout(() => {
            setIsTyping(true);
            
            setTimeout(() => {
                setIsTyping(false);
                setMessages(prev => [...prev, { 
                    sender: 'bot', 
                    text: 'Thanks for reaching out! Please provide your phone number, and one of our admission counselors will contact you shortly.' 
                }]);
                setChatEnded(false); // Re-enable for number input
            }, 1500);
        }, 500);
    };

    const handleOptionClick = (option) => {
        if (option.link) {
            window.location.href = option.link;
        } else if (option.action === 'callback') {
            processUserMessage('I would like to speak to a counselor.');
        }
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim() && !chatEnded) {
            if (messages.length === 1 || !messages.some(m => m.sender === 'user')) {
                // First message from user
                processUserMessage(message.trim());
            } else if (message.trim() && messages.filter(m => m.sender === 'user').length === 1) {
                // This is the user's second message (phone number)
                const userPhone = message.trim();
                setMessages(prev => [...prev, { sender: 'user', text: userPhone }]);
                setMessage('');
                setChatEnded(true);

                setTimeout(() => {
                    setIsTyping(true);
                    
                    // Submit to backend
                    fetch('/enquiry/chat', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || ''
                        },
                        body: JSON.stringify({
                            phone: userPhone,
                            message: messages[1]?.text || 'No message'
                        })
                    });

                    setTimeout(() => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, { 
                            sender: 'bot', 
                            text: 'Thank you! We have received your details. Someone from our team will reach out to you soon.' 
                        }]);
                        
                        setTimeout(() => setIsOpen(false), 4000);
                    }, 1500);
                }, 500);
            }
        }
    };

    return (
        <div className="whatsapp-chat-widget">
            <style>{`
                .whatsapp-chat-widget {
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    z-index: 9999;
                    font-family: 'Inter', sans-serif;
                }
                .wa-button {
                    width: 50px;
                    height: 50px;
                    background-color: #07294d;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    outline: none;
                }
                .wa-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
                }
                .wa-window {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 340px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                    overflow: hidden;
                    transform-origin: bottom right;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    opacity: ${isOpen ? 1 : 0};
                    transform: scale(${isOpen ? 1 : 0});
                    pointer-events: ${isOpen ? 'auto' : 'none'};
                    display: flex;
                    flex-direction: column;
                    height: 450px;
                }
                .wa-header {
                    background: #0b192c;
                    color: white;
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-shrink: 0;
                }
                .wa-avatar {
                    width: 40px;
                    height: 40px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #0b192c;
                    font-size: 20px;
                }
                .wa-title h4 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                }
                .wa-title p {
                    margin: 0;
                    font-size: 12px;
                    opacity: 0.9;
                }
                .wa-body {
                    padding: 20px;
                    background: #ece5dd;
                    flex: 1;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                }
                
                /* Custom Scrollbar */
                .wa-body::-webkit-scrollbar {
                    width: 6px;
                }
                .wa-body::-webkit-scrollbar-track {
                    background: transparent;
                }
                .wa-body::-webkit-scrollbar-thumb {
                    background: rgba(0,0,0,0.1);
                    border-radius: 10px;
                }

                .wa-message {
                    padding: 10px 14px;
                    font-size: 14px;
                    color: #333;
                    max-width: 85%;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    margin-bottom: 12px;
                    position: relative;
                    word-wrap: break-word;
                    line-height: 1.5;
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .wa-message.bot {
                    background: white;
                    border-radius: 0 12px 12px 12px;
                    align-self: flex-start;
                }
                .wa-message.bot::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -8px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 8px 8px 0;
                    border-color: transparent white transparent transparent;
                }
                
                .wa-message.user {
                    background: #d9fdd3;
                    border-radius: 12px 0 12px 12px;
                    align-self: flex-end;
                }
                .wa-message.user::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: -8px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 0 8px 8px;
                    border-color: transparent transparent transparent #d9fdd3;
                }

                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    padding: 4px;
                }
                .typing-dot {
                    width: 6px;
                    height: 6px;
                    background: #999;
                    border-radius: 50%;
                    animation: typing 1.4s infinite ease-in-out both;
                }
                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }

                .wa-options {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-top: 10px;
                }
                .wa-option-btn {
                    background: white;
                    border: 1px solid #0b192c;
                    color: #0b192c;
                    padding: 8px 12px;
                    border-radius: 16px;
                    font-size: 13px;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-align: left;
                }
                .wa-option-btn:hover {
                    background: #0b192c;
                    color: white;
                }

                .wa-footer {
                    padding: 15px;
                    background: #f0f0f0;
                    display: flex;
                    gap: 10px;
                    flex-shrink: 0;
                }
                .wa-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid white;
                    border-radius: 24px;
                    outline: none;
                    font-size: 14px;
                    transition: border-color 0.3s;
                }
                .wa-input:focus {
                    border-color: #25d366;
                }
                .wa-input:disabled {
                    background: #e9ecef;
                    cursor: not-allowed;
                }
                .wa-send {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background: #0b192c;
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .wa-send:hover:not(:disabled) {
                    transform: scale(1.05);
                }
                .wa-send:disabled {
                    background: #64748b;
                    cursor: not-allowed;
                }
            `}</style>

            <div className="wa-window">
                <div className="wa-header">
                    <div className="wa-avatar">
                        <i className="ri-robot-2-fill"></i>
                    </div>
                    <div className="wa-title">
                        <h4>Virtual Assistant</h4>
                        <p>Online</p>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        style={{ background: 'none', border: 'none', color: 'white', marginLeft: 'auto', cursor: 'pointer', fontSize: '24px', padding: 0 }}
                    >
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                
                <div className="wa-body">
                    {messages.map((msg, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                            <div className={`wa-message ${msg.sender}`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i !== msg.text.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </div>
                            {msg.options && (
                                <div className="wa-options" style={{ marginBottom: '12px' }}>
                                    {msg.options.map((opt, idx) => (
                                        <button key={idx} className="wa-option-btn" onClick={() => handleOptionClick(opt)}>
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="wa-message bot">
                            <div className="typing-indicator">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="wa-footer" onSubmit={handleSend}>
                    <input 
                        type="text" 
                        className="wa-input" 
                        placeholder={messages.filter(m => m.sender === 'user').length >= 1 ? "Enter your phone number..." : "Type a message..."}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={chatEnded}
                        autoFocus={isOpen}
                    />
                    <button type="submit" className="wa-send" disabled={!message.trim() || chatEnded}>
                        <i className="ri-send-plane-fill"></i>
                    </button>
                </form>
            </div>

            <button className="wa-button" onClick={() => setIsOpen(!isOpen)} aria-label="Chat with us on WhatsApp">
                {isOpen ? <i className="ri-close-line"></i> : <i className="ri-message-3-fill"></i>}
            </button>
        </div>
    );
}
