import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Controller } from 'react-hook-form'

const mainColor = '#1B6094'

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry, autoCapitalize, keyboardType = "default" }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <>
                    <View style={[styles.container, {
                        borderColor: error ? 'red' : mainColor,
                        borderWidth: error ? 2 : 1,
                        backgroundColor: error ? '#ffdcd1' : 'white',
                        marginVertical: error ? 4 : 5,

                    }]}>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            style={styles.input}
                            secureTextEntry={secureTextEntry}
                            autoCapitalize={autoCapitalize}
                            keyboardType={keyboardType}
                        />
                    </View>
                    {error ? (
                        <Text style={{ color: 'red', alignSelf: 'center' }}>{error.message || 'Error'}</Text>
                    ) : <Text style={{ color: 'red', alignSelf: 'center' }}></Text>}
                </>
            )}
        />


    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
    input: {}
})

export default CustomInput