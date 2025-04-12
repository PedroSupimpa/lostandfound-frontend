import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Chat from "@/components/Chat";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "johndoe",
    lastMessage:
      "That works perfectly! Let's meet at the coffee shop near the park.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 1,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "janesmith",
    lastMessage: "I found your keys at the library yesterday.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "mikejohnson",
    lastMessage: "Is this backpack still available?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Sarah Williams",
    avatar: "sarahwilliams",
    lastMessage: "Thank you for finding my phone!",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    unreadCount: 0,
  },
];

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(
    mockContacts[0],
  );
  const [searchQuery, setSearchQuery] = useState("");

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="px-4 py-3 space-y-2">
              <CardTitle className="text-xl">Messages</CardTitle>
              <CardDescription>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`flex items-center p-3 cursor-pointer hover:bg-muted/50 transition-colors ${selectedContact?.id === contact.id ? "bg-muted" : ""}`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatar}`}
                            alt={contact.name}
                          />
                          <AvatarFallback>
                            {contact.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {contact.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium truncate">
                            {contact.name}
                          </h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTime(contact.lastMessageTime)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {contact.lastMessage}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    No contacts found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          {selectedContact ? (
            <Chat
              contactName={selectedContact.name}
              contactAvatar={selectedContact.avatar}
              className="h-full"
            />
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center p-6">
                <p className="text-muted-foreground">
                  Select a conversation to start messaging
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
