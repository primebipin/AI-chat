import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Clipboard, ScrollView } from 'react-native';

export default function OutputText({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.outputBox}>
        <Text>{text || 'See the output here...'}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title={copied ? 'Copied!' : 'Copy'} onPress={handleCopy} color="#4682B4" />
        <Button title="Clear" onPress={() => setText('')} color="#4682B4" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  outputBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
