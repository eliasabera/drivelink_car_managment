import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthStore } from "../../shared/store/auth-store";
import { useUserStore } from "../../shared/store/user-store";
import { useCarStore } from "../../shared/store/car-store";
import { useRevenueStore } from "../../shared/store/revenue-store";
import { useExpenseStore } from "../../shared/store/expense-store";

const OwnerDashboardComponent = () => {
  const router = useRouter();
  const { profile } = useAuthStore();
  const {
    getDrivers,
    getManagers,
    drivers,
    managers,
    isLoading: usersLoading,
  } = useUserStore();
  const { getCarsByOwner, ownerCars, isLoading: carsLoading } = useCarStore();
  const {
    getRecentRevenue,
    recentRevenues,
    getRevenueByDateRange,
    isLoading: revenueLoading,
  } = useRevenueStore();
  const {
    getRecentExpenses,
    recentExpenses,
    isLoading: expenseLoading,
  } = useExpenseStore();

  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalCars: 0,
    activeDrivers: 0,
    managers: 0,
    revenueToday: 0,
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  const isLoading =
    usersLoading || carsLoading || revenueLoading || expenseLoading;

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    if (!profile?.id) return;

    try {
      // Load all necessary data in parallel
      await Promise.all([
        getDrivers(),
        getManagers(),
        getCarsByOwner(profile.id),
        getRecentRevenue(5),
        getRecentExpenses(5),
      ]);

      // Calculate stats
      const activeDrivers = drivers.filter((driver) => {
        // Check if driver is assigned to any car
        // You might need to implement a method to check assigned status
        return true; // Placeholder - implement based on your logic
      }).length;

      // Calculate today's revenue
      const today = new Date().toISOString().split("T")[0];
      const todayRevenues = await getRevenueByDateRange(today, today);
      const revenueToday = todayRevenues.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      setStats({
        totalCars: ownerCars.length,
        activeDrivers,
        managers: managers.length,
        revenueToday,
      });

      // Generate alerts based on car status
      generateAlerts();

      // Combine recent revenue and expenses for activity feed
      combineRecentActivity();
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const generateAlerts = () => {
    const newAlerts = [];

    // Check for cars needing maintenance
    const maintenanceCars = ownerCars.filter(
      (car) => car.status === "maintenance"
    );
    if (maintenanceCars.length > 0) {
      newAlerts.push({
        id: 1,
        type: "warning",
        message: `${maintenanceCars.length} car${
          maintenanceCars.length > 1 ? "s" : ""
        } need${maintenanceCars.length > 1 ? "" : "s"} maintenance`,
      });
    }

    // Check for inactive cars
    const inactiveCars = ownerCars.filter((car) => car.status === "inactive");
    if (inactiveCars.length > 0) {
      newAlerts.push({
        id: 2,
        type: "info",
        message: `${inactiveCars.length} car${
          inactiveCars.length > 1 ? "s" : ""
        } ${inactiveCars.length > 1 ? "are" : "is"} inactive`,
      });
    }

    // Check for available cars
    const availableCars = ownerCars.filter((car) => car.status === "available");
    if (availableCars.length > 0) {
      newAlerts.push({
        id: 3,
        type: "success",
        message: `${availableCars.length} car${
          availableCars.length > 1 ? "s" : ""
        } available for assignment`,
      });
    }

    setAlerts(newAlerts);
  };

  const combineRecentActivity = () => {
    const activity = [];

    // Add recent revenues
    recentRevenues.forEach((revenue, index) => {
      activity.push({
        id: `revenue-${index}`,
        type: "revenue",
        driver: "Driver", // You would fetch driver name here
        action: `${
          revenue.source.charAt(0).toUpperCase() + revenue.source.slice(1)
        } revenue`,
        time: formatTimeAgo(revenue.created_at),
        amount: `ETB ${revenue.amount.toLocaleString("en-ET", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      });
    });

    // Add recent expenses
    recentExpenses.forEach((expense, index) => {
      activity.push({
        id: `expense-${index}`,
        type: "expense",
        driver: "Driver", // You would fetch driver name here
        action: `${expense.category} expense`,
        time: formatTimeAgo(expense.created_at),
        amount: `ETB ${expense.amount.toLocaleString("en-ET", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      });
    });

    // Sort by time (newest first) and take first 4
    const sortedActivity = activity
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 4);

    setRecentActivity(sortedActivity);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboardData();
  };

  const handleAddCar = () => {
    router.push("/(owner)/cars");
  };

  const handleAddManager = () => {
    router.push("/(owner)/managers");
  };

  const handleReports = () => {
    router.push("/(owner)/reports");
  };

  const formatCurrency = (amount: number) => {
    return `ETB ${amount.toLocaleString("en-ET", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A1A1A" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back, {profile?.full_name || "Owner"}
        </Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {/* Total Cars */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="car" size={20} color="#666666" />
            <Text style={styles.statTitle}>Total Cars</Text>
          </View>
          <Text style={styles.statValue}>{stats.totalCars}</Text>
          <View style={styles.statChange}>
            <Text style={[styles.changeText, styles.changeNeutral]}>
              {stats.totalCars > 0 ? "Active" : "No cars"}
            </Text>
          </View>
        </View>

        {/* Active Drivers */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="people" size={20} color="#666666" />
            <Text style={styles.statTitle}>Active Drivers</Text>
          </View>
          <Text style={styles.statValue}>{stats.activeDrivers}</Text>
          <View style={styles.statChange}>
            <Text style={[styles.changeText, styles.changeNeutral]}>
              {stats.activeDrivers > 0 ? "Assigned" : "No drivers"}
            </Text>
          </View>
        </View>

        {/* Managers */}
        <View style={styles.statCard}>
          <View style={styles.statHeader}>
            <Ionicons name="briefcase" size={20} color="#666666" />
            <Text style={styles.statTitle}>Managers</Text>
          </View>
          <Text style={styles.statValue}>{stats.managers}</Text>
          <View style={styles.statChange}>
            <Text style={[styles.changeText, styles.changeNeutral]}>
              {stats.managers > 0 ? "Active" : "No managers"}
            </Text>
          </View>
        </View>

        {/* Revenue Today */}
        <View style={[styles.statCard, styles.statCardAccent]}>
          <View style={styles.statHeader}>
            <Ionicons name="cash" size={20} color="#FFC107" />
            <Text style={[styles.statTitle, styles.statTitleAccent]}>
              Revenue Today
            </Text>
          </View>
          <Text style={[styles.statValue, styles.statValueAccent]}>
            {formatCurrency(stats.revenueToday)}
          </Text>
          <View style={styles.statChange}>
            <Text style={[styles.changeText, styles.changeNeutral]}>
              Today's total
            </Text>
          </View>
        </View>
      </View>

      {/* Alerts Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>System Alerts</Text>
        </View>
        <View style={styles.alertsContainer}>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
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
            ))
          ) : (
            <View style={[styles.alertCard, styles.alertSuccess]}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.alertText}>All systems normal</Text>
            </View>
          )}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        <View style={styles.activityContainer}>
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityDriver}>{activity.driver}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Text style={styles.activityAction}>{activity.action}</Text>
                <Text
                  style={[styles.activityAmount, styles.activityAmountPositive]}
                >
                  {activity.amount}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="time" size={40} color="#E0E0E0" />
              <Text style={styles.emptyStateText}>No recent activity</Text>
            </View>
          )}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleAddCar}>
            <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="add-circle" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>Add Car</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleAddManager}
          >
            <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="person-add" size={24} color="#2196F3" />
            </View>
            <Text style={styles.actionText}>Add Manager</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleReports}>
            <View style={[styles.actionIcon, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="document-text" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Reports</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
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
  changeNeutral: {
    color: "#666666",
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
  emptyState: {
    alignItems: "center",
    padding: 40,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 14,
    color: "#999999",
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
