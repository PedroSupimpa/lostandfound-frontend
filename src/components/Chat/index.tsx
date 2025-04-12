import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatProps {
  contactId?: string;
  contactName?: string;
  contactAvatar?: string;
  className?: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "user2",
    senderName: "John Doe",
    senderAvatar: "johndoe",
    content: "Hi there! I found your wallet near the park yesterday.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    isRead: true,
  },
  {
    id: "2",
    senderId: "user1",
    senderName: "Current User",
    senderAvatar: "currentuser",
    content: "Oh thank you so much! I've been looking everywhere for it!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30), // 2 days ago + 30 minutes
    isRead: true,
  },
  {
    id: "3",
    senderId: "user2",
    senderName: "John Doe",
    senderAvatar: "johndoe",
    content:
      "No problem! It has your ID in it so I knew it was yours. When would you like to meet to get it back?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
  },
  {
    id: "4",
    senderId: "user1",
    senderName: "Current User",
    senderAvatar: "currentuser",
    content: "I'm free tomorrow afternoon around 3pm. Would that work for you?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    isRead: true,
  },
  {
    id: "5",
    senderId: "user2",
    senderName: "John Doe",
    senderAvatar: "johndoe",
    content:
      "That works perfectly! Let's meet at the coffee shop near the park.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    isRead: false,
  },
];

const Chat = ({
  contactName = "John Doe",
  contactAvatar = "johndoe",
  className = "",
}: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "user1",
      senderName: "Current User",
      senderAvatar: "currentuser",
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contactAvatar}`}
              alt={contactName}
            />
            <AvatarFallback>
              {contactName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">{contactName}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-[400px] p-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === "user1";
            const showDate =
              index === 0 ||
              formatDate(message.timestamp) !==
                formatDate(messages[index - 1].timestamp);

            return (
              <div key={message.id} className="mb-4">
                {showDate && (
                  <div className="flex justify-center mb-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                <div
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${message.senderAvatar}`}
                          alt={message.senderName}
                        />
                        <AvatarFallback>
                          {message.senderName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`px-3 py-2 rounded-lg ${isCurrentUser ? "bg-primary text-primary-foreground ml-2" : "bg-muted"}`}
                      >
                        {message.content}
                      </div>
                      <div
                        className={`text-xs mt-1 text-muted-foreground ${isCurrentUser ? "text-right" : "text-left"}`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
      <div className="p-3 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Chat;
