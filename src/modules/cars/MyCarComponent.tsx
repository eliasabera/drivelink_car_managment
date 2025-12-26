import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const MyCarComponent = () => {
  const carDetails = {
    plateNumber: "DL-1234",
    model: "Toyota Camry",
    year: "2022",
    color: "Silver",
    fuelType: "Gasoline",
    fuelCapacity: "60 L",
    transmission: "Automatic",
    status: "active",
    assignedDate: "2023-06-15",
    lastService: "2023-11-20",
    nextService: "2024-01-20",
    mileage: "45,280 km",
  };

  const currentStats = [
    {
      id: 1,
      title: "Fuel Level",
      value: "65%",
      icon: "water",
      color: "#2196F3",
      progress: 65,
    },
    {
      id: 2,
      title: "Tire Pressure",
      value: "32 PSI",
      icon: "speedometer",
      color: "#4CAF50",
      status: "Normal",
    },
    {
      id: 3,
      title: "Engine Health",
      value: "Excellent",
      icon: "build",
      color: "#FF9800",
      status: "Good",
    },
    {
      id: 4,
      title: "Battery",
      value: "92%",
      icon: "battery-charging",
      color: "#FFC107",
      progress: 92,
    },
  ];

  const serviceHistory = [
    {
      id: 1,
      date: "2023-11-20",
      type: "Regular Maintenance",
      cost: "$120",
      mileage: "43,000 km",
    },
    {
      id: 2,
      date: "2023-09-15",
      type: "Oil Change",
      cost: "$65",
      mileage: "38,500 km",
    },
    {
      id: 3,
      date: "2023-07-10",
      type: "Tire Rotation",
      cost: "$40",
      mileage: "34,000 km",
    },
    {
      id: 4,
      date: "2023-05-05",
      type: "Brake Inspection",
      cost: "$85",
      mileage: "29,500 km",
    },
  ];

  const upcomingTasks = [
    { id: 1, task: "Next Service", due: "In 1,200 km", date: "2024-01-20" },
    { id: 2, task: "Oil Change", due: "In 3,000 km", date: "2024-02-15" },
    { id: 3, task: "Tire Replacement", due: "In 8,000 km", date: "2024-04-10" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Car Header */}
      <View style={styles.carHeader}>
        <View style={styles.carImagePlaceholder}>
          <Ionicons name="car-sport" size={60} color="#1A1A1A" />
        </View>
        <View style={styles.carTitle}>
          <Text style={styles.carModel}>{carDetails.model}</Text>
          <View style={styles.carPlate}>
            <Text style={styles.plateText}>{carDetails.plateNumber}</Text>
          </View>
          <Text style={styles.carYear}>
            {carDetails.year} • {carDetails.color}
          </Text>
        </View>
      </View>

      {/* Current Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        <View style={styles.statsContainer}>
          {currentStats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: `${stat.color}20` },
                ]}
              >
                <Ionicons
                  name={stat.icon as any}
                  size={20}
                  color={stat.color}
                />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statTitle}>{stat.title}</Text>
              {stat.progress && (
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${stat.progress}%`,
                        backgroundColor: stat.color,
                      },
                    ]}
                  />
                </View>
              )}
              {stat.status && (
                <Text style={[styles.statusText, { color: stat.color }]}>
                  {stat.status}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Car Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Car Details</Text>
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="color-palette" size={16} color="#666666" />
              <Text style={styles.detailLabel}>Color</Text>
              <Text style={styles.detailValue}>{carDetails.color}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="water" size={16} color="#666666" />
              <Text style={styles.detailLabel}>Fuel Type</Text>
              <Text style={styles.detailValue}>{carDetails.fuelType}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="flask" size={16} color="#666666" />
              <Text style={styles.detailLabel}>Fuel Capacity</Text>
              <Text style={styles.detailValue}>{carDetails.fuelCapacity}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="git-compare" size={16} color="#666666" />
              <Text style={styles.detailLabel}>Transmission</Text>
              <Text style={styles.detailValue}>{carDetails.transmission}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Ionicons name="speedometer" size={16} color="#666666" />
              <Text style={styles.detailLabel}>Mileage</Text>
              <Text style={styles.detailValue}>{carDetails.mileage}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="calendar" size={16} color="#666666" />
              <Text style={styles.detailLabel}>Assigned</Text>
              <Text style={styles.detailValue}>{carDetails.assignedDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Service History */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Service History</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historyContainer}>
          {serviceHistory.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Ionicons name="construct" size={20} color="#FF9800" />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceType}>{service.type}</Text>
                <Text style={styles.serviceDate}>{service.date}</Text>
                <Text style={styles.serviceMileage}>{service.mileage}</Text>
              </View>
              <Text style={styles.serviceCost}>{service.cost}</Text>
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
              <View style={styles.taskIcon}>
                <Ionicons name="calendar" size={20} color="#2196F3" />
              </View>
              <View style={styles.taskInfo}>
                <Text style={styles.taskTitle}>{task.task}</Text>
                <Text style={styles.taskDue}>{task.due}</Text>
              </View>
              <Text style={styles.taskDate}>{task.date}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#E8F5E9" }]}>
              <Ionicons name="document-text" size={24} color="#4CAF50" />
            </View>
            <Text style={styles.actionText}>Report Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#FFF3E0" }]}>
              <Ionicons name="construct" size={24} color="#FF9800" />
            </View>
            <Text style={styles.actionText}>Service Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="water" size={24} color="#2196F3" />
            </View>
            <Text style={styles.actionText}>Fuel Log</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: "#F3E5F5" }]}>
              <Ionicons name="help-circle" size={24} color="#9C27B0" />
            </View>
            <Text style={styles.actionText}>Help</Text>
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
  carHeader: {
    flexDirection: "row",
    padding: 24,
    paddingBottom: 16,
    alignItems: "center",
  },
  carImagePlaceholder: {
    width: 100,
    height: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  carTitle: {
    flex: 1,
  },
  carModel: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  carPlate: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  plateText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  carYear: {
    fontSize: 14,
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
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
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
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#F0F0F0",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  detailsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  historyContainer: {
    gap: 12,
  },
  serviceCard: {
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
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceType: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  serviceDate: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 2,
  },
  serviceMileage: {
    fontSize: 10,
    color: "#999999",
  },
  serviceCost: {
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
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
  taskDue: {
    fontSize: 12,
    color: "#666666",
  },
  taskDate: {
    fontSize: 12,
    color: "#999999",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
});

export default MyCarComponent;
