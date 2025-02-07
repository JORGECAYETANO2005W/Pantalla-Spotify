import { useState } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, 
  View, Image, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg' }}
            style={styles.logo}
          />
          <Text style={styles.title}>Log in to Spotify</Text>
        </View>

        
        <View style={styles.socialContainer}>
          {[
            { uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png', text: 'Continue with Google' },
            { uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png', text: 'Continue with Facebook' },
            { uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png', text: 'Continue with Apple' }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.socialButton}>
              <Image source={{ uri: item.uri }} style={styles.socialIcon} />
              <Text style={styles.socialText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email or username"
            placeholderTextColor="#8c8c8c"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8c8c8c"
            secureTextEntry
          />

          
          <TouchableOpacity 
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={styles.checkbox}>
              {rememberMe && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.linkText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign up for Spotify</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.05,
    height: width * 0.05,
    marginBottom: 5,
    color: '#1DB954',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  socialContainer: {
    marginBottom: 25,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#191414',
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 25,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#535353',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  socialText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#535353',
  },
  dividerText: {
    color: '#8c8c8c',
    marginHorizontal: 15,
    fontSize: 14,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    height: 50,
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#fff',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1DB954',
  },
  rememberText: {
    color: '#fff',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: 'center',
  },
  linkText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  signupText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

