import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState} from 'react'
import { Types } from '../utils/Types'
import { categories } from '../utils/Arrays'

type Props = {
    user: Types.user
    onSelect: (userId: Types.user) => void
    isOpen: boolean
    onCategorySelect: (category: Types.category) => void
}

const UserCard = ({user, onSelect, isOpen, onCategorySelect}: Props) => {

    const renderCategories = () => {
        return categories.map((category, index) => {
            return (
                <TouchableOpacity
                    style={styles.categoryContainer}
                    onPress={() => onCategorySelect(category)}>
                    <Text style={styles.categoryFont}>{category.title}</Text>
                </TouchableOpacity>
            )
        })
    }

    return (
        <TouchableOpacity
            style={[styles.mainContainer, {height: isOpen ? 'auto' : 64}]}
            onPress={() => onSelect(user)}>
            <Text
                style={styles.userText}
                numberOfLines={1}
                ellipsizeMode='tail'
                >
                {user.name}
            </Text>
            {renderCategories()}
        </TouchableOpacity>
  )
}

export default UserCard

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('screen').width - 30,
        borderRadius: 20,
        backgroundColor: 'blue',
        marginBottom: 20,
        paddingHorizontal: 10,
        overflow: 'hidden'
    },
    userText: {
        fontSize: 50,
        color: 'white',
        width: Dimensions.get('screen').width - 50
    },
    categoryContainer: {
        backgroundColor: 'black',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    categoryFont: {
        fontSize: 20,
        color: 'white'
    }
})