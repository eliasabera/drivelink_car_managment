import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DriverDashboardComponent = () => {
  const [isOnline, setIsOnline] = useState(false);

  const todaysStats = [
    { id: 1, title: "Trips Today", value: "8", icon: "car", color: "#4CAF50" },
    { id: 2, title: "Earnings", value: "$240", icon: "cash", color: "#FFC107" },
    { id: 3, title: "Hours", value: "6.5", icon: "time", color: "#2196F3" },
    { id: 4, title: "Rating", value: "4.8", icon: "star", color: "#FF9800" },
  ];

  const recentTrips = [
    {
      id: 1,
      time: "09:30 AM",
      from: "Downtown",
      to: "Airport",
      fare: "$35",
      status: "completed",
    },
    {
      id: 2,
      time: "11:15 AM",
      from: "Airport",
      to: "Central Station",
      fare: "$28",
      status: "completed",
    },
    {
      id: 3,
      time: "01:45 PM",
      from: "Mall",
      to: "Business District",
      fare: "$22",
      status: "completed",
    },
    {
      id: 4,
      time: "03:20 PM",
      from: "University",
      to: "Residential Area",
      fare: "$18",
      status: "ongoing",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      type: "fuel",
      title: "Fuel Refill",
      car: "Toyota Camry DL-456",
      due: "Tomorrow",
    },
    {
      id: 2,
      type: "maintenance",
      title: "Monthly Check",
      car: "Toyota Camry DL-456",
      due: "In 3 days",
    },
    {
      id: 3,
      type: "document",
      title: "License Renewal",
      car: "Personal",
      due: "Next week",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Status */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning, John</Text>
          <Text style={styles.date}>Friday, December 15</Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusIndicator}>
            <View
              style={[
                styles.statusDot,
                isOnline ? styles.statusOnline : styles.statusOffline,
              ]}
            />
            <Text style={styles.statusText}>
              {isOnline ? "Online" : "Offline"}
            </Text>
          </View>
          <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Today's Stats */}
      <View style={styles.statsContainer}>
        {todaysStats.map((stat) => (
          <View key={stat.id} style={styles.statCard}>
            <View
              style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}
            >
              <Ionicons name={stat.icon as any} size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="add-circle" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>Start Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="receipt" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="cash" size={24} color="#2196F3" />
            </View>
            <Text style={styles.actionText}>Add Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#F3E5F5" }]}>
              <Ionicons name="help-circle" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.actionText}>Support</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Trips */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Trips</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tripsContainer}>
          {recentTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripTime}>
                <Text style={styles.tripTimeText}>{trip.time}</Text>
                <View
                  style={[
                    styles.tripStatus,
                    trip.status === "completed"
                      ? styles.tripCompleted
                      : styles.tripOngoing,
                  ]}
                >
                  <Text style={styles.tripStatusText}>
                    {trip.status === "completed" ? "Completed" : "Ongoing"}
                  </Text>
                </View>
              </View>
              <View style={styles.tripRoute}>
                <View style={styles.routePoint}>
                  <View style={styles.routeDot} />
                  <Text style={styles.routeText}>{trip.from}</Text>
                </View>
                <View style={styles.routeLine} />
                <View style={styles.routePoint}>
                  <View style={[styles.routeDot, styles.routeDotEnd]} />
                  <Text style={styles.routeText}>{trip.to}</Text>
                </View>
              </View>
              <View style={styles.tripFare}>
                <Text style={styles.fareLabel}>Fare</Text>
                <Text style={styles.fareAmount}>{trip.fare}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Upcoming Tasks */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        <View style={styles.tasksContainer}>
          {upcomingTasks.map((task) => (
            <TouchableOpacity key={task.id} style={styles.taskCard}>
              <View
                style={[
                  styles.taskIcon,
                  task.type === "fuel" && styles.taskIconFuel,
                  task.type === "maintenance" && styles.taskIconMaintenance,
                  task.type === "document" && styles.taskIconDocument,
                ]}
              >
                <Ionicons
                  name={
                    task.type === "fuel"
                      ? "water"
                      : task.type === "maintenance"
                      ? "construct"
                      : "document-text"
                  }
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskCar}>{task.car}</Text>
              </View>
              <View style={styles.taskDue}>
                <Text style={styles.dueLabel}>Due</Text>
                <Text style={styles.dueDate}>{task.due}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Performance Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week's Performance</Text>
        <View style={styles.performanceCard}>
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>42</Text>
            <Text style={styles.performanceLabel}>Total Trips</Text>
          </View>
          <View style={styles.performanceDivider} />
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>$1,240</Text>
            <Text style={styles.performanceLabel}>Total Earnings</Text>
          </View>
          <View style={styles.performanceDivider} />
          <View style={styles.performanceItem}>
            <Text style={styles.performanceValue}>38.5</Text>
            <Text style={styles.performanceLabel}>Hours Worked</Text>
          </View>
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
  greeting: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#666666",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusOnline: {
    backgroundColor: "#4CAF50",
  },
  statusOffline: {
    backgroundColor: "#9E9E9E",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: "#666666",
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
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionButton: {
    width: "23%",
    alignItems: "center",
    marginBottom: 12,
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
  tripsContainer: {
    gap: 12,
  },
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tripTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tripTimeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  tripStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tripCompleted: {
    backgroundColor: "#E8F5E9",
  },
  tripOngoing: {
    backgroundColor: "#FFF3E0",
  },
  tripStatusText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#666666",
  },
  tripRoute: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
    marginRight: 12,
  },
  routeDotEnd: {
    backgroundColor: "#F44336",
  },
  routeText: {
    fontSize: 14,
    color: "#666666",
  },
  routeLine: {
    height: 20,
    width: 1,
    backgroundColor: "#E0E0E0",
    marginLeft: 3,
    marginBottom: 4,
  },
  tripFare: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fareLabel: {
    fontSize: 12,
    color: "#666666",
  },
  fareAmount: {
    fontSize: 18,
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
  taskIconFuel: {
    backgroundColor: "#2196F3",
  },
  taskIconMaintenance: {
    backgroundColor: "#FF9800",
  },
  taskIconDocument: {
    backgroundColor: "#9C27B0",
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  taskCar: {
    fontSize: 12,
    color: "#666666",
  },
  taskDue: {
    alignItems: "flex-end",
  },
  dueLabel: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  dueDate: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  performanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  performanceItem: {
    alignItems: "center",
    flex: 1,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  performanceDivider: {
    width: 1,
    backgroundColor: "#F0F0F0",
  },
});

export default DriverDashboardComponent;
