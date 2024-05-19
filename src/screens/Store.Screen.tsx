import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  ViewStyle,
  Text,
  Alert,
} from 'react-native';
import WebView from 'react-native-webview';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/Routes';
import BasketIcon from 'assets/vectors/basket.svg';
import HomeIcon from 'assets/vectors/home.svg';
import PlusIcon from 'assets/vectors/plus.svg';
import {ModalDialog} from 'components/ModalDialog';
import {Input} from 'components/Input';
import {Button} from 'components/Button';
import {validateInput} from 'utils/formValidation';

export const StoreScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.store>
> = ({route, navigation}) => {
  const {storeUrl} = route.params;
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    url: '',
    price: '',
    count: '',
    size: '',
    color: '',
    description: '',
  });
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {},
  );
  const [allInputsFilled, setAllInputsFilled] = useState(false);

  const checkAllInputsFilled = () => {
    for (const key of Object.keys(formData)) {
      if (!formData[key as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setAllInputsFilled(checkAllInputsFilled());
  }, [formData]);

  const onClose = () => {
    setVisible(false);
    setErrorMessages({});
    setFormData({
      url: '',
      price: '',
      count: '',
      size: '',
      color: '',
      description: '',
    });
  };

  const handleFormSubmit = () => {
    const errors: Record<string, string> = {};
    let hasError = false;

    for (const key of Object.keys(formData)) {
      const errorMessage = validateInput(
        key,
        formData[key as keyof typeof formData],
      );
      if (errorMessage) {
        errors[key] = errorMessage;
        hasError = true;
      }
    }

    if (hasError) {
      setErrorMessages(errors);
      return;
    }

    fetch('https://turkishmall.com/api/web/post-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: route.params?.userId,
        ...formData,
      }),
    })
      .then(response => {
        if (response.ok) {
          Alert.alert('Success', 'Your order has been received');
          onClose();
        } else {
          Alert.alert('Fail', 'Error server');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        style={styles.webview}
        source={{uri: storeUrl ? storeUrl : 'https://turkishmall.com/stores'}}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      />

      <View style={styles.icons}>
        <Pressable
          onPress={() =>
            navigation.navigate(Routes.home, {
              storeUrl: 'https://turkishmall.com/',
            })
          }
          style={styles.iconView}>
          <HomeIcon style={styles.icon} />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate(Routes.basket)}
          style={styles.iconView}>
          <BasketIcon style={styles.icon} />
        </Pressable>
        <Pressable
          onPress={() => setVisible(true)}
          style={[styles.iconView, styles.formIconView]}>
          <PlusIcon style={[styles.icon, styles.formIcon]} />
        </Pressable>
      </View>
      <ModalDialog onClose={onClose} visible={visible}>
        <Text style={styles.formHeader}>Услуга 'Заказать для меня'</Text>
        <View style={styles.form}>
          <Input
            label="Добавить линки"
            placeholder="https://www.trendyol.com/crocs/lila-unises"
            value={formData.url}
            errorMessage={errorMessages.url}
            setValue={value => {
              setFormData({...formData, url: value});
              setErrorMessages(prevErrors => ({...prevErrors, url: ''}));
            }}
          />
          <Input
            label="Цена (TL)"
            placeholder="3913.77"
            value={formData.price}
            errorMessage={errorMessages.price}
            setValue={value => {
              setFormData({...formData, price: value});
              setErrorMessages(prevErrors => ({...prevErrors, price: ''}));
            }}
          />
          <Input
            label="Количество"
            placeholder="1"
            value={formData.count}
            errorMessage={errorMessages.count}
            setValue={value => {
              setFormData({...formData, count: value});
              setErrorMessages(prevErrors => ({...prevErrors, count: ''}));
            }}
          />
          <Input
            type="select"
            label="Размер"
            placeholder="Размер"
            value={formData.size}
            errorMessage={errorMessages.size}
            setValue={value => {
              setFormData({...formData, size: value});
              setErrorMessages(prevErrors => ({...prevErrors, size: ''}));
            }}
          />
          <Input
            label="Цвет"
            placeholder="например: Черный"
            value={formData.color}
            errorMessage={errorMessages.color}
            setValue={value => {
              setFormData({...formData, color: value});
              setErrorMessages(prevErrors => ({...prevErrors, color: ''}));
            }}
          />
          <Input
            label="Особые примечания"
            placeholder="примечания"
            value={formData.description}
            errorMessage={errorMessages.description}
            setValue={value => {
              setFormData({...formData, description: value});
              setErrorMessages(prevErrors => ({
                ...prevErrors,
                description: '',
              }));
            }}
          />
          <Button
            type={allInputsFilled ? 'active' : 'disabled'}
            title="Перейти к оплате"
            onPress={handleFormSubmit}
          />
        </View>
      </ModalDialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  } as ViewStyle,
  webview: {
    flex: 1,
  } as ViewStyle,
  icons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    position: 'absolute',
    right: 15,
    bottom: 15,
  } as ViewStyle,
  iconView: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 999,
    borderColor: 'gray',
    borderWidth: 1,
  } as ViewStyle,
  icon: {
    color: 'black',
    width: 30,
    height: 30,
  } as ViewStyle,
  formIconView: {
    backgroundColor: 'red',
  } as ViewStyle,
  formIcon: {
    color: 'white',
  } as ViewStyle,
  formHeader: {
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 20,
  },
  form: {
    gap: 10,
  } as ViewStyle,
});
