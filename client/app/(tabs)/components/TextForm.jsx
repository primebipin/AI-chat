import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, ActivityIndicator } from 'react-native';

export default function TextForm({ setText }) {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormatText = async (action) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/format-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, action }),
      });
      const data = await response.json();
      if (data.generatedText) {
        setText(data.generatedText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textBox}
        value={inputText}
        onChangeText={setInputText}
        multiline
        placeholder="Type your text here..."
      />
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#4682B4" />
        ) : (
          <>
            <Button title="Search" onPress={() => handleFormatText('Search')} color="#4682B4" />
            <Button title="Correct Text" onPress={() => handleFormatText('Correct Text')} color="#4682B4" />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ADD8E6',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
