import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const AnnouncementsComponent = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "urgent", label: "Urgent" },
    { id: "update", label: "Updates" },
    { id: "maintenance", label: "Maintenance" },
    { id: "general", label: "General" },
  ];

  const announcements = [
    {
      id: 1,
      title: "System Maintenance Scheduled",
      message:
        "The DriveLink system will undergo maintenance on Dec 20, 2023 from 2:00 AM to 4:00 AM. Some features may be temporarily unavailable.",
      type: "maintenance",
      priority: "high",
      author: "System Admin",
      timestamp: "Today, 10:30 AM",
      read: false,
      color: "#FF9800",
    },
    {
      id: 2,
      title: "New Feature: Live Tracking",
      message:
        "We've launched real-time live tracking for all vehicles. You can now monitor your assigned cars in real-time from the tracking tab.",
      type: "update",
      priority: "medium",
      author: "Product Team",
      timestamp: "Yesterday, 03:45 PM",
      read: true,
      color: "#2196F3",
    },
    {
      id: 3,
      title: "Fuel Price Update",
      message:
        "Effective immediately, fuel expenses should be logged at the new rate of $3.45 per gallon. Please update your expense logs accordingly.",
      type: "urgent",
      priority: "high",
      author: "Finance Department",
      timestamp: "Dec 14, 09:15 AM",
      read: true,
      color: "#F44336",
    },
    {
      id: 4,
      title: "Driver Safety Training",
      message:
        "Monthly safety training session will be held on Dec 22 at 10:00 AM. All drivers are required to attend. Location: Main Office Conference Room.",
      type: "general",
      priority: "medium",
      author: "Safety Officer",
      timestamp: "Dec 13, 02:30 PM",
      read: true,
      color: "#4CAF50",
    },
    {
      id: 5,
      title: "Holiday Schedule",
      message:
        "Office will be closed from Dec 24 to Dec 26 for Christmas holidays. Emergency support will be available via the app.",
      type: "general",
      priority: "low",
      author: "HR Department",
      timestamp: "Dec 12, 11:00 AM",
      read: true,
      color: "#9C27B0",
    },
    {
      id: 6,
      title: "App Update Available",
      message:
        "Version 2.1.0 is now available with bug fixes and performance improvements. Please update your app from the store.",
      type: "update",
      priority: "medium",
      author: "Tech Team",
      timestamp: "Dec 11, 04:20 PM",
      read: true,
      color: "#2196F3",
    },
  ];

  const unreadCount = announcements.filter((a) => !a.read).length;

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (activeFilter === "all") return true;
    return announcement.type === activeFilter;
  });

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleSendAnnouncement = () => {
    if (!newAnnouncement.trim()) return;
    // Send announcement logic
    setNewAnnouncement("");
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Announcements</Text>
          <Text style={styles.subtitle}>
            Important updates and notifications
          </Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{unreadCount} new</Text>
        </View>
      </View>

      {/* New Announcement Input (for managers/owners) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create Announcement</Text>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Type your announcement here..."
            placeholderTextColor="#9E9E9E"
            value={newAnnouncement}
            onChangeText={setNewAnnouncement}
            multiline
            numberOfLines={3}
          />
          <View style={styles.inputActions}>
            <View style={styles.priorityButtons}>
              <TouchableOpacity
                style={[styles.priorityButton, styles.priorityLow]}
              >
                <Text style={styles.priorityButtonText}>Low</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.priorityButton, styles.priorityMedium]}
              >
                <Text style={styles.priorityButtonText}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.priorityButton, styles.priorityHigh]}
              >
                <Text style={styles.priorityButtonText}>High</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendAnnouncement}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
          >
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === filter.id && styles.filterButtonTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Announcements List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeFilter === "all"
              ? "All Announcements"
              : filters.find((f) => f.id === activeFilter)?.label}
            <Text style={styles.countText}>
              {" "}
              ({filteredAnnouncements.length})
            </Text>
          </Text>
          <TouchableOpacity style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.announcementsContainer}>
          {filteredAnnouncements.map((announcement) => (
            <View key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <View
                  style={[
                    styles.typeIndicator,
                    { backgroundColor: announcement.color },
                  ]}
                />
                <View style={styles.announcementInfo}>
                  <Text style={styles.announcementTitle}>
                    {announcement.title}
                  </Text>
                  <View style={styles.announcementMeta}>
                    <Text style={styles.announcementAuthor}>
                      {announcement.author}
                    </Text>
                    <Text style={styles.announcementTime}>
                      {announcement.timestamp}
                    </Text>
                  </View>
                </View>
                <View style={styles.announcementStatus}>
                  {!announcement.read && <View style={styles.unreadDot} />}
                  <View
                    style={[
                      styles.priorityBadge,
                      announcement.priority === "high" &&
                        styles.priorityHighBadge,
                      announcement.priority === "medium" &&
                        styles.priorityMediumBadge,
                      announcement.priority === "low" &&
                        styles.priorityLowBadge,
                    ]}
                  >
                    <Text style={styles.priorityBadgeText}>
                      {announcement.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.announcementMessage}>
                {announcement.message}
              </Text>
              <View style={styles.announcementActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="checkmark-circle" size={16} color="#666666" />
                  <Text style={styles.actionButtonText}>Mark Read</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="share" size={16} color="#666666" />
                  <Text style={styles.actionButtonText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="archive" size={16} color="#666666" />
                  <Text style={styles.actionButtonText}>Archive</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcement Stats</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="megaphone" size={24} color="#2196F3" />
            <Text style={styles.statValue}>{announcements.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="warning" size={24} color="#F44336" />
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Urgent</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#FF9800" />
            <Text style={styles.statValue}>1</Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="calendar" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <View
              style={[styles.quickActionIcon, { backgroundColor: "#E3F2FD" }]}
            >
              <Ionicons name="notifications" size={24} color="#2196F3" />
            </View>
            <Text style={styles.quickActionText}>Notification Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <View
              style={[styles.quickActionIcon, { backgroundColor: "#E8F5E9" }]}
            >
              <Ionicons name="archive" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.quickActionText}>View Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <View
              style={[styles.quickActionIcon, { backgroundColor: "#FFF3E0" }]}
            >
              <Ionicons name="download" size={24} color="#FF9800" />
            </View>
            <Text style={styles.quickActionText}>Export Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <View
              style={[styles.quickActionIcon, { backgroundColor: "#F3E5F5" }]}
            >
              <Ionicons name="help-circle" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.quickActionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
  },
  badgeContainer: {
    backgroundColor: "#F44336",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badge: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  countText: {
    color: "#666666",
    fontWeight: "400",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1A1A1A",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  inputActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priorityButtons: {
    flexDirection: "row",
    gap: 8,
  },
  priorityButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priorityLow: {
    backgroundColor: "#E8F5E9",
  },
  priorityMedium: {
    backgroundColor: "#FFF3E0",
  },
  priorityHigh: {
    backgroundColor: "#FFEBEE",
  },
  priorityButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  sendButton: {
    backgroundColor: "#1A1A1A",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  filterButtonActive: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  announcementsContainer: {
    gap: 16,
  },
  announcementCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  announcementHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  announcementInfo: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  announcementMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  announcementAuthor: {
    fontSize: 12,
    color: "#666666",
  },
  announcementTime: {
    fontSize: 12,
    color: "#999999",
  },
  announcementStatus: {
    alignItems: "flex-end",
    gap: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F44336",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  priorityHighBadge: {
    backgroundColor: "#FFEBEE",
  },
  priorityMediumBadge: {
    backgroundColor: "#FFF3E0",
  },
  priorityLowBadge: {
    backgroundColor: "#E8F5E9",
  },
  priorityBadgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#666666",
  },
  announcementMessage: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
    marginBottom: 16,
  },
  announcementActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionButton: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
});

export default AnnouncementsComponent;
