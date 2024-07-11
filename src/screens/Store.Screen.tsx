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
import {useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/Routes';
import BasketIcon from 'assets/vectors/basket.svg';
import HomeIcon from 'assets/vectors/home.svg';
import PlusIcon from 'assets/vectors/plus.svg';
import {Input} from 'components/general/Input'; // Assuming Input component path
import {Button} from 'components/general/Button'; // Assuming Button component path
import {postFormData} from 'services/services';
import {ModalDialog} from 'components/modals/ModalDialog';
import {ResponseModal} from 'components/modals/ResponseModal';
import ControlledInput from 'components/general/InputControlled'; // Path to ControlledInput component
import {validateInput} from 'utils/formValidation';

type FormData = {
  url: string;
  price: string;
  count: string;
  size: string;
  color: string;
  description: string;
};

export const StoreScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.store>
> = ({route, navigation}) => {
  const {storeUrl, userId: initialUserId} = route?.params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormData>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [modalText, setModalText] = useState('');
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userId, setUserId] = useState(initialUserId);
  const [productUrl, setProductUrl] = useState<string>('');

  console.log(productUrl);

  const handleFormSubmit = async (data: FormData) => {
    setSubmitted(true);
    setLoading(true);

    for (const field in data) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        const value = (data as any)[field];
        const errorMessage = validateInput(field, value);
        if (errorMessage) {
          setLoading(false);
          return showModal('error', errorMessage);
        }
      }
    }

    try {
      await postFormData(userId, data);
      setLoading(false);
      onClose();
      showModal('success', 'Form submitted successfully');
    } catch (error) {
      setLoading(false);
      onClose();
      showModal('error', 'Failed to submit form');
    }
  };

  const onClose = () => {
    setVisible(false);
    setSubmitted(false);
    setValue('url', '');
    setValue('price', '');
    setValue('count', '');
    setValue('size', '');
    setValue('color', '');
    setValue('description', '');
  };

  const onCloseResponseModal = () => {
    setModalVisible(false);
  };

  console.log(modalVisible);
  console.log(modalText);
  console.log(modalType);

  useEffect(() => {
    if (visible) {
      setValue('url', productUrl);
    }
  }, [visible]);

  const showModal = (type: 'success' | 'error', text: string) => {
    setModalType(type);
    setModalText(text);
    setModalVisible(true);
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
        onNavigationStateChange={navState => {
          const {url} = navState;

          if (url) {
            // Remove any file extension at the end of the URL
            const cleanUrl = url.replace(/\.[^.\/]+$/, ''); // Remove last segment after a dot (.)

            // Check if the cleaned URL ends with a digit
            if (/\d$/.test(cleanUrl)) {
              setProductUrl(url);
            } else {
              setProductUrl('');
            }
          }
        }}
      />

      <ResponseModal
        visible={modalVisible}
        type={modalType}
        modalText={modalText}
        onClose={onCloseResponseModal}
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
          <ControlledInput
            name="url"
            label="Добавить линки"
            placeholder="https://www.trendyol.com/crocs/lila-unises"
            control={control}
            defaultValue={productUrl}
            submitted={submitted}
          />

          <ControlledInput
            name="price"
            label="Цена (TL)"
            placeholder="3913.77"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="count"
            label="Количество"
            placeholder="1"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="size"
            type="select"
            label="Размер"
            placeholder="Размер"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="color"
            label="Цвет"
            placeholder="например: Черный"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="description"
            label="Особые примечания"
            placeholder="примечания"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <Button
            type={loading ? 'loading' : 'active'}
            title="Перейти к оплате"
            onPress={handleSubmit(handleFormSubmit)}
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

export default StoreScreen;
