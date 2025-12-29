import React, { useState, useEffect, useCallback } from "react";
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
  Linking,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUserStore } from "../../shared/store/user-store";
import { useAuthStore } from "../../shared/store/auth-store";
import { UserService } from "../../shared/services/user-service";
import { AuthService } from "../../shared/services/auth-service";

// Move ManagerForm to a separate component to prevent re-renders
const ManagerForm = ({
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
                {isEdit ? "Edit Manager" : "Add New Manager"}
              </Text>

              <ScrollView
                style={styles.formContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter manager's full name"
                    value={formData.name}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, name: text }))
                    }
                    editable={!isSubmitting}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="manager@example.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, email: text }))
                    }
                    editable={!isSubmitting}
                    returnKeyType="next"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+251 900 000 000"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(text) =>
                      setFormData((prev) => ({ ...prev, phone: text }))
                    }
                    editable={!isSubmitting}
                    returnKeyType="next"
                  />
                </View>

                {!isEdit && (
                  <>
                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Password *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="At least 6 characters"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) =>
                          setFormData((prev) => ({ ...prev, password: text }))
                        }
                        editable={!isSubmitting}
                        returnKeyType="next"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.inputLabel}>Confirm Password *</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Confirm password"
                        secureTextEntry
                        value={formData.confirmPassword}
                        onChangeText={(text) =>
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: text,
                          }))
                        }
                        editable={!isSubmitting}
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit}
                      />
                    </View>
                  </>
                )}
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
                      {isEdit ? "Update" : "Add Manager"}
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

