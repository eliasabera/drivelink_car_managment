import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const FinanceComponent = () => {
  const [activePeriod, setActivePeriod] = useState("month");
  const [activeTab, setActiveTab] = useState<"overview" | "income" | "expense">(
    "overview"
  );

  const periods = [
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
    { id: "quarter", label: "Quarter" },
    { id: "year", label: "Year" },
  ];

  const summary = {
    totalRevenue: "$45,280",
    totalExpenses: "$12,450",
    netProfit: "$32,830",
    growth: "+18%",
  };

  const categories = {
    income: [
      {
        id: 1,
        name: "Ride Fares",
        amount: "$28,450",
        percentage: 63,
        color: "#4CAF50",
      },
      {
        id: 2,
        name: "Extra Services",
        amount: "$8,920",
        percentage: 20,
        color: "#2196F3",
      },
      {
        id: 3,
        name: "Package Delivery",
        amount: "$5,310",
        percentage: 12,
        color: "#FF9800",
      },
      {
        id: 4,
        name: "Other Income",
        amount: "$2,600",
        percentage: 5,
        color: "#9C27B0",
      },
    ],
    expense: [
      {
        id: 1,
        name: "Fuel",
        amount: "$5,280",
        percentage: 42,
        color: "#F44336",
      },
      {
        id: 2,
        name: "Maintenance",
        amount: "$3,150",
        percentage: 25,
        color: "#FF9800",
      },
      {
        id: 3,
        name: "Insurance",
        amount: "$1,850",
        percentage: 15,
        color: "#2196F3",
      },
      {
        id: 4,
        name: "Other Expenses",
        amount: "$2,170",
        percentage: 18,
        color: "#9E9E9E",
      },
    ],
  };

  const recentTransactions = [
    {
      id: 1,
      type: "income",
      description: "Airport transfer - John",
      amount: "$45",
      date: "Today, 09:30 AM",
    },
    {
      id: 2,
      type: "expense",
      description: "Fuel refill - Car DL-123",
      amount: "$65",
      date: "Today, 11:15 AM",
    },
    {
      id: 3,
      type: "income",
      description: "City tour - Group of 4",
      amount: "$120",
      date: "Yesterday, 02:30 PM",
    },
    {
      id: 4,
      type: "expense",
      description: "Monthly maintenance",
      amount: "$280",
      date: "Dec 14, 10:00 AM",
    },
    {
      id: 5,
      type: "income",
      description: "Business district trips",
      amount: "$85",
      date: "Dec 13, 04:45 PM",
    },
  ];

  const topDrivers = [
    { id: 1, name: "John Doe", revenue: "$4,520", trips: 42, percentage: 18 },
    { id: 2, name: "Jane Smith", revenue: "$3,980", trips: 38, percentage: 16 },
    {
      id: 3,
      name: "Mike Johnson",
      revenue: "$3,750",
      trips: 35,
      percentage: 15,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Finance Dashboard</Text>
        <Text style={styles.subtitle}>
          Track income, expenses & profitability
        </Text>
      </View>

      {/* Period Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.periodsContainer}
      >
        {periods.map((period) => (
          <TouchableOpacity
            key={period.id}
            style={[
              styles.periodButton,
              activePeriod === period.id && styles.periodButtonActive,
            ]}
            onPress={() => setActivePeriod(period.id)}
          >
            <Text
              style={[
                styles.periodButtonText,
                activePeriod === period.id && styles.periodButtonTextActive,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Summary Cards */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryCard, styles.revenueCard]}>
          <Ionicons name="trending-up" size={24} color="#4CAF50" />
          <Text style={styles.summaryValue}>{summary.totalRevenue}</Text>
          <Text style={styles.summaryLabel}>Total Revenue</Text>
          <View style={styles.growthBadge}>
            <Text style={styles.growthText}>{summary.growth}</Text>
          </View>
        </View>
        <View style={[styles.summaryCard, styles.expenseCard]}>
          <Ionicons name="trending-down" size={24} color="#F44336" />
          <Text style={styles.summaryValue}>{summary.totalExpenses}</Text>
          <Text style={styles.summaryLabel}>Total Expenses</Text>
        </View>
        <View style={[styles.summaryCard, styles.profitCard]}>
          <Ionicons name="cash" size={24} color="#FFC107" />
          <Text style={styles.summaryValue}>{summary.netProfit}</Text>
          <Text style={styles.summaryLabel}>Net Profit</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "overview" && styles.tabActive]}
          onPress={() => setActiveTab("overview")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "overview" && styles.tabTextActive,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "income" && styles.tabActive]}
          onPress={() => setActiveTab("income")}
        >
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
          <Text
            style={[
              styles.tabText,
              activeTab === "expense" && styles.tabTextActive,
            ]}
          >
            Expenses
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === "overview" ? (
        <>
          {/* Income Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income Breakdown</Text>
            <View style={styles.categoriesContainer}>
              {categories.income.map((category) => (
                <View key={category.id} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View
                      style={[
                        styles.categoryDot,
                        { backgroundColor: category.color },
                      ]}
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>{category.amount}</Text>
                  </View>
                  <View style={styles.percentageBar}>
                    <View
                      style={[
                        styles.percentageFill,
                        {
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        },
                      ]}
                    />
                    <Text style={styles.percentageText}>
                      {category.percentage}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Expense Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expense Breakdown</Text>
            <View style={styles.categoriesContainer}>
              {categories.expense.map((category) => (
                <View key={category.id} style={styles.categoryItem}>
                  <View style={styles.categoryHeader}>
                    <View
                      style={[
                        styles.categoryDot,
                        { backgroundColor: category.color },
                      ]}
                    />
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>{category.amount}</Text>
                  </View>
                  <View style={styles.percentageBar}>
                    <View
                      style={[
                        styles.percentageFill,
                        {
                          width: `${category.percentage}%`,
                          backgroundColor: category.color,
                        },
                      ]}
                    />
                    <Text style={styles.percentageText}>
                      {category.percentage}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      ) : activeTab === "income" ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Income Details</Text>
          <View style={styles.incomeDetails}>
            {categories.income.map((category) => (
              <View key={category.id} style={styles.detailCard}>
                <View
                  style={[
                    styles.detailIcon,
                    { backgroundColor: `${category.color}20` },
                  ]}
                >
                  <Ionicons name="cash" size={20} color={category.color} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailName}>{category.name}</Text>
                  <Text style={styles.detailAmount}>{category.amount}</Text>
                  <Text style={styles.detailPercentage}>
                    {category.percentage}% of total
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expense Details</Text>
          <View style={styles.expenseDetails}>
            {categories.expense.map((category) => (
              <View key={category.id} style={styles.detailCard}>
                <View
                  style={[
                    styles.detailIcon,
                    { backgroundColor: `${category.color}20` },
                  ]}
                >
                  <Ionicons name="receipt" size={20} color={category.color} />
                </View>
                <View style={styles.detailInfo}>
                  <Text style={styles.detailName}>{category.name}</Text>
                  <Text style={styles.detailAmount}>{category.amount}</Text>
                  <Text style={styles.detailPercentage}>
                    {category.percentage}% of total
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transactionsContainer}>
          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View
                style={[
                  styles.transactionIcon,
                  transaction.type === "income"
                    ? styles.incomeIcon
                    : styles.expenseIcon,
                ]}
              >
                <Ionicons
                  name={
                    transaction.type === "income"
                      ? "trending-up"
                      : "trending-down"
                  }
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>
                  {transaction.description}
                </Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === "income"
                    ? styles.incomeAmount
                    : styles.expenseAmount,
                ]}
              >
                {transaction.type === "income" ? "+" : "-"}
                {transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Top Performers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Drivers</Text>
        <View style={styles.driversContainer}>
          {topDrivers.map((driver) => (
            <View key={driver.id} style={styles.driverCard}>
              <View style={styles.driverInfo}>
                <View style={styles.driverAvatar}>
                  <Text style={styles.driverInitial}>
                    {driver.name.charAt(0)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <Text style={styles.driverTrips}>{driver.trips} trips</Text>
                </View>
              </View>
              <View style={styles.driverRevenue}>
                <Text style={styles.revenueAmount}>{driver.revenue}</Text>
                <Text style={styles.revenuePercentage}>
                  {driver.percentage}% of total
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download" size={20} color="#1A1A1A" />
            <Text style={styles.actionText}>Export Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="print" size={20} color="#1A1A1A" />
            <Text style={styles.actionText}>Print</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social" size={20} color="#1A1A1A" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="add-circle" size={20} color="#1A1A1A" />
            <Text style={styles.actionText}>Add Entry</Text>
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
  periodsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  periodButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
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
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  summaryCard: {
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
  revenueCard: {
    borderTopWidth: 4,
    borderTopColor: "#4CAF50",
  },
  expenseCard: {
    borderTopWidth: 4,
    borderTopColor: "#F44336",
  },
  profitCard: {
    borderTopWidth: 4,
    borderTopColor: "#FFC107",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666666",
    textAlign: "center",
  },
  growthBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 8,
  },
  growthText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#4CAF50",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
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
    fontWeight: "600",
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
  categoriesContainer: {
    gap: 16,
  },
  categoryItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  percentageBar: {
    height: 6,
    backgroundColor: "#F0F0F0",
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },
  percentageFill: {
    height: "100%",
    borderRadius: 3,
  },
  percentageText: {
    position: "absolute",
    right: 0,
    top: -18,
    fontSize: 12,
    color: "#666666",
  },
  incomeDetails: {
    gap: 12,
  },
  expenseDetails: {
    gap: 12,
  },
  detailCard: {
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
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailInfo: {
    flex: 1,
  },
  detailName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  detailAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  detailPercentage: {
    fontSize: 12,
    color: "#666666",
  },
  transactionsContainer: {
    gap: 12,
  },
  transactionCard: {
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
  transactionIcon: {
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
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#666666",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  incomeAmount: {
    color: "#4CAF50",
  },
  expenseAmount: {
    color: "#F44336",
  },
  driversContainer: {
    gap: 12,
  },
  driverCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
  driverName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  driverTrips: {
    fontSize: 12,
    color: "#666666",
  },
  driverRevenue: {
    alignItems: "flex-end",
  },
  revenueAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  revenuePercentage: {
    fontSize: 12,
    color: "#666666",
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
});

export default FinanceComponent;
