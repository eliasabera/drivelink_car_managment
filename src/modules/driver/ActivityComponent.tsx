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

const ActivityComponent = () => {
  const [activeTab, setActiveTab] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const recentActivities = [
    {
      id: 1,
      type: "income",
      amount: "$35",
      description: "Trip to Airport",
      time: "Today, 09:30 AM",
      category: "Trip",
    },
    {
      id: 2,
      type: "expense",
      amount: "$28",
      description: "Fuel refill",
      time: "Today, 11:15 AM",
      category: "Fuel",
    },
    {
      id: 3,
      type: "income",
      amount: "$22",
      description: "City ride",
      time: "Today, 01:45 PM",
      category: "Trip",
    },
    {
      id: 4,
      type: "expense",
      amount: "$12",
      description: "Car wash",
      time: "Yesterday, 04:20 PM",
      category: "Maintenance",
    },
    {
      id: 5,
      type: "income",
      amount: "$45",
      description: "Airport transfer",
      time: "Yesterday, 10:30 AM",
      category: "Trip",
    },
    {
      id: 6,
      type: "expense",
      amount: "$8",
      description: "Parking fee",
      time: "Dec 13, 02:15 PM",
      category: "Other",
    },
  ];

  const categories = {
    income: ["Trip", "Extra", "Bonus", "Other"],
    expense: ["Fuel", "Maintenance", "Food", "Tolls", "Parking", "Other"],
  };

  const summary = {
    today: { income: "$85", expense: "$40", balance: "$45" },
    week: { income: "$420", expense: "$180", balance: "$240" },
    month: { income: "$1,850", expense: "$650", balance: "$1,200" },
  };

  const handleAddEntry = () => {
    if (!amount || !description) return;
    // Add entry logic here
    setAmount("");
    setDescription("");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Activity Log</Text>
        <Text style={styles.subtitle}>Track your income and expenses</Text>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.today.balance}</Text>
          <Text style={styles.summaryLabel}>Today's Balance</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.week.balance}</Text>
          <Text style={styles.summaryLabel}>This Week</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{summary.month.balance}</Text>
          <Text style={styles.summaryLabel}>This Month</Text>
        </View>
      </View>

      {/* Add Entry Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Add New Entry</Text>
        <View style={styles.formCard}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "income" && styles.tabActive]}
              onPress={() => setActiveTab("income")}
            >
              <Ionicons
                name="trending-up"
                size={20}
                color={activeTab === "income" ? "#4CAF50" : "#666666"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "income" && styles.tabTextActive,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "expense" && styles.tabActive]}
              onPress={() => setActiveTab("expense")}
            >
              <Ionicons
                name="trending-down"
                size={20}
                color={activeTab === "expense" ? "#F44336" : "#666666"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === "expense" && styles.tabTextActive,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount ($)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              placeholderTextColor="#9E9E9E"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              placeholderTextColor="#9E9E9E"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesContainer}
            >
              {categories[activeTab].map((category) => (
                <TouchableOpacity key={category} style={styles.categoryButton}>
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
            <Text style={styles.addButtonText}>
              Add {activeTab === "income" ? "Income" : "Expense"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesContainer}>
          {recentActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View
                style={[
                  styles.activityIcon,
                  activity.type === "income"
                    ? styles.incomeIcon
                    : styles.expenseIcon,
                ]}
              >
                <Ionicons
                  name={
                    activity.type === "income" ? "trending-up" : "trending-down"
                  }
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityDescription}>
                  {activity.description}
                </Text>
                <View style={styles.activityDetails}>
                  <Text style={styles.activityCategory}>
                    {activity.category}
                  </Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.activityAmount,
                  activity.type === "income"
                    ? styles.incomeAmount
                    : styles.expenseAmount,
                ]}
              >
                {activity.type === "income" ? "+" : "-"}
                {activity.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Monthly Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
        <View style={styles.breakdownCard}>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownTitle}>Income</Text>
              <Text style={styles.breakdownValue}>{summary.month.income}</Text>
            </View>
            <View style={styles.breakdownBar}>
              <View
                style={[
                  styles.breakdownFill,
                  { width: "100%", backgroundColor: "#4CAF50" },
                ]}
              />
            </View>
          </View>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownTitle}>Expenses</Text>
              <Text style={styles.breakdownValue}>{summary.month.expense}</Text>
            </View>
            <View style={styles.breakdownBar}>
              <View
                style={[
                  styles.breakdownFill,
                  { width: "35%", backgroundColor: "#F44336" },
                ]}
              />
            </View>
          </View>
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownTitle}>Net Balance</Text>
              <Text style={[styles.breakdownValue, styles.balanceValue]}>
                {summary.month.balance}
              </Text>
            </View>
            <View style={styles.breakdownBar}>
              <View
                style={[
                  styles.breakdownFill,
                  { width: "65%", backgroundColor: "#1A1A1A" },
                ]}
              />
            </View>
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
    padding: 16,
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
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  tabActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  tabTextActive: {
    color: "#1A1A1A",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
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
  categoriesContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#666666",
  },
  addButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  activitiesContainer: {
    gap: 12,
  },
  activityCard: {
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
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  incomeIcon: {
    backgroundColor: "#4CAF50",
  },
  expenseIcon: {
    backgroundColor: "#F44336",
  },
  activityInfo: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  activityDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  activityCategory: {
    fontSize: 12,
    color: "#666666",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  activityTime: {
    fontSize: 12,
    color: "#999999",
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  incomeAmount: {
    color: "#4CAF50",
  },
  expenseAmount: {
    color: "#F44336",
  },
  breakdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  breakdownItem: {
    marginBottom: 20,
  },
  breakdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
  },
  breakdownValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  balanceValue: {
    color: "#4CAF50",
  },
  breakdownBar: {
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  breakdownFill: {
    height: "100%",
    borderRadius: 4,
  },
});

export default ActivityComponent;
