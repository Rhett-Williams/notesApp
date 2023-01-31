import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MainTextInput from '../components/MainTextInput'
import NewTabIcon from '../../assets/icons/NewNoteIcon'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParamList } from '../navigation/MainStackNavigator'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Types } from '../utils/Types'
import AsyncStorage from '@react-native-async-storage/async-storage'

type NavigationList = NativeStackNavigationProp<MainStackParamList, 'home'>

const Home = () => {
  const navigation = useNavigation<NavigationList>()
  const [searchInput, setSearchInput] = useState<string>('')
  const [notes, setNotes] = useState<Types.note[]>([])
  const isFocused = useIsFocused()

  const getNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem('notes')
      if (!notes) return
      setNotes(JSON.parse(notes))
    } catch (error) {
      console.log("error", error)
    }
  }

  const onDelete = async (removingNote: Types.note) => {
    const filteredNotes = notes.filter(note => note !== removingNote)
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(filteredNotes))
      getNotes()
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (!isFocused) return
    getNotes()
  },[isFocused])

  const renderNotes = () => {
    if (notes.length === 0) return

    return notes.map((note, index) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('newNote', {note})}
          style={styles.notesContainer}>
          <View style={{width: '80%'}}>
            <Text>{note.user.name} - {note.category.title}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode='tail'
              style={styles.noteContent}
              >{note.content}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onDelete(note)}>
            <Text>&#128465;</Text>
          </TouchableOpacity>

        </TouchableOpacity>
      )
    })
  }

  return (
    <SafeAreaView
        edges={['top']}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                  <Text style={styles.header}>Notes</Text>
                  <NewTabIcon onPress={() => navigation.navigate('newNote', {})}/>
                </View>
                <MainTextInput
                  value={searchInput}
                  onChangeText={setSearchInput}/>
                  <View >
                    {renderNotes()}
                  </View>
            </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    mainContainer: {
      marginHorizontal: 15,
      marginTop: 50
    },
    header: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'black'
    },
    headerContainer: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    notesContainer: {
      backgroundColor: '#dedcdc',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    noteContent: {

    }
})