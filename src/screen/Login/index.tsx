import React, { useEffect } from 'react';
import { BaseLayout, Input, Text } from '@/bluprints';
import { Alert, TouchableOpacity, View } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { supabase } from '@/utils/supabase';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Uyumsuz Email').required('Boş Geçilemez'),
  password: Yup.string().required('Boş Geçilemez'),
});

export const LoginPage = () => {
  return (
    <BaseLayout>
      <View
        style={{
          height: 250,
          justifyContent: 'space-between',

          marginLeft: 50,
        }}>
        <View
          style={{
            justifyContent: 'center',
            height: 150,
          }}>
          <Text type="h1">Bard Name</Text>
        </View>
        <View style={{}}>
          <Text style={{}} type="h1">
            Log İn
          </Text>
        </View>
      </View>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignupSchema}
        onSubmit={async values => {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
          });
          console.log(data.session);
        }}>
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View
            style={{
              height: 250,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Input
              inputStyle={{
                backgroundColor: '#bc9a83',
                paddingLeft: 30,
                borderRadius: 25,
              }}
              placeholderTextColor={'#785540'}
              style={{}}
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Input
              secureTextEntry={true}
              inputStyle={{
                backgroundColor: '#bd9986',
                paddingLeft: 30,
                marginTop: 25,
                borderRadius: 25,
              }}
              placeholderTextColor={'#71503b'}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: '#bd9985',
                paddingHorizontal: 25,
                paddingVertical: 15,
                marginTop: 15,
                borderRadius: 20,
              }}>
              <Text type="h1">Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </BaseLayout>
  );
};
