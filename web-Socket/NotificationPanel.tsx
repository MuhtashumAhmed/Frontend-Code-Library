"use client";


import { useEffect, useState } from "react";
import { Check, CheckCheck, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellIcon2 } from "@/Icons/dashboardIcons/dashboardIcons";
import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/services/notificationsApi";
import { AppNotification } from "@/types/notification";
import { useSocketMessages } from "@/hooks/useSocketMessages";


// Compact "x ago" relative time from an ISO timestamp.
const timeAgo = (iso: string): string => {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const secs = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (secs < 60) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};


export default function NotificationPopover() {
  // ------ socket data -------
  const messages = useSocketMessages();
  console.log("socket Data from customer notification component ", messages);


  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // ----- APi calling ------
  useEffect(() => {
    (async () => {
      try {
        const page = await getNotifications(10);
        setItems(page.rows);
      } catch {
        setError("Couldn't load notifications.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  //  ---------Socket calling --------
  useEffect(() => {
    if (!messages?.length) return;
    const latestMessage = messages[messages.length - 1];
    // Notification payload validation
    if (
      !latestMessage?.id ||
      !latestMessage?.title ||
      !latestMessage?.message
    ) {
      return;
    }
    setItems((prev) => {
      // duplicate prevent
      const exists = prev.some((item) => item.id === latestMessage.id);

      if (exists) {
        return prev.map((item) =>
          item.id === latestMessage.id ? { ...item, ...latestMessage } : item,
        );
      }
      // add newest notification on top
      return [latestMessage, ...prev];
    });
  }, [messages]);


  const unreadCount = items.filter((n) => !n.is_read).length;


  const markAsRead = async (id: number) => {
    // Optimistic: flip locally, then persist. Roll back if the call fails.
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, is_read: true } : item)),
    );
    try {
      await markNotificationRead(id);
    } catch {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_read: false } : item,
        ),
      );
    }
  };


  const markAllAsRead = async () => {
    const previous = items;
    setItems((prev) => prev.map((item) => ({ ...item, is_read: true })));
    try {
      await markAllNotificationsRead();
    } catch {
      setItems(previous);
    }
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative">
          <div className="bg-[#F5F7FA] font-poppins shrink-0 md:h-12.5 h-8 w-8 md:w-12.5 rounded-full flex items-center justify-center">
            <BellIcon2 className="h-5 w-5 md:h-auto " />
          </div>


          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>


      <PopoverContent
        align="end"
        className="w-[380px] p-0 overflow-hidden font-poppins"
      >
        {/* Header */}
        <div className="border-b px-4 py-3 font-poppins">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-base">Notifications</h3>


            {!!unreadCount && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-medium text-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>


        {/* Notifications */}
        <div className="max-h-[420px] overflow-y-auto">
          {loading ? (
            <div className="space-y-4 p-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="h-4 w-40 rounded bg-gray-200 mb-2" />
                  <div className="h-3 w-full rounded bg-gray-100 mb-2" />
                  <div className="h-3 w-20 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="p-6 text-center text-sm text-red-600">{error}</p>
          ) : items.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              You&apos;re all caught up — no notifications yet.
            </p>
          ) : (
            items.map((notification) => (
              <div
                key={notification.id}
                className={`group flex gap-3 border-b p-4 transition hover:bg-muted/50 ${
                  !notification.is_read ? "bg-primary/5" : ""
                }`}
              >
                {/* unread dot */}
                <div className="mt-2">
                  {!notification.is_read && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>


                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>


                  <p className="mt-1 text-xs text-muted-foreground">
                    {notification.message}
                  </p>


                  <span className="mt-2 block text-[11px] text-muted-foreground">
                    {timeAgo(notification.created_at)}
                  </span>
                </div>


                {!notification.is_read ? (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="opacity-0 transition group-hover:opacity-100"
                    aria-label="Mark as read"
                  >
                    <Check className="h-4 w-4 text-primary" />
                  </button>
                ) : (
                  <CheckCheck className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))
          )}
        </div>


        {/* Footer */}
        <div className="border-t p-3 text-center">
          <button className="text-sm font-medium text-primary hover:underline">
            View all notifications
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
