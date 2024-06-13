import { Alert, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Input, Text } from '@/bluprints';
import { Formik } from 'formik';
import { supabase } from '@/utils/supabase';
import { useBottomState } from '@/store/modal';

export const Protuct = () => {
  const { brandId, closeBottom } = useBottomState();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text type="h1">Ürün ekleme 1</Text>
      </View>
      <Formik
        initialValues={{ market: '' }}
        onSubmit={async values => {
          const { data } = await supabase
            .from('Product')
            .select('*')
            .eq('MarketId', brandId)
            .eq('Name', values.market);

          if (data!.length > 0) {
            Alert.alert('Data var');
          } else {
            const { status } = await supabase
              .from('Product')
              .insert({ Name: values.market, MarketId: brandId, Quantity: 0 });

            if (status === 201) {
              closeBottom();
            }
          }
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
              placeholder="Ürün adı"
              onChangeText={handleChange('market')}
              onBlur={handleBlur('market')}
              value={values.market}
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
              <Text type="h1">Ekle</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};
