import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ManagerDashboardComponent = () => {
  // Mock data for manager dashboard
  const stats = [
    { id: 1, title: "Assigned Cars", value: "8", icon: "car", change: "+1" },
    {
      id: 2,
      title: "Active Drivers",
      value: "6",
      icon: "people",
      change: "+2",
    },
    {
      id: 3,
      title: "Today's Revenue",
      value: "$1,240",
      icon: "cash",
      change: "+18%",
    },
    {
      id: 4,
      title: "Pending Approvals",
      value: "3",
      icon: "time",
      change: "-1",
      accent: true,
    },
  ];

  const assignedDrivers = [
    {
      id: 1,
      name: "John Doe",
      status: "active",
      location: "Downtown",
      earnings: "$420",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "active",
      location: "Airport",
      earnings: "$380",
    },
    {
      id: 3,
      name: "Mike Johnson",
      status: "break",
      location: "Central Station",
      earnings: "$310",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      status: "offline",
      location: "Last seen 2h ago",
      earnings: "$280",
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      type: "expense",
      driver: "John Doe",
      amount: "$45",
      time: "10 min ago",
    },
    {
      id: 2,
      type: "revenue",
      driver: "Jane Smith",
      amount: "$28",
      time: "25 min ago",
    },
    {
      id: 3,
      type: "maintenance",
      driver: "Car #DL-456",
      amount: "$120",
      time: "1 hour ago",
    },
  ];

  const alerts = [
    { id: 1, message: "Fuel low in Car #DL-789", priority: "high" },
    {
      id: 2,
      message: "Monthly maintenance due for 2 cars",
      priority: "medium",
    },
    { id: 3, message: "Driver performance review scheduled", priority: "low" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, Manager</Text>
        <Text style={styles.date}>Your fleet overview</Text>
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
                color={stat.accent ? "#FFFFFF" : "#666666"}
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
              <Text
                style={[
                  styles.changeLabel,
                  stat.accent && styles.changeLabelAccent,
                ]}
              >
                {" "}
                from yesterday
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Assigned Drivers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Assigned Drivers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.driversContainer}>
          {assignedDrivers.map((driver) => (
            <View key={driver.id} style={styles.driverCard}>
              <View style={styles.driverInfo}>
                <View
                  style={[
                    styles.statusIndicator,
                    driver.status === "active" && styles.statusActive,
                    driver.status === "break" && styles.statusBreak,
                    driver.status === "offline" && styles.statusOffline,
                  ]}
                />
                <View>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <Text style={styles.driverLocation}>{driver.location}</Text>
                </View>
              </View>
              <View style={styles.driverEarnings}>
                <Text style={styles.earningsLabel}>Today</Text>
                <Text style={styles.earningsAmount}>{driver.earnings}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Pending Tasks */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Approvals</Text>
          <Text style={styles.badge}>3</Text>
        </View>
        <View style={styles.tasksContainer}>
          {pendingTasks.map((task) => (
            <TouchableOpacity key={task.id} style={styles.taskCard}>
              <View
                style={[
                  styles.taskIcon,
                  task.type === "expense" && styles.taskIconExpense,
                  task.type === "revenue" && styles.taskIconRevenue,
                  task.type === "maintenance" && styles.taskIconMaintenance,
                ]}
              >
                <Ionicons
                  name={
                    task.type === "expense"
                      ? "trending-down"
                      : task.type === "revenue"
                      ? "trending-up"
                      : "construct"
                  }
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskType}>
                  {task.type === "expense"
                    ? "Expense"
                    : task.type === "revenue"
                    ? "Revenue"
                    : "Maintenance"}
                </Text>
                <Text style={styles.taskDriver}>{task.driver}</Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
              <Text
                style={[
                  styles.taskAmount,
                  task.type === "expense"
                    ? styles.amountExpense
                    : task.type === "revenue"
                    ? styles.amountRevenue
                    : styles.amountNeutral,
                ]}
              >
                {task.amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Alerts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alerts & Notifications</Text>
        <View style={styles.alertsContainer}>
          {alerts.map((alert) => (
            <View
              key={alert.id}
              style={[
                styles.alertCard,
                alert.priority === "high" && styles.alertHigh,
                alert.priority === "medium" && styles.alertMedium,
                alert.priority === "low" && styles.alertLow,
              ]}
            >
              <Ionicons
                name="notifications"
                size={20}
                color={
                  alert.priority === "high"
                    ? "#F44336"
                    : alert.priority === "medium"
                    ? "#FF9800"
                    : "#4CAF50"
                }
              />
              <Text style={styles.alertText}>{alert.message}</Text>
              <TouchableOpacity style={styles.alertAction}>
                <Text style={styles.alertActionText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="location" size={24} color="#2196F3" />
            <Text style={styles.actionText}>Track</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble" size={24} color="#FF9800" />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#9C27B0" />
            <Text style={styles.actionText}>Report</Text>
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
  changeLabelAccent: {
    color: "#CCCCCC",
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
  badge: {
    backgroundColor: "#F44336",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  driversContainer: {
    gap: 12,
  },
  driverCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  statusActive: {
    backgroundColor: "#4CAF50",
  },
  statusBreak: {
    backgroundColor: "#FF9800",
  },
  statusOffline: {
    backgroundColor: "#9E9E9E",
  },
  driverName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  driverLocation: {
    fontSize: 12,
    color: "#666666",
  },
  driverEarnings: {
    alignItems: "flex-end",
  },
  earningsLabel: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  earningsAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  tasksContainer: {
    gap: 12,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  taskIconExpense: {
    backgroundColor: "#F44336",
  },
  taskIconRevenue: {
    backgroundColor: "#4CAF50",
  },
  taskIconMaintenance: {
    backgroundColor: "#FF9800",
  },
  taskInfo: {
    flex: 1,
  },
  taskType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  taskDriver: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 2,
  },
  taskTime: {
    fontSize: 10,
    color: "#999999",
  },
  taskAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  amountExpense: {
    color: "#F44336",
  },
  amountRevenue: {
    color: "#4CAF50",
  },
  amountNeutral: {
    color: "#1A1A1A",
  },
  alertsContainer: {
    gap: 12,
  },
  alertCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  alertHigh: {
    borderLeftWidth: 4,
    borderLeftColor: "#F44336",
  },
  alertMedium: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF9800",
  },
  alertLow: {
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: "#1A1A1A",
    marginLeft: 12,
    marginRight: 12,
  },
  alertAction: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  alertActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    alignItems: "center",
    width: "23%",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
  },
});

export default ManagerDashboardComponent;
