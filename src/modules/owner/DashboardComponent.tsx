import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const OwnerDashboardComponent = () => {
  // Mock data for dashboard
  const stats = [
    { id: 1, title: "Total Cars", value: "24", icon: "car", change: "+2" },
    {
      id: 2,
      title: "Active Drivers",
      value: "18",
      icon: "people",
      change: "+3",
    },
    { id: 3, title: "Managers", value: "4", icon: "briefcase", change: "+1" },
    {
      id: 4,
      title: "Revenue Today",
      value: "$2,840",
      icon: "cash",
      change: "+12%",
      accent: true,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      driver: "John Doe",
      action: "Completed trip",
      time: "10 min ago",
      amount: "$45",
    },
    {
      id: 2,
      driver: "Jane Smith",
      action: "Added expense",
      time: "25 min ago",
      amount: "$28",
    },
    {
      id: 3,
      driver: "Mike Johnson",
      action: "Started shift",
      time: "1 hour ago",
      amount: "-",
    },
    {
      id: 4,
      driver: "Sarah Wilson",
      action: "Fuel refill",
      time: "2 hours ago",
      amount: "$65",
    },
  ];

  const alerts = [
    { id: 1, type: "warning", message: "Car #DL-789 needs maintenance" },
    { id: 2, type: "info", message: "Monthly report ready for review" },
    { id: 3, type: "success", message: "All drivers active today" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, Owner</Text>
        <Text style={styles.date}>Friday, Dec 15</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View
            key={stat.id}
            style={[styles.statCard, stat.accent && styles.statCardAccent]}
          >
            <View style={styles.statHeader}>
              <Ionicons
                name={stat.icon as any}
                size={20}
                color={stat.accent ? "#FFC107" : "#666666"}
              />
              <Text
                style={[
                  styles.statTitle,
                  stat.accent && styles.statTitleAccent,
                ]}
              >
                {stat.title}
              </Text>
            </View>
            <Text
              style={[styles.statValue, stat.accent && styles.statValueAccent]}
            >
              {stat.value}
            </Text>
            <View style={styles.statChange}>
              <Text
                style={[
                  styles.changeText,
                  stat.change.startsWith("+")
                    ? styles.changePositive
                    : styles.changeNegative,
                ]}
              >
                {stat.change}
              </Text>
              <Text style={styles.changeLabel}> from yesterday</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Alerts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alertsContainer}>
          {alerts.map((alert) => (
            <View
              key={alert.id}
              style={[
                styles.alertCard,
                styles[
                  `alert${
                    alert.type.charAt(0).toUpperCase() + alert.type.slice(1)
                  }`
                ],
              ]}
            >
              <Ionicons
                name={
                  alert.type === "warning"
                    ? "warning"
                    : alert.type === "info"
                    ? "information-circle"
                    : "checkmark-circle"
                }
                size={20}
                color={
                  alert.type === "warning"
                    ? "#FF6B35"
                    : alert.type === "info"
                    ? "#2196F3"
                    : "#4CAF50"
                }
              />
              <Text style={styles.alertText}>{alert.message}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activityContainer}>
          {recentActivity.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityDriver}>{activity.driver}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
              <Text style={styles.activityAction}>{activity.action}</Text>
              <Text
                style={[
                  styles.activityAmount,
                  activity.amount !== "-" && styles.activityAmountPositive,
                ]}
              >
                {activity.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="add-circle" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>Add Car</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="person-add" size={24} color="#2196F3" />
            </View>
            <Text style={styles.actionText}>Add Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="document-text" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Generate Report</Text>
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
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666666",
  },
  statsContainer: {
    paddingHorizontal: 16,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statCardAccent: {
    backgroundColor: "#1A1A1A",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
    marginLeft: 8,
  },
  statTitleAccent: {
    color: "#FFFFFF",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  statValueAccent: {
    color: "#FFC107",
  },
  statChange: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  changePositive: {
    color: "#4CAF50",
  },
  changeNegative: {
    color: "#F44336",
  },
  changeLabel: {
    fontSize: 10,
    color: "#999999",
    marginLeft: 4,
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
  seeAll: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  alertsContainer: {
    gap: 12,
  },
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alertWarning: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B35",
  },
  alertInfo: {
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  alertSuccess: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: "#1A1A1A",
    marginLeft: 12,
  },
  activityContainer: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  activityDriver: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  activityTime: {
    fontSize: 12,
    color: "#666666",
  },
  activityAction: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#666666",
  },
  activityAmountPositive: {
    color: "#4CAF50",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    alignItems: "center",
    width: "30%",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
});

export default OwnerDashboardComponent;
