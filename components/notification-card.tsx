"use client"

import { useState } from "react"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: string
  read: boolean
  avatar: string
  initials: string
  type: "invitation" | "notification"
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Sarah invited you",
    message: "Sarah Johnson invited you to join the project",
    timestamp: "5 minutes ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    initials: "SJ",
    type: "invitation",
  },
  {
    id: "2",
    title: "Mike sent you a message",
    message: "Hey, can you review the latest design?",
    timestamp: "1 hour ago",
    read: false,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    initials: "MK",
    type: "notification",
  },
  {
    id: "3",
    title: "Emma invited you",
    message: "Emma Davis invited you to collaborate",
    timestamp: "2 hours ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    initials: "ED",
    type: "invitation",
  },
  {
    id: "4",
    title: "System Update",
    message: "Your system has been updated successfully",
    timestamp: "30 minutes ago",
    read: true,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=System",
    initials: "SY",
    type: "notification",
  },
]

export function NotificationCard() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const invitations = notifications.filter((n) => n.type === "invitation")
  const notificationsList = notifications.filter((n) => n.type === "notification")

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleClearAll = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div
      className={`flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer ${
        !notification.read ? "bg-muted/30" : ""
      }`}
      onClick={() => handleMarkAsRead(notification.id)}
    >
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={notification.avatar || "/placeholder.svg"} alt={notification.initials} />
        <AvatarFallback>{notification.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className={`text-sm ${!notification.read ? "font-medium text-foreground" : "text-muted-foreground"}`}>
            {notification.title}
          </p>
          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
        <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
      </div>
    </div>
  )

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button variant="outline" size="icon" className="relative bg-transparent" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown Panel */}
      {isOpen && (
        <Card className="absolute right-0 top-12 z-50 w-96 shadow-lg">
          <div className="flex items-center justify-between border-b border-border p-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="invitations" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="invitations"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Invitations
                {invitations.filter((n) => !n.read).length > 0 && (
                  <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {invitations.filter((n) => !n.read).length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Notifications
                {notificationsList.filter((n) => !n.read).length > 0 && (
                  <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {notificationsList.filter((n) => !n.read).length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Invitations Tab */}
            <TabsContent value="invitations" className="m-0 max-h-96 overflow-y-auto">
              {invitations.length > 0 ? (
                <div className="divide-y divide-border">
                  {invitations.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <p className="text-sm">No invitations</p>
                </div>
              )}
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="m-0 max-h-96 overflow-y-auto">
              {notificationsList.length > 0 ? (
                <div className="divide-y divide-border">
                  {notificationsList.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <p className="text-sm">No notifications</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Footer */}
          {notifications.some((n) => !n.read) && (
            <div className="border-t border-border p-3">
              <Button variant="ghost" size="sm" className="w-full text-xs" onClick={handleClearAll}>
                Mark all as read
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
