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

const CarsComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Cars" },
    { id: "active", label: "Active" },
    { id: "maintenance", label: "Maintenance" },
    { id: "available", label: "Available" },
  ];

  const cars = [
    {
      id: 1,
      plateNumber: "DL-1234",
      model: "Toyota Camry",
      year: "2022",
      status: "active",
      driver: "John Doe",
      fuel: "65%",
      mileage: "45,280 km",
      nextService: "1,200 km",
      color: "#4CAF50",
    },
    {
      id: 2,
      plateNumber: "DL-5678",
      model: "Honda Accord",
      year: "2021",
      status: "active",
      driver: "Jane Smith",
      fuel: "42%",
      mileage: "52,150 km",
      nextService: "850 km",
      color: "#2196F3",
    },
    {
      id: 3,
      plateNumber: "DL-9101",
      model: "Ford Escape",
      year: "2023",
      status: "maintenance",
      driver: "Mike Johnson",
      fuel: "85%",
      mileage: "12,450 km",
      nextService: "3,500 km",
      color: "#FF9800",
    },
    {
      id: 4,
      plateNumber: "DL-1121",
      model: "Hyundai Sonata",
      year: "2020",
      status: "available",
      driver: "Unassigned",
      fuel: "28%",
      mileage: "68,920 km",
      nextService: "300 km",
      color: "#9E9E9E",
    },
    {
      id: 5,
      plateNumber: "DL-3141",
      model: "Chevrolet Malibu",
      year: "2022",
      status: "active",
      driver: "Sarah Wilson",
      fuel: "91%",
      mileage: "38,760 km",
      nextService: "1,800 km",
      color: "#4CAF50",
    },
    {
      id: 6,
      plateNumber: "DL-5161",
      model: "Nissan Altima",
      year: "2021",
      status: "maintenance",
      driver: "Unassigned",
      fuel: "55%",
      mileage: "49,330 km",
      nextService: "Next week",
      color: "#FF9800",
    },
  ];

  const summary = {
    total: cars.length,
    active: cars.filter((car) => car.status === "active").length,
    maintenance: cars.filter((car) => car.status === "maintenance").length,
    available: cars.filter((car) => car.status === "available").length,
  };

  const filteredCars = cars.filter((car) => {
    if (activeFilter === "all") return true;
    return car.status === activeFilter;
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Fleet Management</Text>
        <Text style={styles.subtitle}>Manage your vehicle fleet</Text>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.total}</Text>
          <Text style={styles.summaryLabel}>Total Cars</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
            {summary.active}
          </Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: "#FF9800" }]}>
            {summary.maintenance}
          </Text>
          <Text style={styles.summaryLabel}>Maintenance</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: "#2196F3" }]}>
            {summary.available}
          </Text>
          <Text style={styles.summaryLabel}>Available</Text>
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
            placeholder="Search cars..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Car</Text>
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

      {/* Cars List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {activeFilter === "all"
            ? "All Vehicles"
            : filters.find((f) => f.id === activeFilter)?.label}
          <Text style={styles.carCount}> ({filteredCars.length})</Text>
        </Text>
        <View style={styles.carsContainer}>
          {filteredCars.map((car) => (
            <View key={car.id} style={styles.carCard}>
              <View style={styles.carHeader}>
                <View style={styles.carPlate}>
                  <Text style={styles.plateText}>{car.plateNumber}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    car.status === "active" && styles.statusActive,
                    car.status === "maintenance" && styles.statusMaintenance,
                    car.status === "available" && styles.statusAvailable,
                  ]}
                >
                  <Text style={styles.statusText}>
                    {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.carInfo}>
                <Text style={styles.carModel}>{car.model}</Text>
                <Text style={styles.carYear}>{car.year}</Text>
              </View>

              <View style={styles.carDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="person" size={16} color="#666666" />
                  <Text style={styles.detailText}>{car.driver}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="speedometer" size={16} color="#666666" />
                  <Text style={styles.detailText}>{car.mileage}</Text>
                </View>
              </View>

              <View style={styles.carStatus}>
                <View style={styles.fuelContainer}>
                  <View style={styles.fuelBar}>
                    <View style={[styles.fuelLevel, { width: car.fuel }]} />
                  </View>
                  <Text style={styles.fuelText}>{car.fuel}</Text>
                </View>
                <View style={styles.serviceContainer}>
                  <Ionicons name="construct" size={16} color="#666666" />
                  <Text style={styles.serviceText}>{car.nextService}</Text>
                </View>
              </View>

              <View style={styles.carActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="eye" size={18} color="#666666" />
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="create" size={18} color="#666666" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="document-text" size={18} color="#666666" />
                  <Text style={styles.actionButtonText}>Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fleet Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="car-sport" size={24} color="#4CAF50" />
            <Text style={styles.statValue}>6</Text>
            <Text style={styles.statLabel}>Total Vehicles</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Ionicons name="speedometer" size={24} color="#2196F3" />
            <Text style={styles.statValue}>44,315 km</Text>
            <Text style={styles.statLabel}>Avg. Mileage</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  carCount: {
    color: "#666666",
    fontWeight: "400",
  },
  carsContainer: {
    gap: 16,
  },
  carCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  carHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  carPlate: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  plateText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: "#E8F5E9",
  },
  statusMaintenance: {
    backgroundColor: "#FFF3E0",
  },
  statusAvailable: {
    backgroundColor: "#E3F2FD",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  carInfo: {
    marginBottom: 12,
  },
  carModel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  carYear: {
    fontSize: 14,
    color: "#666666",
  },
  carDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#666666",
  },
  carStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  fuelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  fuelBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  fuelLevel: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 3,
  },
  fuelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
    minWidth: 30,
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  serviceText: {
    fontSize: 12,
    color: "#666666",
  },
  carActions: {
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

export default CarsComponent;
