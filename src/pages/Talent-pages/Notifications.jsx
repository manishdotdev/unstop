import React, { useState } from "react"
import { Bell, Check, Trash2, Briefcase, GraduationCap, Trophy, Users, Calendar, BookOpen } from "lucide-react"

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: "job",
            title: "New job opportunity",
            message: "Software Engineer position at Google - Apply now!",
            time: "2 min ago",
            read: false,
            icon: Briefcase
        },
        {
            id: 2,
            type: "internship",
            title: "Internship application update",
            message: "Your application for Marketing Internship at Microsoft has been reviewed.",
            time: "1 hour ago",
            read: false,
            icon: GraduationCap
        },
        {
            id: 3,
            type: "competition",
            title: "Competition ending soon",
            message: "Hackathon 2024 ends in 2 hours. Don't miss out!",
            time: "3 hours ago",
            read: true,
            icon: Trophy
        },
        {
            id: 4,
            type: "mentor",
            title: "Mentor session reminder",
            message: "Your mentor session with John Doe is scheduled for tomorrow at 10 AM.",
            time: "5 hours ago",
            read: true,
            icon: Users
        },
        {
            id: 5,
            type: "event",
            title: "Event registration confirmed",
            message: "You have successfully registered for Tech Conference 2024.",
            time: "1 day ago",
            read: true,
            icon: Calendar
        },
        {
            id: 6,
            type: "course",
            title: "New course available",
            message: "Check out our new 'React Advanced' course now available.",
            time: "2 days ago",
            read: false,
            icon: BookOpen
        }
    ])

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
        ))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id))
    }

    const clearAll = () => {
        setNotifications([])
    }

    const getIconColor = (type) => {
        switch (type) {
            case "job": return "text-blue-500"
            case "internship": return "text-green-500"
            case "competition": return "text-amber-500"
            case "mentor": return "text-purple-500"
            case "event": return "text-pink-500"
            case "course": return "text-indigo-500"
            default: return "text-slate-500"
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2">
                            <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                            Notifications
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            You have {unreadCount} unread notifications
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition flex items-center gap-1.5"
                            >
                                <Check size={16} />
                                Mark all read
                            </button>
                        )}
                        {notifications.length > 0 && (
                            <button
                                onClick={clearAll}
                                className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition flex items-center gap-1.5"
                            >
                                <Trash2 size={16} />
                                Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* Notifications List */}
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl shadow-sm border border-slate-200">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Bell size={40} className="text-slate-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">No notifications</h3>
                        <p className="text-sm text-slate-500 text-center max-w-md">
                            You're all caught up! New notifications will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notification) => {
                            const Icon = notification.icon
                            return (
                                <div
                                    key={notification.id}
                                    className={`bg-white rounded-xl p-4 sm:p-5 shadow-sm border transition-all duration-200 hover:shadow-md ${
                                        !notification.read 
                                            ? "border-l-4 border-l-indigo-500 border-t border-slate-200" 
                                            : "border border-slate-200"
                                    }`}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center ${getIconColor(notification.type)}`}>
                                            <Icon size={20} />
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                                                        {notification.title}
                                                    </h4>
                                                    <p className="text-sm text-slate-600 mt-1">
                                                        {notification.message}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-slate-400 whitespace-nowrap">
                                                    {notification.time}
                                                </span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 mt-3">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-xs font-medium text-rose-500 hover:text-rose-600 transition ml-auto"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notifications