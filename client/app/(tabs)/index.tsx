import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TextForm from './components/TextForm';
import OutputText from './components/OutputText';

export default function App() {
  const [text, setText] = useState(''); // Holds corrected text for OutputText

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>AskMe</Text>
      </View>
      <View style={styles.body}>
        <TextForm setText={setText} /> {/* Pass setText to update corrected text */}
        <OutputText text={text} /> {/* Display corrected text in OutputText */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25294bd6',
  },
  header: {
    backgroundColor: '#1c2a37',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#ADD8E6',
    shadowColor: '#ADD8E6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
