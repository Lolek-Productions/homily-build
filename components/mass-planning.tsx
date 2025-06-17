"use client"

import { useState } from "react"
import { Church, User, Music, Palette, FileText, Plus, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export function MassPlanning() {
  const [selectedMass, setSelectedMass] = useState("2024-01-14-1030")

  const massPlans = [
    {
      id: "2024-01-14-1030",
      date: "2024-01-14",
      time: "10:30 AM",
      liturgy: "Second Sunday in Ordinary Time",
      presider: "Fr. Michael Johnson",
      deacon: "Deacon Robert Smith",
      season: "Ordinary Time",
      color: "Green",
      specialNotes: "Family Mass - Children's Choir participating",
      music: {
        entrance: "Gather Us In",
        psalm: "Psalm 40 - Here I Am Lord",
        offertory: "Take and Receive",
        communion: "One Bread, One Body",
        recessional: "Go Make a Difference",
      },
      ministers: {
        lector1: "Mary Johnson",
        lector2: "John Smith",
        extraordinaryMinisters: ["Lisa Davis", "Michael Brown", "Sarah Wilson"],
        ushers: ["Tom Anderson", "Bill Thompson"],
        greeters: ["Nancy White", "Carol Johnson"],
        altarServers: ["Emma Davis", "Luke Wilson"],
        cantor: "Sarah Wilson",
      },
      environment: {
        flowers: "White lilies on altar",
        banners: "Ordinary Time green banners",
        specialDecorations: "None",
        candles: "Standard altar candles",
      },
    },
  ]

  const currentPlan = massPlans.find((plan) => plan.id === selectedMass) || massPlans[0]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Church className="h-5 w-5" />
                <span>Mass Planning</span>
              </CardTitle>
              <CardDescription>Comprehensive planning for liturgical celebrations</CardDescription>
            </div>
            <div className="flex space-x-2">
              <Select value={selectedMass} onValueChange={setSelectedMass}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select Mass" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01-14-1030">Jan 14 - 10:30 AM Sunday</SelectItem>
                  <SelectItem value="2024-01-14-0800">Jan 14 - 8:00 AM Sunday</SelectItem>
                  <SelectItem value="2024-01-14-1800">Jan 14 - 6:00 PM Sunday</SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Mass Plan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Mass Plan</DialogTitle>
                    <DialogDescription>Set up planning details for a new liturgical celebration</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="massDate">Date</Label>
                        <Input id="massDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="massTime">Time</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0800">8:00 AM</SelectItem>
                            <SelectItem value="1030">10:30 AM</SelectItem>
                            <SelectItem value="1800">6:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="liturgyTitle">Liturgy</Label>
                      <Input id="liturgyTitle" placeholder="e.g., Third Sunday in Ordinary Time" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="presider">Presider</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select presider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr-michael">Fr. Michael Johnson</SelectItem>
                            <SelectItem value="fr-john">Fr. John Davis</SelectItem>
                            <SelectItem value="fr-robert">Fr. Robert Wilson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="season">Liturgical Season</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select season" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ordinary">Ordinary Time</SelectItem>
                            <SelectItem value="advent">Advent</SelectItem>
                            <SelectItem value="christmas">Christmas</SelectItem>
                            <SelectItem value="lent">Lent</SelectItem>
                            <SelectItem value="easter">Easter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="specialNotes">Special Notes</Label>
                      <Textarea id="specialNotes" placeholder="Any special requirements or notes for this Mass" />
                    </div>
                    <Button className="w-full">Create Mass Plan</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Celebration Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(currentPlan.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at {currentPlan.time}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Liturgy</p>
                  <p className="text-sm text-muted-foreground">{currentPlan.liturgy}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Season</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-600 text-white">{currentPlan.season}</Badge>
                    <span className="text-sm text-muted-foreground">Color: {currentPlan.color}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Clergy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Presider</p>
                  <p className="text-sm text-muted-foreground">{currentPlan.presider}</p>
                </div>
                {currentPlan.deacon && (
                  <div>
                    <p className="text-sm font-medium">Deacon</p>
                    <p className="text-sm text-muted-foreground">{currentPlan.deacon}</p>
                  </div>
                )}
                <div className="pt-2">
                  <Button size="sm" variant="outline" className="w-full">
                    Contact Clergy
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Special Notes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{currentPlan.specialNotes}</p>
                <Button size="sm" variant="outline" className="w-full mt-3">
                  Edit Notes
                </Button>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="ministers" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ministers">Ministers</TabsTrigger>
              <TabsTrigger value="music">Music</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
            </TabsList>

            <TabsContent value="ministers" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Liturgical Ministers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">First Lector</span>
                        <span className="text-sm text-muted-foreground">{currentPlan.ministers.lector1}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Second Lector</span>
                        <span className="text-sm text-muted-foreground">{currentPlan.ministers.lector2}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Cantor</span>
                        <span className="text-sm text-muted-foreground">{currentPlan.ministers.cantor}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Edit Assignments
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Support Ministers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium block mb-1">Extraordinary Ministers</span>
                        <div className="flex flex-wrap gap-1">
                          {currentPlan.ministers.extraordinaryMinisters.map((minister) => (
                            <Badge key={minister} variant="secondary" className="text-xs">
                              {minister}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Ushers</span>
                        <div className="flex flex-wrap gap-1">
                          {currentPlan.ministers.ushers.map((usher) => (
                            <Badge key={usher} variant="secondary" className="text-xs">
                              {usher}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Greeters</span>
                        <div className="flex flex-wrap gap-1">
                          {currentPlan.ministers.greeters.map((greeter) => (
                            <Badge key={greeter} variant="secondary" className="text-xs">
                              {greeter}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium block mb-1">Altar Servers</span>
                        <div className="flex flex-wrap gap-1">
                          {currentPlan.ministers.altarServers.map((server) => (
                            <Badge key={server} variant="secondary" className="text-xs">
                              {server}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Manage Ministers
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="music" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Music className="h-5 w-5" />
                    <span>Music Selections</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <Label className="font-medium">Entrance Hymn</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.music.entrance}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Responsorial Psalm</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.music.psalm}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Offertory</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.music.offertory}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="font-medium">Communion</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.music.communion}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Recessional</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.music.recessional}</p>
                      </div>
                      <div className="pt-2">
                        <Button size="sm" variant="outline" className="w-full">
                          Edit Music Selections
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="environment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Liturgical Environment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <Label className="font-medium">Flowers</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.environment.flowers}</p>
                      </div>
                      <div>
                        <Label className="font-medium">Banners</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.environment.banners}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="font-medium">Special Decorations</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {currentPlan.environment.specialDecorations}
                        </p>
                      </div>
                      <div>
                        <Label className="font-medium">Candles</Label>
                        <p className="text-sm text-muted-foreground mt-1">{currentPlan.environment.candles}</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    Update Environment Plan
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="checklist" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pre-Mass Checklist</CardTitle>
                  <CardDescription>Ensure all preparations are complete before the celebration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="readings" />
                        <Label htmlFor="readings">Scripture readings prepared and assigned</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ministers" />
                        <Label htmlFor="ministers">All ministers confirmed and notified</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="music" />
                        <Label htmlFor="music">Music selections finalized with choir/cantor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="altar" />
                        <Label htmlFor="altar">Altar prepared with proper linens and vessels</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="environment" />
                        <Label htmlFor="environment">Liturgical environment set according to season</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="sound" />
                        <Label htmlFor="sound">Sound system tested and microphones ready</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="bulletins" />
                        <Label htmlFor="bulletins">Bulletins printed and available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="communion" />
                        <Label htmlFor="communion">Communion bread and wine prepared</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vestments" />
                        <Label htmlFor="vestments">Proper vestments laid out for presider</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="collection" />
                        <Label htmlFor="collection">Collection baskets ready and ushers briefed</Label>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button className="w-full">Mark All Complete</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
