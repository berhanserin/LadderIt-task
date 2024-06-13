import { Alert, FlatList, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { BaseLayout, Input, Text } from '@/bluprints';
import { useBottomState } from '@/store/modal';

import Add from '@/assets/add.svg';
import Search from '@/assets/search.svg';
import RemoveProd from '@/assets/remove-prod.svg';
import AddProd from '@/assets/add-prod.svg';

import { supabase } from '@/utils/supabase';
import { screenHeight, screenWidth } from '@/utils/dimensions';

export const Market = ({ route }: any) => {
  const { setOpen, open } = useBottomState();
  const { market } = route.params;
  const [search, setSearch] = useState('');

  const [marketProduct, setMarketProduct] = useState<any>();

  const getMarketProduct = async () => {
    const { data } = await supabase
      .from('Product')
      .select('*')
      .eq('MarketId', market.id);
    setMarketProduct(data);
  };

  useEffect(() => {
    getMarketProduct();
  }, [open]);

  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        style={{
          flexDirection: 'row',

          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={async () => {
            if (item.Quantity - 1 == -1) {
              Alert.alert("Ürün adeti 0'ın altına düşürülemez");
            } else {
              const qua = item.Quantity - 1;
              const { error, status } = await supabase
                .from('Product')
                .update({ Quantity: qua })
                .eq('id', item.id);
              if (!error) {
                Alert.alert('Güncelleme işlemi başarılı.');
                getMarketProduct();
              } else {
                Alert.alert('Güncelleme işlemi başarısız.');
              }
            }
          }}>
          <RemoveProd width={30} height={30} />
        </Pressable>

        <View
          style={{
            height: 50,
            width: 200,

            backgroundColor: '#bc9a83',

            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 20,
          }}>
          <Text type="h2">{item.Name}</Text>
          <Text type="h2" style={{ marginRight: 10 }}>
            {item.Quantity}
          </Text>
        </View>
        <Pressable
          onPress={async () => {
            const { error } = await supabase
              .from('Product')
              .update({ Quantity: item.Quantity + 1 })
              .eq('id', item.id);
            if (!error) {
              Alert.alert('Güncelleme işlemi başarılı.');
              getMarketProduct();
            } else {
              Alert.alert('Güncelleme işlemi başarısız.');
            }
          }}>
          <AddProd width={30} height={30} />
        </Pressable>
      </View>
    );
  };

  return (
    <BaseLayout>
      <View
        style={{
          backgroundColor: '#d9d9d9',
          height: 100,
          justifyContent: 'space-between',
          paddingLeft: 20,
          alignItems: 'center',

          flexDirection: 'row',
        }}>
        <View>
          <Text type="h1">{market.name}</Text>
        </View>
        <View style={{ marginRight: 20 }}>
          <Pressable
            onPress={() => {
              setOpen({ open: true, type: 1, brandId: market.id });
            }}>
            <Add width={50} height={50} />
          </Pressable>
        </View>
      </View>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Input
            style={{ backgroundColor: '#bc9a83', borderRadius: 10 }}
            placeholder="Search"
            placeholderTextColor={'#947873'}
            leftIcon={<Search width={20} height={20} />}
            value={search}
            onChangeText={e => setSearch(e)}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,

            height: screenHeight / 1.5,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={marketProduct?.filter((x: any) =>
              x.Name.toLowerCase().includes(search.toLowerCase())
            )}
            contentContainerStyle={{ gap: 25 }}
            renderItem={item => _renderItem(item)}
          />
        </View>
      </View>
    </BaseLayout>
  );
};
