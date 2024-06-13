import { FlatList, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { BaseLayout, Input, Text } from '@/bluprints';
import Add from '@/assets/add.svg';
import { supabase } from '@/utils/supabase';

import Search from '@/assets/search.svg';
import { screenHeight, screenWidth } from '@/utils/dimensions';
import { useBottomState } from '@/store/modal';
import { navigate } from '@/navRoot';

interface market {
  id: number;
  name: string;
  total: number;
  range: number;
}

export const Main = () => {
  const [bard, setBard] = useState<{ id: number; Name: string }>();
  const [market, setMarket] = useState<[market]>();
  const [search, setSearch] = useState('');

  const getBardData = async () => {
    const auth = await supabase.auth.getUser();
    console.log(auth.data.user?.id);
    const { data, statusText, error } = await supabase
      .from('Bard')
      .select('*')
      .eq('UserId', auth.data.user?.id);

    console.log(data);
    if (data) {
      setBard(data[0]);
      getMarketData(data[0].id);
    }
  };

  const getMarketData = async (id: any) => {
    //@ts-ignore
    let array: [
      {
        id: number;
        name: string;
        total: number;
        range: number;
      }
    ] = [];
    if (id) {
      const { data } = await supabase
        .from('Market')
        .select('*')
        .eq('BrandId', id);

      //@ts-ignore
      for (let index = 0; index < data.length; index++) {
        //@ts-ignore
        const element = data[index];
        const { data: ProductData } = await supabase
          .from('Product')
          .select('*')
          .eq('MarketId', element.id);
        array.push({
          id: element.id,
          name: element.Name,
          range: ProductData?.map(market => market.Quantity).reduce(
            (acc, Quantity) => acc + Quantity,
            0
          ),
          total: ProductData?.length ?? 0,
        });
      }
      setMarket(array);
    }
  };

  const _renderItem = ({ item, index }: { item: market; index: number }) => {
    return (
      <Pressable
        onPress={() => {
          navigate('Market', { market: item });
        }}
        style={{
          height: 120,
          width: 200,
          borderRadius: 25,
          backgroundColor: '#bc9a83',

          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <Text type="h2">Market Name: {item.name}</Text>
        <Text type="h2" style={{ marginTop: 5 }}>
          Total Product Range: {item.range}
        </Text>
        <Text type="h2" style={{ marginTop: 5 }}>
          Total Product: {item.total}
        </Text>
      </Pressable>
    );
  };

  const { setOpen, open } = useBottomState();

  useEffect(() => {
    getBardData();
  }, []);

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
          <Text type="h1">{bard?.Name}</Text>
        </View>
        <View style={{ marginRight: 20 }}>
          <Pressable
            onPress={() => {
              setOpen({ open: true, type: 0, brandId: bard?.id });
            }}>
            <Add width={50} height={50} />
          </Pressable>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingTop: 5 }}>
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
            data={market?.filter(x =>
              x.name.toLowerCase().includes(search.toLowerCase())
            )}
            contentContainerStyle={{ gap: 25 }}
            renderItem={item => _renderItem(item)}
          />
        </View>
      </View>
    </BaseLayout>
  );
};
