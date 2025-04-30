import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, MessageSquare, Settings, Users } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Mock data for connections
const mockConnections = [
  { id: 1, name: "Alex Johnson", username: "alexj", avatar: "https://i.pravatar.cc/150?img=1", status: "online", isTeamMember: true, isConnected: true, isFavorite: true },
  { id: 2, name: "Sarah Williams", username: "sarahw", avatar: "https://i.pravatar.cc/150?img=5", status: "offline", isTeamMember: true, isConnected: true, isFavorite: false },
  { id: 3, name: "Michael Chen", username: "michaelc", avatar: "https://i.pravatar.cc/150?img=3", status: "online", isTeamMember: false, isConnected: true, isFavorite: false },
  { id: 4, name: "Emily Davis", username: "emilyd", avatar: "https://i.pravatar.cc/150?img=10", status: "offline", isTeamMember: false, isConnected: false, isFavorite: false },
  { id: 5, name: "James Wilson", username: "jamesw", avatar: "https://i.pravatar.cc/150?img=11", status: "online", isTeamMember: true, isConnected: true, isFavorite: true },
];

// Mock data for teams
const mockTeams = [
  { id: 1, name: "Design Team", members: 5, avatar: "💎" },
  { id: 2, name: "Development", members: 8, avatar: "🚀" },
  { id: 3, name: "Marketing", members: 4, avatar: "📊" },
];

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamEmoji, setNewTeamEmoji] = useState("🚀");
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  // Filter teams based on search query
  const filteredTeams = mockTeams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) {
      toast({
        title: "Team name required",
        description: "Please enter a name for your team",
        variant: "destructive",
      });
      return;
    }

    if (selectedMembers.length === 0) {
      toast({
        title: "Team members required",
        description: "Please select at least one team member",
        variant: "destructive",
      });
      return;
    }

    // Mock team creation
    toast({
      title: "Team created",
      description: `${newTeamName} has been created with ${selectedMembers.length} members!`,
    });

    // Reset form and close dialog
    setNewTeamName("");
    setSelectedMembers([]);
    setShowCreateTeamDialog(false);
  };

  const toggleMemberSelection = (connectionId: number) => {
    if (selectedMembers.includes(connectionId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== connectionId));
    } else {
      setSelectedMembers([...selectedMembers, connectionId]);
    }
  };

  const emojis = ["🚀", "💎", "🔥", "⚡", "🌟", "🎯", "🎨", "📊", "💡", "🛠️"];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 pb-20 md:pb-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Teams</h1>
            <p className="text-muted-foreground">Manage your teams and collaborations</p>
          </div>
        </div>

        <div className="mb-3 flex justify-between items-center">
          <div className="relative w-[260px]">
            <div className="flex w-full items-center rounded-md border border-input bg-background px-3 focus-within:ring-1 focus-within:ring-primary">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                className="flex w-full border-0 bg-transparent p-2 text-sm shadow-none focus-visible:outline-none focus-visible:ring-0" 
                placeholder="Search teams..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end m-0">
            <Dialog open={showCreateTeamDialog} onOpenChange={(open) => {
              setShowCreateTeamDialog(open);
              if (!open) {
                setSelectedMembers([]);
              }
            }}>
              <DialogTrigger asChild>
                <Button className="arc-gradient hover:opacity-90">
                  <Plus className="h-4 w-4 mr-1" /> Create Team
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create a new team</DialogTitle>
                  <DialogDescription>
                    Create a team to collaborate with your connections.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="team-name">Team name</Label>
                    <Input 
                      id="team-name" 
                      placeholder="Enter team name" 
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Team icon</Label>
                    <div className="flex flex-wrap gap-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className={`w-8 h-8 flex items-center justify-center rounded-md text-lg ${
                            newTeamEmoji === emoji 
                              ? "bg-primary/20 ring-2 ring-primary" 
                              : "hover:bg-accent"
                          }`}
                          onClick={() => setNewTeamEmoji(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid gap-2 mt-2">
                    <Label>Select team members</Label>
                    <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
                      {mockConnections.filter(c => c.isConnected).length > 0 ? (
                        mockConnections.filter(c => c.isConnected).map(connection => (
                          <div 
                            key={connection.id} 
                            className={`flex items-center justify-between p-2 rounded-md mb-1 cursor-pointer hover:bg-accent ${
                              selectedMembers.includes(connection.id) ? "bg-primary/10" : ""
                            }`}
                            onClick={() => toggleMemberSelection(connection.id)}
                          >
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={selectedMembers.includes(connection.id)} 
                                onChange={() => {}} // Handled by the div onClick
                                className="h-4 w-4"
                              />
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={connection.avatar} alt={connection.name} />
                                <AvatarFallback>{connection.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{connection.name}</p>
                                <p className="text-xs text-muted-foreground">@{connection.username}</p>
                              </div>
                            </div>
                            <div className={cn(
                              "w-2 h-2 rounded-full", 
                              connection.status === "online" ? "bg-green-500" : "bg-muted"
                            )} />
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">
                          No connections available
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setShowCreateTeamDialog(false);
                    setSelectedMembers([]);
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTeam}>
                    Create Team
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams.length > 0 ? (
              filteredTeams.map(team => (
                <Card key={team.id} className="hover:shadow-md transition-shadow duration-200 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-xl">
                          {team.avatar}
                        </div>
                        <div>
                          <CardTitle className="text-base">{team.name}</CardTitle>
                          <CardDescription>{team.members} members</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(team.members, 4))].map((_, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={`https://i.pravatar.cc/150?img=${team.id * 4 + i + 1}`} />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members > 4 && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-accent text-accent-foreground text-xs">
                          +{team.members - 4}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2 pt-0">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Team chat</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Settings</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs h-8 px-3 ml-auto"
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium">No teams found</h3>
                <p className="text-muted-foreground mt-1">Create a new team to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
