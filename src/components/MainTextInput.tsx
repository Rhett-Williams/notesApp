import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef } from 'react'

type Props = {
  onChangeText: (value: string) => void
  value: string
}

const MainTextInput = ({onChangeText, value}:Props) => {
  const inputRef = useRef<TextInput>(null)

  return (
    <TouchableOpacity
      onPress={() => inputRef.current?.focus()}
      style={styles.mainContainer}>
      <Text style={{fontSize: 20}}>&#x1F50D;</Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}/>
    </TouchableOpacity>
  )
}

export default MainTextInput

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 8,
    backgroundColor: '#dcdcde',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  }
})