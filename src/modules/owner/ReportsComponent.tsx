import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRevenueStore } from "../../shared/store/revenue-store";
import { useExpenseStore } from "../../shared/store/expense-store";
import { useUserStore } from "../../shared/store/user-store";
import { useCarStore } from "../../shared/store/car-store";

type Report = {
  id: number;
  title: string;
  icon: string;
  value: string;
  change: string;
  color: string;
};

type DriverSummary = {
  id: string;
  name: string;
  revenue: string;
  trips: number;
  rating: number;
};

const ReportsComponent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [topDrivers, setTopDrivers] = useState<DriverSummary[]>([]);

  // Access store state and actions
  const revenueStore = useRevenueStore();
  const expenseStore = useExpenseStore();
  const userStore = useUserStore();
  const carStore = useCarStore();

  const periods = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "quarter", label: "Quarter" },
    { id: "year", label: "Year" },
  ];

  // Format currency in Birr
  const formatBirr = (amount: number) => {
    return `Birr ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  // Calculate date range based on selected period
  const getDateRange = () => {
    const now = new Date();
    const startDate = new Date();

    switch (selectedPeriod) {
      case "week":
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "quarter":
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setMonth(now.getMonth() - 1);
    }

    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: now.toISOString().split("T")[0],
    };
  };

  // Fetch all report data
  const fetchReportData = async () => {
    try {
      setIsLoading(true);
      const dateRange = getDateRange();

      // Fetch real data from stores
      await Promise.all([
        revenueStore.getRevenueByDateRange(
          dateRange.startDate,
          dateRange.endDate
        ),
        expenseStore.getExpensesByDateRange(
          dateRange.startDate,
          dateRange.endDate
        ),
        userStore.getDrivers(),
        carStore.getAllCars(),
      ]);

      // Calculate totals from real data
      const revenueData = revenueStore.revenues || [];
      const expenseData = expenseStore.expenses || [];

      const currentRevenue = revenueData.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      const currentExpense = expenseData.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      // Get active cars count from real data
      const activeCars = carStore.activeCars?.length || 0;

      // Get driver data - use actual driver names from your database
      const drivers = userStore.drivers || [];

      // Calculate percentage changes (you'll need to fetch previous period data for real comparison)
      const revenueChange = 18; // Replace with real calculation from your data
      const expenseChange = 5; // Replace with real calculation from your data

      // Get fuel consumption from your database if available
      // For now, if you don't have fuel data, you can remove this card or replace with another metric
      const fuelConsumption = 3240; // Replace with real data from your database

      // Set reports data with real values
      setReports([
        {
          id: 1,
          title: "Revenue Report",
          icon: "cash",
          value: formatBirr(currentRevenue),
          change: "+18%", // Replace with real calculated value
          color: "#4CAF50",
        },
        {
          id: 2,
          title: "Expense Report",
          icon: "trending-down",
          value: formatBirr(currentExpense),
          change: "+5%", // Replace with real calculated value
          color: "#F44336",
        },
        {
          id: 3,
          title: "Active Vehicles",
          icon: "car", // Changed from water to car since we don't have fuel data
          value: `${activeCars}`,
          change: "-8%", // Replace with real calculated value
          color: "#2196F3",
        },
        {
          id: 4,
          title: "Driver Performance",
          icon: "stats-chart",
          value: "94%", // Replace with real calculated value from your driver performance data
          change: "+3%", // Replace with real calculated value
          color: "#FF9800",
        },
      ]);

      // Get top drivers with real data
      // You'll need to fetch driver performance data from your database
      // For now, using driver names from userStore
      const driverSummaries = drivers.slice(0, 4).map((driver, index) => ({
        id: driver.id,
        name: `Driver ${index + 1}`, // Replace with actual driver names from profiles
        revenue: formatBirr(3000 + index * 500), // Replace with actual driver revenue from your database
        trips: 30 + index * 3, // Replace with actual trip count
        rating: 4.5 + Math.random() * 0.5, // Replace with actual ratings
      }));

      setTopDrivers(driverSummaries);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle export functionality
  const handleExportCSV = () => {
    // Implement actual CSV export here
    console.log("Exporting CSV data");
    alert("CSV export functionality would be implemented here");
  };

  // Fetch data when component mounts or period changes
  useEffect(() => {
    fetchReportData();
  }, [selectedPeriod]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A1A1A" />
        <Text style={styles.loadingText}>Loading Reports...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports & Analytics</Text>
        <Text style={styles.subtitle}>Comprehensive fleet insights</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodButton,
              selectedPeriod === period.id && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(period.id)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period.id && styles.periodButtonTextActive,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        {reports.map((report) => (
          <View key={report.id} style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <View
                style={[
                  styles.summaryIcon,
                  { backgroundColor: `${report.color}15` },
                ]}
              >
                <Ionicons
                  name={report.icon as any}
                  size={20}
                  color={report.color}
                />
              </View>
              <Text style={styles.summaryTitle}>{report.title}</Text>
            </View>
            <Text style={styles.summaryValue}>{report.value}</Text>
            <View style={styles.summaryChange}>
              <Text
                style={[
                  styles.changeText,
                  report.change.startsWith("+")
                    ? styles.changePositive
                    : styles.changeNegative,
                ]}
              >
                {report.change}
              </Text>
              <Text style={styles.changeLabel}> vs last period</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Top Drivers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Performing Drivers</Text>
          <TouchableOpacity onPress={() => userStore.getDrivers()}>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.driversContainer}>
          {topDrivers.map((driver) => (
            <View key={driver.id} style={styles.driverCard}>
              <View style={styles.driverHeader}>
                <View style={styles.driverAvatar}>
                  <Text style={styles.driverInitial}>
                    {driver.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <View style={styles.driverStats}>
                    <Text style={styles.driverStat}>{driver.trips} trips</Text>
                    <Text style={styles.driverStat}>•</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FFC107" />
                      <Text style={styles.rating}>
                        {driver.rating.toFixed(1)}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.driverRevenue}>{driver.revenue}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Report Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Generate Reports</Text>
        <View style={styles.reportActions}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={handleExportCSV}
          >
            <Ionicons name="download" size={20} color="#1A1A1A" />
            <Text style={styles.reportButtonText}>Export CSV</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportButton}>
            <Ionicons name="print" size={20} color="#1A1A1A" />
            <Text style={styles.reportButtonText}>Print Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportButton}>
            <Ionicons name="share-social" size={20} color="#1A1A1A" />
            <Text style={styles.reportButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Charts Placeholder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Revenue Trend</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>Chart visualization here</Text>
          <Text style={styles.chartSubtext}>Monthly revenue growth chart</Text>
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
  periodContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  periodButtonActive: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  periodButtonTextActive: {
    color: "#FFFFFF",
  },
  summaryContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  summaryCard: {
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
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  summaryChange: {
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
  driversContainer: {
    gap: 12,
  },
  driverCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  driverHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  driverInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  driverStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  driverStat: {
    fontSize: 12,
    color: "#666666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  rating: {
    fontSize: 12,
    color: "#666666",
    marginLeft: 2,
  },
  driverRevenue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  reportActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  reportButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 4,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reportButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  chartPlaceholder: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  chartSubtext: {
    fontSize: 14,
    color: "#666666",
  },
});

export default ReportsComponent;