const ManagersComponent = () => {
  const router = useRouter();
  const { profile } = useAuthStore();
  const { managers, getManagers, isLoading } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManager, setSelectedManager] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [managerProfiles, setManagerProfiles] = useState<any[]>([]);

  // Memoize initial form data to prevent re-renders
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  // Load managers and their profiles
  const loadManagersData = useCallback(async () => {
    try {
      // Get manager records
      await getManagers();

      // Also get users with manager role for profile data
      const managerUsers = await UserService.getUsersByRole("manager");
      setManagerProfiles(managerUsers);
    } catch (error) {
      console.error("Error loading managers:", error);
      Alert.alert("Error", "Failed to load managers");
    }
  }, []);

  useEffect(() => {
    loadManagersData();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadManagersData();
    setRefreshing(false);
  }, [loadManagersData]);

  const summary = {
    total: managers.length,
    active: managers.length,
    carsManaged: managers.reduce((sum, manager) => sum + 0, 0),
    driversManaged: managers.reduce((sum, manager) => sum + 0, 0),
  };

  // Find profile for each manager
  const getManagerProfile = (managerId: string) => {
    const profile = managerProfiles.find((p) => p.id === managerId);
    if (profile) return profile;

    return null;
  };

  // Memoize filtered managers to prevent unnecessary re-renders
  const filteredManagers = React.useMemo(() => {
    const managersWithProfiles = managers.map((manager) => {
      const profile = getManagerProfile(manager.manager_id);
      return {
        ...manager,
        profile,
      };
    });

    if (!searchQuery) return managersWithProfiles;

    const query = searchQuery.toLowerCase();
    return managersWithProfiles.filter((managerWithProfile) => {
      const profile = managerWithProfile.profile;
      if (!profile) return false;

      return (
        profile.full_name?.toLowerCase().includes(query) ||
        profile.email?.toLowerCase().includes(query) ||
        profile.phone_number?.toLowerCase().includes(query)
      );
    });
  }, [managers, managerProfiles, searchQuery]);

  const handleAddManager = async (formData: any) => {
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      // Register new manager
      await AuthService.register({
        email: formData.email,
        password: formData.password,
        full_name: formData.name,
        phone_number: formData.phone,
        role: "manager",
      });

      Alert.alert("Success", "Manager added successfully");
      closeModal();

      // Refresh data after a short delay
      setTimeout(() => {
        loadManagersData();
      }, 1000);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add manager");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditManager = async (manager: any) => {
    const profile = getManagerProfile(manager.manager_id);
    if (!profile) {
      Alert.alert("Error", "Could not load manager profile");
      return;
    }

    setSelectedManager(manager);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (formData: any) => {
    // Handle edit - you'll need to implement this
    Alert.alert("Info", "Edit functionality will be implemented soon");
    setIsSubmitting(false);
    closeModal();
  };

  const handleDeleteManager = async (manager: any) => {
    const profile = getManagerProfile(manager.manager_id);
    Alert.alert(
      "Delete Manager",
      `Are you sure you want to delete ${
        profile?.full_name || "this manager"
      }? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              Alert.alert(
                "Info",
                "Delete functionality needs to be implemented in the backend service"
              );
            } catch (error: any) {
              Alert.alert("Error", error.message || "Failed to delete manager");
            }
          },
        },
      ]
    );
  };

  const handleViewManager = (manager: any) => {
    router.push(`/(owner)/managers/${manager.id}`);
  };

  const handleMessageManager = (email: string) => {
    if (!email) {
      Alert.alert("Error", "No email address found for this manager");
      return;
    }
    Linking.openURL(`mailto:${email}`);
  };

  const handleAssignCars = (manager: any) => {
    router.push(`/(owner)/managers/${manager.id}/assign-cars`);
  };

  const closeModal = useCallback(() => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedManager(null);
  }, []);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1A1A1A" />
        <Text style={styles.loadingText}>Loading managers...</Text>
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
            <Text style={[styles.summaryValue, { color: "#4CAF50" }]}>
              {summary.active}
            </Text>
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
              placeholder="Search by name, email, or phone..."
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
            <Ionicons name="person-add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Manager</Text>
          </TouchableOpacity>
        </View>

        {/* Manager List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            All Managers ({filteredManagers.length})
          </Text>

          {filteredManagers.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="people" size={48} color="#E0E0E0" />
              <Text style={styles.emptyStateText}>
                {searchQuery
                  ? "No managers match your search"
                  : "No managers found"}
              </Text>
              {!searchQuery && (
                <TouchableOpacity
                  style={styles.addFirstButton}
                  onPress={() => setShowAddModal(true)}
                >
                  <Text style={styles.addFirstButtonText}>
                    Add Your First Manager
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.managersContainer}>
              {filteredManagers.map((manager) => {
                const profile = manager.profile;

                return (
                  <View key={manager.id} style={styles.managerCard}>
                    <View style={styles.managerHeader}>
                      <View style={styles.managerAvatar}>
                        <Text style={styles.managerInitial}>
                          {profile?.full_name?.charAt(0)?.toUpperCase() || "M"}
                        </Text>
                      </View>
                      <View style={styles.managerInfo}>
                        <Text style={styles.managerName}>
                          {profile?.full_name || "Manager"}
                        </Text>
                        <Text style={styles.managerEmail}>
                          {profile?.email || "No email"}
                        </Text>
                        {profile?.phone_number && (
                          <Text style={styles.managerPhone}>
                            {profile.phone_number}
                          </Text>
                        )}
                        <View style={styles.managerStatus}>
                          <View
                            style={[styles.statusBadge, styles.statusActive]}
                          >
                            <Text style={styles.statusText}>Active</Text>
                          </View>
                          <Text style={styles.joinDate}>
                            {manager.created_at
                              ? `Joined ${new Date(
                                  manager.created_at
                                ).toLocaleDateString()}`
                              : ""}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.managerStats}>
                      <View style={styles.statItem}>
                        <Ionicons name="car" size={16} color="#666666" />
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Cars</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <Ionicons name="people" size={16} color="#666666" />
                        <Text style={styles.statValue}>0</Text>
                        <Text style={styles.statLabel}>Drivers</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <Ionicons
                          name="trending-up"
                          size={16}
                          color="#666666"
                        />
                        <Text style={styles.statValue}>-</Text>
                        <Text style={styles.statLabel}>Performance</Text>
                      </View>
                    </View>

                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleMessageManager(profile?.email)}
                        disabled={!profile?.email}
                      >
                        <Ionicons
                          name="mail"
                          size={18}
                          color={profile?.email ? "#666666" : "#CCCCCC"}
                        />
                        <Text
                          style={[
                            styles.actionButtonText,
                            !profile?.email && styles.actionButtonTextDisabled,
                          ]}
                        >
                          Message
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleViewManager(manager)}
                      >
                        <Ionicons name="eye" size={18} color="#666666" />
                        <Text style={styles.actionButtonText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEditManager(manager)}
                      >
                        <Ionicons name="create" size={18} color="#666666" />
                        <Text style={styles.actionButtonText}>Edit</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Additional Actions */}
                    <View style={styles.extraActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.assignButton]}
                        onPress={() => handleAssignCars(manager)}
                      >
                        <Ionicons name="car" size={16} color="#2196F3" />
                        <Text
                          style={[
                            styles.actionButtonText,
                            { color: "#2196F3" },
                          ]}
                        >
                          Assign Cars
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteManager(manager)}
                      >
                        <Ionicons name="trash" size={16} color="#F44336" />
                        <Text
                          style={[
                            styles.actionButtonText,
                            { color: "#F44336" },
                          ]}
                        >
                          Remove
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Performance Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Overview</Text>
          <View style={styles.performanceContainer}>
            <View style={styles.performanceCard}>
              <Ionicons name="trending-up" size={24} color="#4CAF50" />
              <Text style={styles.performanceValue}>-</Text>
              <Text style={styles.performanceLabel}>Avg. Performance</Text>
            </View>
            <View style={styles.performanceCard}>
              <Ionicons name="time" size={24} color="#2196F3" />
              <Text style={styles.performanceValue}>-</Text>
              <Text style={styles.performanceLabel}>Task Completion</Text>
            </View>
            <View style={styles.performanceCard}>
              <Ionicons name="happy" size={24} color="#FFC107" />
              <Text style={styles.performanceValue}>-</Text>
              <Text style={styles.performanceLabel}>Avg. Rating</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add Manager Modal */}
      <ManagerForm
        visible={showAddModal}
        isEdit={false}
        initialData={initialFormData}
        onClose={closeModal}
        onSubmit={handleAddManager}
        isSubmitting={isSubmitting}
      />

      {/* Edit Manager Modal */}
      <ManagerForm
        visible={showEditModal}
        isEdit={true}
        initialData={{
          name: selectedManager?.profile?.full_name || "",
          email: selectedManager?.profile?.email || "",
          phone: selectedManager?.profile?.phone_number || "",
          password: "",
          confirmPassword: "",
        }}
        onClose={closeModal}
        onSubmit={handleEditSubmit}
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
    marginBottom: 2,
  },
  managerPhone: {
    fontSize: 12,
    color: "#999999",
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
    justifyContent: "center",
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
  statDivider: {
    width: 1,
    backgroundColor: "#E0E0E0",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
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
  actionButtonTextDisabled: {
    color: "#CCCCCC",
  },
  extraActions: {
    flexDirection: "row",
    gap: 8,
  },
  assignButton: {
    backgroundColor: "#E3F2FD",
  },
  deleteButton: {
    backgroundColor: "#FFEBEE",
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
  saveButtonDisabled: {
    backgroundColor: "#666666",
    opacity: 0.7,
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


export default ManagersComponent;
