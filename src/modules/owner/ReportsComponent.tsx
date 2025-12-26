import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ReportsComponent = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const periods = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "quarter", label: "Quarter" },
    { id: "year", label: "Year" },
  ];

  const reports = [
    {
      id: 1,
      title: "Revenue Report",
      icon: "cash",
      value: "$45,280",
      change: "+18%",
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Expense Report",
      icon: "trending-down",
      value: "$12,450",
      change: "+5%",
      color: "#F44336",
    },
    {
      id: 3,
      title: "Fuel Consumption",
      icon: "water",
      value: "3,240 L",
      change: "-8%",
      color: "#2196F3",
    },
    {
      id: 4,
      title: "Driver Performance",
      icon: "stats-chart",
      value: "94%",
      change: "+3%",
      color: "#FF9800",
    },
  ];

  const topDrivers = [
    { id: 1, name: "John Doe", revenue: "$4,520", trips: 42, rating: 4.8 },
    { id: 2, name: "Jane Smith", revenue: "$3,980", trips: 38, rating: 4.9 },
    { id: 3, name: "Mike Johnson", revenue: "$3,750", trips: 35, rating: 4.7 },
    { id: 4, name: "Sarah Wilson", revenue: "$3,210", trips: 32, rating: 4.6 },
  ];

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
          <TouchableOpacity>
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
                      <Text style={styles.rating}>{driver.rating}</Text>
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
          <TouchableOpacity style={styles.reportButton}>
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
