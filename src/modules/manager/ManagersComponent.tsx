import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const ManagersComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const managers = [
    {
      id: 1,
      name: "Michael Chen",
      email: "michael@drivelink.com",
      assignedCars: 8,
      drivers: 6,
      status: "active",
      performance: "94%",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@drivelink.com",
      assignedCars: 6,
      drivers: 5,
      status: "active",
      performance: "88%",
      joinDate: "2023-03-22",
    },
    {
      id: 3,
      name: "Robert Williams",
      email: "robert@drivelink.com",
      assignedCars: 10,
      drivers: 8,
      status: "active",
      performance: "91%",
      joinDate: "2022-11-05",
    },
    {
      id: 4,
      name: "Lisa Anderson",
      email: "lisa@drivelink.com",
      assignedCars: 4,
      drivers: 3,
      status: "inactive",
      performance: "85%",
      joinDate: "2023-06-18",
    },
  ];

  const summary = {
    total: 4,
    active: 3,
    carsManaged: 28,
    driversManaged: 22,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Manager Management</Text>
        <Text style={styles.subtitle}>
          Oversee and manage your team leaders
        </Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.total}</Text>
          <Text style={styles.summaryLabel}>Total Managers</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.active}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.carsManaged}</Text>
          <Text style={styles.summaryLabel}>Cars Managed</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.driversManaged}</Text>
          <Text style={styles.summaryLabel}>Drivers Managed</Text>
        </View>
      </View>

      {/* Search and Add */}
      <View style={styles.actionsRow}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#666666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search managers..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="person-add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Manager</Text>
        </TouchableOpacity>
      </View>

      {/* Manager List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Managers</Text>
        <View style={styles.managersContainer}>
          {managers.map((manager) => (
            <View key={manager.id} style={styles.managerCard}>
              <View style={styles.managerHeader}>
                <View style={styles.managerAvatar}>
                  <Text style={styles.managerInitial}>
                    {manager.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.managerInfo}>
                  <Text style={styles.managerName}>{manager.name}</Text>
                  <Text style={styles.managerEmail}>{manager.email}</Text>
                  <View style={styles.managerStatus}>
                    <View
                      style={[
                        styles.statusBadge,
                        manager.status === "active"
                          ? styles.statusActive
                          : styles.statusInactive,
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {manager.status === "active" ? "Active" : "Inactive"}
                      </Text>
                    </View>
                    <Text style={styles.joinDate}>
                      Joined {manager.joinDate}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.managerStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{manager.assignedCars}</Text>
                  <Text style={styles.statLabel}>Cars</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{manager.drivers}</Text>
                  <Text style={styles.statLabel}>Drivers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{manager.performance}</Text>
                  <Text style={styles.statLabel}>Performance</Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="mail" size={18} color="#666666" />
                  <Text style={styles.actionButtonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye" size={18} color="#666666" />
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="create" size={18} color="#666666" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <View style={styles.performanceContainer}>
          <View style={styles.performanceCard}>
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.performanceValue}>92%</Text>
            <Text style={styles.performanceLabel}>Avg. Performance</Text>
          </View>
          <View style={styles.performanceCard}>
            <Ionicons name="time" size={24} color="#2196F3" />
            <Text style={styles.performanceValue}>98%</Text>
            <Text style={styles.performanceLabel}>Task Completion</Text>
          </View>
          <View style={styles.performanceCard}>
            <Ionicons name="happy" size={24} color="#FFC107" />
            <Text style={styles.performanceValue}>4.7</Text>
            <Text style={styles.performanceLabel}>Avg. Rating</Text>
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
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
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
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  actionsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#1A1A1A",
  },
  addButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  managersContainer: {
    gap: 16,
  },
  managerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  managerHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  managerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  managerInitial: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  managerInfo: {
    flex: 1,
  },
  managerName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  managerEmail: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 8,
  },
  managerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: "#E8F5E9",
  },
  statusInactive: {
    backgroundColor: "#F5F5F5",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#666666",
  },
  joinDate: {
    fontSize: 10,
    color: "#999999",
  },
  managerStats: {
    flexDirection: "row",
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: "#666666",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  actionButtons: {
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
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  performanceContainer: {
    flexDirection: "row",
    gap: 12,
  },
  performanceCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 4,
  },
  performanceLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
});

export default ManagersComponent;
