import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCarStore } from "../../shared/store/car-store";
import { useAuthStore } from "../../shared/store/auth-store";
import { RevenueService } from "../../shared/services/revenue-service";
import { ExpenseService } from "../../shared/services/expense-service";

// Move CarForm to a separate component to prevent re-renders
const CarForm = ({
  visible,
  isEdit,
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  visible: boolean;
  isEdit: boolean;
  initialData: any;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (visible) {
      setFormData(initialData);
    }
  }, [visible, initialData]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.modalContent}
            >
              <Text style={styles.modalTitle}>
                {isEdit ? "Edit Car" : "Add New Car"}
              </Text>

              <ScrollView
                style={styles.formContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Plate Number *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., AA-1234"
                    value={formData.plate_no}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, plate_no: text }))
                    }
                    editable={!isSubmitting}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Car Libre/VIN *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Vehicle identification number"
                    value={formData.car_libre}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, car_libre: text }))
                    }
                    editable={!isSubmitting}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Model</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Toyota Camry"
                    value={formData.model}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, model: text }))
                    }
                    editable={!isSubmitting}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inputRow}>
                  <View
                    style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}
                  >
                    <Text style={styles.inputLabel}>Year</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., 2023"
                      keyboardType="numeric"
                      value={formData.year}
                      onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, year: text }))
                      }
                      editable={!isSubmitting}
                      returnKeyType="next"
                    />
                  </View>

                  <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                    <Text style={styles.inputLabel}>Color</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., Red"
                      value={formData.color}
                      onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, color: text }))
                      }
                      editable={!isSubmitting}
                      returnKeyType="next"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Fuel Type</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="e.g., Gasoline, Diesel"
                    value={formData.fuel_type}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, fuel_type: text }))
                    }
                    editable={!isSubmitting}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Status</Text>
                  <View style={styles.statusOptions}>
                    {["available", "active", "maintenance", "inactive"].map(
                      (status) => (
                        <TouchableOpacity
                          key={status}
                          style={[
                            styles.statusOption,
                            formData.status === status &&
                              styles.statusOptionSelected,
                          ]}
                          onPress={() =>
                            setFormData((prev) => ({
                              ...prev,
                              status: status as any,
                            }))
                          }
                          disabled={isSubmitting}
                        >
                          <Text
                            style={[
                              styles.statusOptionText,
                              formData.status === status &&
                                styles.statusOptionTextSelected,
                            ]}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={onClose}
                  disabled={isSubmitting}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.saveButton,
                    isSubmitting && styles.saveButtonDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={styles.saveButtonText}>
                      {isEdit ? "Update" : "Add Car"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const CarsComponent = () => {
  const router = useRouter();
  const { profile } = useAuthStore();
  const {
    ownerCars,
    getCarsByOwner,
    deleteCar,
    isLoading,
    createCar,
    updateCar,
  } = useCarStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const filters = [
    { id: "all", label: "All Cars" },
    { id: "active", label: "Active" },
    { id: "maintenance", label: "Maintenance" },
    { id: "available", label: "Available" },
    { id: "inactive", label: "Inactive" },
  ];

  const initialFormData = {
    plate_no: "",
    car_libre: "",
    model: "",
    year: "",
    color: "",
    fuel_type: "",
    status: "available" as "available" | "active" | "maintenance" | "inactive",
  };

  const loadCars = useCallback(async () => {
    if (profile?.id) {
      await getCarsByOwner(profile.id);
    }
  }, [profile?.id, getCarsByOwner]);

  useEffect(() => {
    loadCars();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCars();
    setRefreshing(false);
  }, [loadCars]);

  const summary = useMemo(
    () => ({
      total: ownerCars.length,
      active: ownerCars.filter((car) => car.status === "active").length,
      maintenance: ownerCars.filter((car) => car.status === "maintenance")
        .length,
      available: ownerCars.filter((car) => car.status === "available").length,
      inactive: ownerCars.filter((car) => car.status === "inactive").length,
    }),
    [ownerCars]
  );

  const filteredCars = useMemo(() => {
    const filteredByStatus = ownerCars.filter((car) => {
      if (activeFilter === "all") return true;
      return car.status === activeFilter;
    });

    if (!searchQuery) return filteredByStatus;

    const query = searchQuery.toLowerCase();
    return filteredByStatus.filter((car) => {
      return (
        car.plate_no.toLowerCase().includes(query) ||
        car.model?.toLowerCase().includes(query) ||
        car.car_libre?.toLowerCase().includes(query)
      );
    });
  }, [ownerCars, activeFilter, searchQuery]);

  const handleAddCar = async (formData: any) => {
    if (!profile?.id) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    // Validation
    if (!formData.plate_no) {
      Alert.alert("Error", "Please enter plate number");
      return;
    }

    if (!formData.car_libre) {
      Alert.alert("Error", "Please enter car libre/VIN");
      return;
    }

    setIsSubmitting(true);
    try {
      const carData = {
        ...formData,
        car_owner: profile.id,
        year: formData.year ? parseInt(formData.year) : undefined,
      };

      await createCar(carData as any);

      Alert.alert("Success", "Car added successfully");
      closeModal();

      // Refresh data after a short delay
      setTimeout(() => {
        loadCars();
      }, 1000);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCar = async (formData: any) => {
    if (!selectedCar) return;

    setIsSubmitting(true);
    try {
      await updateCar(selectedCar.id, {
        ...formData,
        year: formData.year ? parseInt(formData.year) : undefined,
      });

      Alert.alert("Success", "Car updated successfully");
      closeModal();

      // Refresh data after a short delay
      setTimeout(() => {
        loadCars();
      }, 1000);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update car");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    Alert.alert(
      "Delete Car",
      "Are you sure you want to delete this car? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCar(carId);
              Alert.alert("Success", "Car deleted successfully");
              loadCars();
            } catch (error: any) {
              Alert.alert("Error", error.message || "Failed to delete car");
            }
          },
        },
      ]
    );
  };

  const handleViewCar = (car: any) => {
    router.push(`/(owner)/cars/${car.id}`);
  };

  const handleEditPress = (car: any) => {
    setSelectedCar(car);
    setShowEditModal(true);
  };

  const handleReportPress = async (car: any) => {
    try {
      // Get car financial data
      const revenue = await RevenueService.getTotalRevenue(car.id);
      const expenses = await ExpenseService.getTotalExpenses(car.id);
      const profitLoss = await RevenueService.getProfitLoss(car.id);

      // Show report summary
      Alert.alert(
        `Car Report: ${car.plate_no}`,
        `Plate: ${car.plate_no}\n` +
          `Model: ${car.model || "N/A"}\n` +
          `Status: ${car.status}\n\n` +
          `Total Revenue: ETB ${revenue.toLocaleString("en-ET", {
            minimumFractionDigits: 2,
          })}\n` +
          `Total Expenses: ETB ${expenses.toLocaleString("en-ET", {
            minimumFractionDigits: 2,
          })}\n` +
          `Net Profit: ETB ${profitLoss.profit.toLocaleString("en-ET", {
            minimumFractionDigits: 2,
          })}\n` +
          `Profit Margin: ${profitLoss.profitMargin.toFixed(1)}%`,
        [
          { text: "Close", style: "cancel" },
          {
            text: "View Details",
            onPress: () => router.push(`/(owner)/reports?carId=${car.id}`),
          },
        ]
      );
    } catch (error) {
      console.error("Error generating report:", error);
      Alert.alert("Error", "Failed to generate report");
    }
  };

  const closeModal = useCallback(() => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedCar(null);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4CAF50";
      case "maintenance":
        return "#FF9800";
      case "available":
        return "#2196F3";
      case "inactive":
        return "#9E9E9E";
      default:
        return "#666666";
    }
  };

  const getStatusBackground = (status: string) => {
    switch (status) {
      case "active":
        return "#E8F5E9";
      case "maintenance":
        return "#FFF3E0";
      case "available":
        return "#E3F2FD";
      case "inactive":
        return "#F5F5F5";
      default:
        return "#F5F5F5";
    }
  };

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A1A1A" />
        <Text style={styles.loadingText}>Loading cars...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
              returnKeyType="search"
              editable={!isLoading}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
            disabled={isLoading}
          >
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

          {filteredCars.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="car" size={48} color="#E0E0E0" />
              <Text style={styles.emptyStateText}>
                {searchQuery ? "No cars match your search" : "No cars found"}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  style={styles.addFirstButton}
                  onPress={() => setShowAddModal(true)}
                >
                  <Text style={styles.addFirstButtonText}>
                    Add Your First Car
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.carsContainer}>
              {filteredCars.map((car) => (
                <View key={car.id} style={styles.carCard}>
                  <View style={styles.carHeader}>
                    <View style={styles.carPlate}>
                      <Text style={styles.plateText}>{car.plate_no}</Text>
                    </View>
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusBackground(car.status) },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          { color: getStatusColor(car.status) },
                        ]}
                      >
                        {car.status.charAt(0).toUpperCase() +
                          car.status.slice(1)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.carInfo}>
                    <Text style={styles.carModel}>
                      {car.model || "No model"}
                    </Text>
                    {car.year && <Text style={styles.carYear}>{car.year}</Text>}
                  </View>

                  {car.color && (
                    <View style={styles.carDetails}>
                      <View style={styles.detailItem}>
                        <Ionicons
                          name="color-palette"
                          size={16}
                          color="#666666"
                        />
                        <Text style={styles.detailText}>{car.color}</Text>
                      </View>
                      {car.fuel_type && (
                        <View style={styles.detailItem}>
                          <Ionicons name="water" size={16} color="#666666" />
                          <Text style={styles.detailText}>{car.fuel_type}</Text>
                        </View>
                      )}
                    </View>
                  )}

                  <View style={styles.carActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleViewCar(car)}
                    >
                      <Ionicons name="eye" size={18} color="#666666" />
                      <Text style={styles.actionButtonText}>View</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEditPress(car)}
                    >
                      <Ionicons name="create" size={18} color="#666666" />
                      <Text style={styles.actionButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleReportPress(car)}
                    >
                      <Ionicons
                        name="document-text"
                        size={18}
                        color="#666666"
                      />
                      <Text style={styles.actionButtonText}>Report</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Delete button */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteCar(car.id)}
                  >
                    <Ionicons name="trash" size={16} color="#F44336" />
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fleet Overview</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="car-sport" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>{summary.total}</Text>
              <Text style={styles.statLabel}>Total Vehicles</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="checkmark-circle" size={24} color="#2196F3" />
              <Text style={styles.statValue}>{summary.active}</Text>
              <Text style={styles.statLabel}>Active</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="construct" size={24} color="#FFC107" />
              <Text style={styles.statValue}>{summary.maintenance}</Text>
              <Text style={styles.statLabel}>Maintenance</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Car Modal */}
      <CarForm
        visible={showAddModal}
        isEdit={false}
        initialData={initialFormData}
        onClose={closeModal}
        onSubmit={handleAddCar}
        isSubmitting={isSubmitting}
      />

      {/* Edit Car Modal */}
      <CarForm
        visible={showEditModal}
        isEdit={true}
        initialData={{
          plate_no: selectedCar?.plate_no || "",
          car_libre: selectedCar?.car_libre || "",
          model: selectedCar?.model || "",
          year: selectedCar?.year?.toString() || "",
          color: selectedCar?.color || "",
          fuel_type: selectedCar?.fuel_type || "",
          status: selectedCar?.status || "available",
        }}
        onClose={closeModal}
        onSubmit={handleEditCar}
        isSubmitting={isSubmitting}
      />
    </>
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
    position: "relative",
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
  statusText: {
    fontSize: 12,
    fontWeight: "500",
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
  carActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
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
  deleteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deleteButtonText: {
    fontSize: 12,
    color: "#F44336",
    fontWeight: "500",
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
  emptyState: {
    alignItems: "center",
    padding: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  addFirstButton: {
    marginTop: 20,
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addFirstButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  statusOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusOption: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  statusOptionSelected: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  statusOptionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666666",
  },
  statusOptionTextSelected: {
    color: "#FFFFFF",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 24,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
  },
  saveButton: {
    backgroundColor: "#1A1A1A",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666666",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default CarsComponent;
