import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { users } from '../utils/Arrays'
import UserCard from '../components/UserCard'
import { Types } from '../utils/Types'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MainStackParamList } from '../navigation/MainStackNavigator'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'

type NavigationList = NativeStackNavigationProp<MainStackParamList, 'newNote'>

const NewNote = () => {
  const {params} = useRoute<RouteProp<MainStackParamList, 'newNote'>>()
  const [selectedUser, setSelectedUser] = useState<Types.user | null>()
  const [selectedCategory, setSelectedCategory] = useState<Types.category | null>()
  const [noteContent, setNoteContent] = useState<string>('')
  const navigation = useNavigation<NavigationList>()


  const onCategorySelect = (category: Types.category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    if (params.note){
      setSelectedCategory(params.note.category)
      setSelectedUser(params.note.user)
      setNoteContent(params.note.content)
      return
    }
    setSelectedCategory(undefined)
    setSelectedUser(undefined)
    setNoteContent('')
  },[])

  const renderUsers = () => {
    return users.map((user, index) => {
      return (
        <UserCard
          key={index}
          user={user}
          onSelect={setSelectedUser}
          isOpen={selectedUser === user}
          onCategorySelect={onCategorySelect}
          />
      )
    })
  }

  const handleSubmit = async () => {
    try {
      if (!selectedUser || !selectedCategory) throw Error
      const note: Types.note = {
        user: selectedUser,
        category: selectedCategory,
        content: noteContent
      }
      const notes = await AsyncStorage.getItem('notes')
      if (!notes){
        await AsyncStorage.setItem('notes', JSON.stringify([note]))
      } else if(params.note) {
          const parsedNotes: Types.note[] = JSON.parse(notes)
          // I was trying to do it like this: const filteredNotes = parsedNotes.filter(note1 => note1 !== params.note)
          // But for some reason I couldn't get it to work
          // Ideally, a backend would generate a UUID which can be used to filter
          const filteredNotes = parsedNotes.filter(note1 => note1.content !== params.note?.content && note1.user !== params.note?.user && note1.category !== params.note?.category)
          await AsyncStorage.setItem('notes', JSON.stringify([...filteredNotes, note]))
      } else {
        await AsyncStorage.setItem('notes', JSON.stringify([...JSON.parse(notes), note]))
      }
      navigation.navigate('home')
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <SafeAreaView
      style={{flex: 1}}
      edges={['top']}>
        <View style={styles.mainContainer}>
        {selectedCategory || params.note ? (
          <>
            <View style={styles.textInputContainer}>
                <Text style={styles.headerStyle}>{selectedUser?.name} - {selectedCategory?.title}</Text>
              <TextInput
                autoFocus
                multiline
                value={noteContent}
                onChangeText={setNoteContent}/>
            </View>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSubmit}>
              <Text style={{fontSize: 20}}>Save</Text>
            </TouchableOpacity>
          </>
        ) :
        renderUsers()}
        </View>
    </SafeAreaView>
  )
}

export default NewNote

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
    marginTop: 50,
    flex: 1
  },
  headerStyle: {
    fontSize: 20
  },
  textInputContainer: {
    backgroundColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 20
  },
  saveBtn: {
    borderRadius: 10,
    paddingHorizontal: 5,
    borderWidth: 2,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
})