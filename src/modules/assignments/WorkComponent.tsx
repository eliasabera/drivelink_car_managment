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

const WorkComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ];

  const assignments = [
    {
      id: 1,
      car: "Toyota Camry (DL-1234)",
      driver: "John Doe",
      status: "active",
      startDate: "2023-12-01",
      endDate: "2024-01-31",
      trips: 42,
      revenue: "$4,520",
      color: "#4CAF50",
    },
    {
      id: 2,
      car: "Honda Accord (DL-5678)",
      driver: "Jane Smith",
      status: "active",
      startDate: "2023-11-15",
      endDate: "2024-02-15",
      trips: 38,
      revenue: "$3,980",
      color: "#2196F3",
    },
    {
      id: 3,
      car: "Ford Escape (DL-9101)",
      driver: "Mike Johnson",
      status: "pending",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      trips: 0,
      revenue: "$0",
      color: "#FF9800",
    },
    {
      id: 4,
      car: "Hyundai Sonata (DL-1121)",
      driver: "Sarah Wilson",
      status: "completed",
      startDate: "2023-09-01",
      endDate: "2023-11-30",
      trips: 35,
      revenue: "$3,750",
      color: "#9E9E9E",
    },
    {
      id: 5,
      car: "Chevrolet Malibu (DL-3141)",
      driver: "Robert Chen",
      status: "active",
      startDate: "2023-10-10",
      endDate: "2024-04-10",
      trips: 28,
      revenue: "$3,210",
      color: "#4CAF50",
    },
    {
      id: 6,
      car: "Nissan Altima (DL-5161)",
      driver: "Unassigned",
      status: "pending",
      startDate: "-",
      endDate: "-",
      trips: 0,
      revenue: "$0",
      color: "#FF9800",
    },
  ];

  const pendingActions = [
    {
      id: 1,
      type: "assignment",
      car: "Toyota Camry",
      driver: "New Driver",
      status: "pending",
    },
    {
      id: 2,
      type: "change",
      car: "Honda Accord",
      driver: "Driver Change",
      status: "review",
    },
    {
      id: 3,
      type: "unassignment",
      car: "Ford Escape",
      driver: "Mike Johnson",
      status: "pending",
    },
  ];

  const summary = {
    total: assignments.length,
    active: assignments.filter((a) => a.status === "active").length,
    pending: assignments.filter((a) => a.status === "pending").length,
    completed: assignments.filter((a) => a.status === "completed").length,
  };

  const filteredAssignments = assignments.filter((assignment) => {
    if (activeFilter === "all") return true;
    return assignment.status === activeFilter;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Work Assignments</Text>
        <Text style={styles.subtitle}>Manage car-driver assignments</Text>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.total}</Text>
          <Text style={styles.summaryLabel}>Total</Text>
        </View>
        <View style={[styles.summaryCard, { borderTopColor: "#4CAF50" }]}>
          <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
            {summary.active}
          </Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={[styles.summaryCard, { borderTopColor: "#FF9800" }]}>
          <Text style={[styles.summaryValue, { color: "#FF9800" }]}>
            {summary.pending}
          </Text>
          <Text style={styles.summaryLabel}>Pending</Text>
        </View>
        <View style={[styles.summaryCard, { borderTopColor: "#9E9E9E" }]}>
          <Text style={[styles.summaryValue, { color: "#9E9E9E" }]}>
            {summary.completed}
          </Text>
          <Text style={styles.summaryLabel}>Completed</Text>
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
            placeholder="Search assignments..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>New Assignment</Text>
        </TouchableOpacity>
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

      {/* Pending Actions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Actions</Text>
          <Text style={styles.badge}>{pendingActions.length}</Text>
        </View>
        <View style={styles.pendingContainer}>
          {pendingActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.pendingCard}>
              <View
                style={[
                  styles.pendingIcon,
                  action.type === "assignment" && styles.pendingIconAssign,
                  action.type === "change" && styles.pendingIconChange,
                  action.type === "unassignment" && styles.pendingIconUnassign,
                ]}
              >
                <Ionicons
                  name={
                    action.type === "assignment"
                      ? "person-add"
                      : action.type === "change"
                      ? "swap-horizontal"
                      : "person-remove"
                  }
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <View style={styles.pendingInfo}>
                <Text style={styles.pendingTitle}>
                  {action.type === "assignment"
                    ? "New Assignment"
                    : action.type === "change"
                    ? "Driver Change"
                    : "Unassignment"}
                </Text>
                <Text style={styles.pendingDetails}>
                  {action.car} • {action.driver}
                </Text>
                <Text
                  style={[
                    styles.pendingStatus,
                    action.status === "pending"
                      ? styles.statusPending
                      : styles.statusReview,
                  ]}
                >
                  {action.status === "pending"
                    ? "Pending Approval"
                    : "Under Review"}
                </Text>
              </View>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Review</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Assignments List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {activeFilter === "all"
              ? "All Assignments"
              : filters.find((f) => f.id === activeFilter)?.label}
            <Text style={styles.countText}>
              {" "}
              ({filteredAssignments.length})
            </Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.assignmentsContainer}>
          {filteredAssignments.map((assignment) => (
            <View key={assignment.id} style={styles.assignmentCard}>
              <View style={styles.assignmentHeader}>
                <View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: assignment.color },
                  ]}
                />
                <View style={styles.assignmentInfo}>
                  <Text style={styles.carModel}>{assignment.car}</Text>
                  <Text style={styles.driverName}>{assignment.driver}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    assignment.status === "active" && styles.statusBadgeActive,
                    assignment.status === "pending" &&
                      styles.statusBadgePending,
                    assignment.status === "completed" &&
                      styles.statusBadgeCompleted,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {assignment.status.charAt(0).toUpperCase() +
                      assignment.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.assignmentDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Start Date</Text>
                  <Text style={styles.detailValue}>{assignment.startDate}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>End Date</Text>
                  <Text style={styles.detailValue}>{assignment.endDate}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Trips</Text>
                  <Text style={styles.detailValue}>{assignment.trips}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Revenue</Text>
                  <Text style={styles.detailValue}>{assignment.revenue}</Text>
                </View>
              </View>

              <View style={styles.assignmentActions}>
                <TouchableOpacity style={styles.assigmentActionButton}>
                  <Ionicons name="eye" size={18} color="#666666" />
                  <Text style={styles.assigmentActionText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.assigmentActionButton}>
                  <Ionicons name="create" size={18} color="#666666" />
                  <Text style={styles.assigmentActionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.assigmentActionButton}>
                  <Ionicons name="swap-horizontal" size={18} color="#666666" />
                  <Text style={styles.assigmentActionText}>Reassign</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.assigmentActionButton, styles.endButton]}
                >
                  <Ionicons name="close-circle" size={18} color="#F44336" />
                  <Text
                    style={[styles.assigmentActionText, { color: "#F44336" }]}
                  >
                    End
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Assignment Stats</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="car-sport" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Cars Assigned</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="people" size={24} color="#2196F3" />
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Active Drivers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="trending-up" size={24} color="#FFC107" />
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>Utilization</Text>
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
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: "center",
    borderTopWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 20,
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
    marginBottom: 20,
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
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
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
  badge: {
    backgroundColor: "#F44336",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  seeAll: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  countText: {
    color: "#666666",
    fontWeight: "400",
  },
  pendingContainer: {
    gap: 12,
  },
  pendingCard: {
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
  pendingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  pendingIconAssign: {
    backgroundColor: "#4CAF50",
  },
  pendingIconChange: {
    backgroundColor: "#2196F3",
  },
  pendingIconUnassign: {
    backgroundColor: "#F44336",
  },
  pendingInfo: {
    flex: 1,
  },
  pendingTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  pendingDetails: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  pendingStatus: {
    fontSize: 10,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  statusPending: {
    backgroundColor: "#FFF3E0",
    color: "#FF9800",
  },
  statusReview: {
    backgroundColor: "#E3F2FD",
    color: "#2196F3",
  },
  actionButton: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  assignmentsContainer: {
    gap: 16,
  },
  assignmentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  assignmentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  statusIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  assignmentInfo: {
    flex: 1,
  },
  carModel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  driverName: {
    fontSize: 14,
    color: "#666666",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeActive: {
    backgroundColor: "#E8F5E9",
  },
  statusBadgePending: {
    backgroundColor: "#FFF3E0",
  },
  statusBadgeCompleted: {
    backgroundColor: "#F5F5F5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  assignmentDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 16,
  },
  detailItem: {
    width: "48%",
  },
  detailLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  assignmentActions: {
    flexDirection: "row",
    gap: 8,
  },
  assigmentActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    paddingVertical: 10,
    borderRadius: 8,
  },
  assigmentActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  endButton: {
    backgroundColor: "#FFEBEE",
  },
  statsContainer: {
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
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
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
  statDivider: {
    width: 1,
    backgroundColor: "#F0F0F0",
  },
});

export default WorkComponent;
