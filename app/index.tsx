import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 예시를 위한 간단한 로그인 검증 (아이디와 비밀번호가 'admin'인 경우)
    if (username === 'admin' && password === 'admin') {
      console.log('로그인 성공: 환영합니다!');
    } else {
      console.log('로그인 실패: 로그인에 실패했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Top-level page</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

