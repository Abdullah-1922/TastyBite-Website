"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { toast } from "sonner";

import NotificationCard from "@/components/common/cards/notification/notification-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn-tabs";
import {
  useDeleteAllNotificationMutation,
  useDeleteArchivedMutation,
  useDeleteUnreadMutation,
  useGetNotificationQuery,
} from "@/redux/features/notification/notificationApi";
import { TNotification } from "@/types";

interface Props {
  userId: string;
}

/**
 * Notification Component:
 * Renders notifications for the user based on the selected tab: All, Unread, or Archived.
 * Includes functionalities for fetching, displaying, and clearing notifications.
 */
const Notification = ({ userId }: Props) => {
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">(
    "unread"
  );

  const { isLoading, data, isError, isFetching } = useGetNotificationQuery(
    {
      userId,
      isRead: activeTab === "unread" ? false : undefined,
      isArchived: activeTab === "archived" ? true : undefined,
    },
    { refetchOnMountOrArgChange: true }
  );

  // Fetch notifications based on the selected tab using RTK Query
  const [deleteUnread, { isLoading: isUnreadDeleting }] =
    useDeleteUnreadMutation();
  const [deleteArchived, { isLoading: isArchivedDeleting }] =
    useDeleteArchivedMutation();
  const [deleteAllNotification, { isLoading: isDeletingAll }] =
    useDeleteAllNotificationMutation();

  // Mutations for deleting notifications based on the active tab
  const isDeleting = isUnreadDeleting || isArchivedDeleting || isDeletingAll;

  /**
   * Handles notification deletion based on the active tab.
   */
  const handleDelete = async () => {
    try {
      if (activeTab === "all") await deleteAllNotification({ userId });
      else if (activeTab === "unread") await deleteUnread({ userId });
      else if (activeTab === "archived") await deleteArchived({ userId });
    } catch {
      toast.warning("Something went wrong!");
    }
  };

  /**
   * Dynamically renders content based on the current state of notifications:
   * Loading, Error, Empty, or List of Notifications.
   */
  const renderContent = useMemo(() => {
    if (isLoading || isFetching)
      return <LoaderState message="Retrieving notifications..." />;
    if (isError || !data?.success) {
      return (
        <ErrorState
          message={
            <>
              Something went wrong. Please try again later or{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                contact support
              </Link>
              .
            </>
          }
        />
      );
    }
    if (data?.data?.length === 0) {
      return (
        <EmptyState message="No notifications found. You’re all caught up!" />
      );
    }
    return (
      <ScrollArea className="h-[600px]">
        <div className="flex flex-col gap-y-5 mt-5 px-3">
          {data.data.map((notification: TNotification) => (
            <NotificationCard
              key={notification._id}
              userId={userId}
              activeTab={activeTab}
              data={notification}
            />
          ))}
        </div>
      </ScrollArea>
    );
  }, [isLoading, isFetching, isError, data, activeTab, userId]);

  /**
   * Returns the label for the clear button based on the active tab.
   */
  const clearButtonLabel = useMemo(() => {
    if (activeTab === "all") return "Clear All";
    if (activeTab === "unread") return "Clear All Unread";
    return "Clear Archived";
  }, [activeTab]);

  return (
    <div>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent}
      {data?.success && data?.data?.length > 0 && (
        <div className="flex mt-5 justify-end px-3">
          <Button
            variant="outline"
            size="sm"
            className="text-primary-black"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {clearButtonLabel}
            {isDeleting && (
              <Loader2 className="animate-spin opacity-60 h-4 w-4 ml-2" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Notification;

/**
 * Header Component:
 * Displays the title, description, and tab navigation for the Notification component.
 */
const Header = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: "all" | "unread" | "archived") => void;
}) => (
  <div className="flex justify-between items-center border-b pb-4">
    <div>
      <h1 className="text-[22px] font-narrow font-semibold text-primary-black">
        Notifications
      </h1>
      <p className="text-primary-black/50">
        Set your notification preferences to stay updated.
      </p>
    </div>
    <Tabs
      value={activeTab}
      onValueChange={(val) =>
        setActiveTab(val as "all" | "unread" | "archived")
      }
    >
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="unread">Unread</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);

/**
 * LoaderState Component:
 * Displays a loader with a message while content is loading.
 */
const LoaderState = ({ message }: { message: string }) => (
  <div className="min-h-[200px] flex justify-center items-center">
    <div className="flex flex-col items-center gap-y-2">
      <Loader2 className="animate-spin text-primary-black/80 opacity-50" />
      <p className="text-primary-black/80">{message}</p>
    </div>
  </div>
);

/**
 * ErrorState Component:
 * Displays an error message when fetching notifications fails.
 */
const ErrorState = ({ message }: { message: ReactNode }) => (
  <div className="min-h-[200px] flex justify-center items-center">
    <div className="flex flex-col items-center gap-y-2">
      <AlertCircle className="text-red-500/80 opacity-50" />
      <p className="text-primary-black/80 max-w-[370px] text-center">
        {message}
      </p>
    </div>
  </div>
);

/**
 * EmptyState Component:
 * Displays a message when no notifications are available.
 */
const EmptyState = ({ message }: { message: string }) => (
  <div className="min-h-[200px] flex justify-center items-center max-w-[380px] text-center text-primary-black mx-auto">
    {message}
  </div>
);
