import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Slot, useRouter, usePathname } from "expo-router"; // Add useRouter and usePathname
import Ionicons from "@expo/vector-icons/Ionicons";

const OwnerLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (pathname.includes("/dashboard")) return "dashboard";
    if (pathname.includes("/cars")) return "cars";
    if (pathname.includes("/managers")) return "managers";
    if (pathname.includes("/reports")) return "reports";
    return "dashboard";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const tabs = [
    { id: "dashboard", icon: "speedometer", route: "/(owner)/dashboard" },
    { id: "cars", icon: "car", route: "/(owner)/cars" },
    { id: "managers", icon: "people", route: "/(owner)/managers" },
    { id: "reports", icon: "document-text", route: "/(owner)/reports" },
  ];

  const handleTabPress = (tabId: string, route: string) => {
    setActiveTab(tabId);
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Slot />
      </View>

      {/* Floating Bottom Tab Navigation */}
      <View style={styles.tabContainer}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => handleTabPress(tab.id, tab.route)}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={activeTab === tab.id ? "#1A1A1A" : "#9E9E9E"}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Add padding so content doesn't hide tabs
  },
  tabContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    minWidth: 300,
    justifyContent: "space-between",
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});

export default OwnerLayout;
