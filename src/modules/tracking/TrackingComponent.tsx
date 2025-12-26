import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker, Polyline } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const TrackingComponent = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLive, setIsLive] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(1);
  const [loading, setLoading] = useState(false);

  const filters = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "idle", label: "Idle" },
    { id: "offline", label: "Offline" },
  ];

  const drivers = [
    {
      id: 1,
      name: "John Doe",
      status: "active",
      location: "Downtown",
      speed: "45 km/h",
      battery: "85%",
      lastUpdate: "2 min ago",
      coordinate: { latitude: 37.78825, longitude: -122.4324 },
      destination: "Airport",
      eta: "15 min",
      color: "#4CAF50",
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "active",
      location: "Airport Zone",
      speed: "0 km/h",
      battery: "72%",
      lastUpdate: "5 min ago",
      coordinate: { latitude: 37.75825, longitude: -122.4424 },
      destination: "Business District",
      eta: "25 min",
      color: "#2196F3",
    },
    {
      id: 3,
      name: "Mike Johnson",
      status: "idle",
      location: "Central Station",
      speed: "0 km/h",
      battery: "68%",
      lastUpdate: "10 min ago",
      coordinate: { latitude: 37.79825, longitude: -122.4224 },
      destination: "Waiting",
      eta: "-",
      color: "#FF9800",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      status: "offline",
      location: "Last seen: Residential Area",
      speed: "-",
      battery: "42%",
      lastUpdate: "45 min ago",
      coordinate: { latitude: 37.76825, longitude: -122.4524 },
      destination: "Offline",
      eta: "-",
      color: "#9E9E9E",
    },
    {
      id: 5,
      name: "Robert Chen",
      status: "active",
      location: "Business District",
      speed: "32 km/h",
      battery: "91%",
      lastUpdate: "1 min ago",
      coordinate: { latitude: 37.77825, longitude: -122.4124 },
      destination: "Mall",
      eta: "8 min",
      color: "#4CAF50",
    },
  ];

  const routeCoordinates = [
    { latitude: 37.78825, longitude: -122.4324 },
    { latitude: 37.77825, longitude: -122.4224 },
    { latitude: 37.76825, longitude: -122.4124 },
    { latitude: 37.75825, longitude: -122.4024 },
  ];

  const filteredDrivers = drivers.filter((driver) => {
    if (activeFilter === "all") return true;
    return driver.status === activeFilter;
  });

  const selectedDriverData = drivers.find((d) => d.id === selectedDriver);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {drivers.map((driver) => (
            <Marker
              key={driver.id}
              coordinate={driver.coordinate}
              onPress={() => setSelectedDriver(driver.id)}
            >
              <View
                style={[
                  styles.markerContainer,
                  selectedDriver === driver.id && styles.markerSelected,
                ]}
              >
                <View
                  style={[styles.marker, { backgroundColor: driver.color }]}
                >
                  <Ionicons name="car" size={16} color="#FFFFFF" />
                </View>
                {selectedDriver === driver.id && (
                  <View style={styles.markerLabel}>
                    <Text style={styles.markerLabelText}>{driver.name}</Text>
                  </View>
                )}
              </View>
            </Marker>
          ))}

          {selectedDriverData && selectedDriverData.status === "active" && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#2196F3"
              strokeWidth={3}
              lineDashPattern={[5, 5]}
            />
          )}
        </MapView>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity
            style={[styles.mapButton, isLive && styles.mapButtonActive]}
            onPress={() => setIsLive(!isLive)}
          >
            <Ionicons
              name="radio-button-on"
              size={20}
              color={isLive ? "#4CAF50" : "#666666"}
            />
            <Text
              style={[
                styles.mapButtonText,
                isLive && styles.mapButtonTextActive,
              ]}
            >
              Live
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={20} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="locate" size={20} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="layers" size={20} color="#666666" />
          </TouchableOpacity>
        </View>

        {/* Selected Driver Info */}
        {selectedDriverData && (
          <View style={styles.driverInfoCard}>
            <View style={styles.driverInfoHeader}>
              <View style={styles.driverInfo}>
                <View
                  style={[
                    styles.statusIndicator,
                    { backgroundColor: selectedDriverData.color },
                  ]}
                />
                <View>
                  <Text style={styles.driverName}>
                    {selectedDriverData.name}
                  </Text>
                  <Text style={styles.driverLocation}>
                    {selectedDriverData.location}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  selectedDriverData.status === "active" &&
                    styles.statusBadgeActive,
                  selectedDriverData.status === "idle" &&
                    styles.statusBadgeIdle,
                  selectedDriverData.status === "offline" &&
                    styles.statusBadgeOffline,
                ]}
              >
                <Text style={styles.statusText}>
                  {selectedDriverData.status.charAt(0).toUpperCase() +
                    selectedDriverData.status.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.driverStats}>
              <View style={styles.statItem}>
                <Ionicons name="speedometer" size={16} color="#666666" />
                <Text style={styles.statValue}>{selectedDriverData.speed}</Text>
                <Text style={styles.statLabel}>Speed</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="battery-charging" size={16} color="#666666" />
                <Text style={styles.statValue}>
                  {selectedDriverData.battery}
                </Text>
                <Text style={styles.statLabel}>Battery</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="time" size={16} color="#666666" />
                <Text style={styles.statValue}>
                  {selectedDriverData.lastUpdate}
                </Text>
                <Text style={styles.statLabel}>Last Update</Text>
              </View>
            </View>
            <View style={styles.driverDestination}>
              <Ionicons name="navigate" size={16} color="#2196F3" />
              <Text style={styles.destinationText}>
                To: {selectedDriverData.destination}
                {selectedDriverData.eta !== "-" &&
                  ` • ETA: ${selectedDriverData.eta}`}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Driver List */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            Drivers ({filteredDrivers.length})
          </Text>
          {loading && <ActivityIndicator size="small" color="#1A1A1A" />}
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

        {/* Drivers List */}
        <View style={styles.driversList}>
          {filteredDrivers.map((driver) => (
            <TouchableOpacity
              key={driver.id}
              style={[
                styles.driverCard,
                selectedDriver === driver.id && styles.driverCardSelected,
              ]}
              onPress={() => setSelectedDriver(driver.id)}
            >
              <View style={styles.driverCardHeader}>
                <View style={styles.driverAvatar}>
                  <Text style={styles.driverInitial}>
                    {driver.name.charAt(0)}
                  </Text>
                </View>
                <View style={styles.driverCardInfo}>
                  <Text style={styles.driverCardName}>{driver.name}</Text>
                  <Text style={styles.driverCardLocation}>
                    {driver.location}
                  </Text>
                </View>
                <View
                  style={[
                    styles.driverStatus,
                    driver.status === "active" && styles.driverStatusActive,
                    driver.status === "idle" && styles.driverStatusIdle,
                    driver.status === "offline" && styles.driverStatusOffline,
                  ]}
                >
                  <Text style={styles.driverStatusText}>
                    {driver.status === "active"
                      ? "Active"
                      : driver.status === "idle"
                      ? "Idle"
                      : "Offline"}
                  </Text>
                </View>
              </View>
              <View style={styles.driverCardDetails}>
                <View style={styles.driverDetail}>
                  <Ionicons name="speedometer" size={14} color="#666666" />
                  <Text style={styles.driverDetailText}>{driver.speed}</Text>
                </View>
                <View style={styles.driverDetail}>
                  <Ionicons name="battery-charging" size={14} color="#666666" />
                  <Text style={styles.driverDetailText}>{driver.battery}</Text>
                </View>
                <View style={styles.driverDetail}>
                  <Ionicons name="time" size={14} color="#666666" />
                  <Text style={styles.driverDetailText}>
                    {driver.lastUpdate}
                  </Text>
                </View>
              </View>
              <View style={styles.driverCardActions}>
                <TouchableOpacity style={styles.driverActionButton}>
                  <Ionicons name="call" size={16} color="#2196F3" />
                  <Text style={styles.driverActionText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.driverActionButton}>
                  <Ionicons name="chatbubble" size={16} color="#4CAF50" />
                  <Text style={styles.driverActionText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.driverActionButton}>
                  <Ionicons name="navigate" size={16} color="#FF9800" />
                  <Text style={styles.driverActionText}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Fleet Overview</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="car-sport" size={24} color="#4CAF50" />
              <Text style={styles.statCardValue}>5</Text>
              <Text style={styles.statCardLabel}>Total Drivers</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="radio-button-on" size={24} color="#2196F3" />
              <Text style={styles.statCardValue}>3</Text>
              <Text style={styles.statCardLabel}>Active Now</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="speedometer" size={24} color="#FFC107" />
              <Text style={styles.statCardValue}>68%</Text>
              <Text style={styles.statCardLabel}>Avg. Speed</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>Quick Actions</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="refresh-circle" size={24} color="#2196F3" />
              <Text style={styles.actionText}>Refresh All</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="notifications" size={24} color="#FF9800" />
              <Text style={styles.actionText}>Alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="download" size={24} color="#4CAF50" />
              <Text style={styles.actionText}>Export</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings" size={24} color="#666666" />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  mapContainer: {
    height: height * 0.5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapControls: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  mapButtonActive: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  mapButtonText: {
    fontSize: 10,
    color: "#666666",
    marginTop: 2,
  },
  mapButtonTextActive: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  driverInfoCard: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  driverInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  driverLocation: {
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
  statusBadgeIdle: {
    backgroundColor: "#FFF3E0",
  },
  statusBadgeOffline: {
    backgroundColor: "#F5F5F5",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  driverStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: "#666666",
  },
  driverDestination: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    padding: 12,
    borderRadius: 8,
  },
  destinationText: {
    fontSize: 14,
    color: "#1A1A1A",
    marginLeft: 8,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  filtersContainer: {
    marginBottom: 16,
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
  driversList: {
    gap: 12,
    marginBottom: 24,
  },
  driverCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  driverCardSelected: {
    borderWidth: 2,
    borderColor: "#1A1A1A",
  },
  driverCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
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
  driverCardInfo: {
    flex: 1,
  },
  driverCardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  driverCardLocation: {
    fontSize: 14,
    color: "#666666",
  },
  driverStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  driverStatusActive: {
    backgroundColor: "#E8F5E9",
  },
  driverStatusIdle: {
    backgroundColor: "#FFF3E0",
  },
  driverStatusOffline: {
    backgroundColor: "#F5F5F5",
  },
  driverStatusText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  driverCardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  driverDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  driverDetailText: {
    fontSize: 12,
    color: "#666666",
  },
  driverCardActions: {
    flexDirection: "row",
    gap: 8,
  },
  driverActionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    borderRadius: 8,
  },
  driverActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  statsSection: {
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    textAlign: "center",
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  markerSelected: {
    zIndex: 1,
  },
  markerLabel: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markerLabelText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});

export default TrackingComponent;
