import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Mock user data for testing
  const mockUsers = [
    { email: "owner@drivelink.com", password: "owner123", role: "owner" },
    { email: "manager@drivelink.com", password: "manager123", role: "manager" },
    { email: "driver@drivelink.com", password: "driver123", role: "driver" },
    { email: "test@test.com", password: "test123", role: "driver" }, // Default test account
  ];

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // Find user in mock data
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Redirect based on role
      switch (user.role) {
        case "owner":
          router.replace("/(owner)/dashboard");
          break;
        case "manager":
          router.replace("/(manager)/dashboard");
          break;
        case "driver":
          router.replace("/(driver)/dashboard");
          break;
        default:
          Alert.alert("Error", "Invalid role");
      }
    } else {
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  const handleRegisterPress = () => {
    router.push("/(auth)/register");
  };

  // Quick login buttons for testing
  const handleQuickLogin = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DriveLink</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#9E9E9E"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#9E9E9E"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Quick Login Buttons for Testing */}
        <View style={styles.quickLoginContainer}>
          <Text style={styles.quickLoginTitle}>Quick Login (Testing)</Text>
          <View style={styles.quickLoginButtons}>
            <TouchableOpacity
              style={[styles.quickButton, styles.ownerButton]}
              onPress={() =>
                handleQuickLogin("owner@drivelink.com", "owner123")
              }
            >
              <Text style={styles.quickButtonText}>Owner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickButton, styles.managerButton]}
              onPress={() =>
                handleQuickLogin("manager@drivelink.com", "manager123")
              }
            >
              <Text style={styles.quickButtonText}>Manager</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickButton, styles.driverButton]}
              onPress={() =>
                handleQuickLogin("driver@drivelink.com", "driver123")
              }
            >
              <Text style={styles.quickButtonText}>Driver</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.footerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 20,
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
  loginButton: {
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
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  quickLoginContainer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  quickLoginTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666666",
    marginBottom: 12,
    textAlign: "center",
  },
  quickLoginButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  quickButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  ownerButton: {
    backgroundColor: "#1A1A1A",
  },
  managerButton: {
    backgroundColor: "#2D2D2D",
  },
  driverButton: {
    backgroundColor: "#3D3D3D",
  },
  quickButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  footerText: {
    color: "#666666",
    fontSize: 14,
  },
  footerLink: {
    color: "#1A1A1A",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default LoginComponent;
