import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable,
  ViewStyle,
  Text,
} from 'react-native';
import WebView from 'react-native-webview';
import {useForm} from 'react-hook-form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationParamList} from 'types/navigation.types';
import {Routes} from 'router/Routes';
import PlusIcon from 'assets/vectors/plus.svg';
import {Button} from 'components/general/Button';
import {postFormData} from 'services/services';
import {ModalDialog} from 'components/modals/ModalDialog';
import {ResponseModal} from 'components/modals/ResponseModal';
import ControlledInput from 'components/general/InputControlled';
import {validateInput} from 'utils/formValidation';
import {normalize} from 'theme/metrics';
import {translations} from 'translation';

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
> = ({route}) => {
  type LanguageKey = 'az' | 'en' | 'ru';

  const {storeUrl, userId: initialUserId, language} = route?.params;

  const languageForIndex: LanguageKey = (language as LanguageKey) || 'az';
  const t = translations[languageForIndex];

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<FormData>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState(t.success || t.error || t.warning);
  const [modalText, setModalText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userId, setUserId] = useState(initialUserId);
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [productUrl, setProductUrl] = useState<string>('');

  console.log(userId);

  const handleFormSubmit = async (data: FormData) => {
    setSubmitted(true);
    setLoading(true);

    for (const field in data) {
      if (Object.prototype.hasOwnProperty.call(data, field)) {
        const value = (data as any)[field];
        const errorMessage = validateInput(field, value);
        if (errorMessage) {
          setLoading(false);
          return showModal(t.error, errorMessage);
        }
      }
    }

    try {
      await postFormData(userId, data);
      setLoading(false);
      onClose();
      showModal(t.success, t.successMessage);
    } catch (error) {
      setLoading(false);
      onClose();
      showModal(t.error, t.errorMessage);
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

  useEffect(() => {
    if (visible) {
      setValue('url', productUrl);
    }
  }, [visible]);

  const showModal = (type: string, text: string) => {
    setModalType(type);
    setModalText(text);
    setModalVisible(true);
  };

  const handleAddOrder = () => {
    if (
      userId == null ||
      userId === '0' ||
      userId === undefined ||
      userId === ' '
    ) {
      showModal('warning', 'Please login after add order');
      return;
    }
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00997D" />
        </View>
      )}
      <WebView
        style={styles.webview}
        source={{uri: storeUrl ? storeUrl : 'https://cfex.az/az/stores'}}
        onLoadEnd={() => setLoading(false)}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00997D" />
          </View>
        )}
        onNavigationStateChange={navState => {
          const {url} = navState;

          if (url) {
            setCurrentUrl(url);
            // Remove URL parameters (e.g., anything after '?' or '&')
            const urlWithoutParams = url.split('?')[0]?.split('&')[0];

            if (urlWithoutParams) {
              // Remove any file extension at the end of the URL
              const cleanUrl = urlWithoutParams.replace(/\.[^.\/]+$/, '');

              // Check if the cleaned URL ends with a digit
              if (/\d$/.test(cleanUrl)) {
                setProductUrl(url);
              } else {
                setProductUrl('');
              }
            } else {
              setProductUrl('');
            }
          } else {
            setProductUrl('');
          }
        }}
      />

      <ResponseModal
        visible={modalVisible}
        type={modalType}
        modalText={modalText}
        onClose={onCloseResponseModal}
      />

      <Pressable
        onPress={handleAddOrder}
        style={[
          styles.iconView,
          userId !== '0' ? styles.formIconView : styles.formDisabled,
        ]}>
        <PlusIcon strokeWidth={4} style={[styles.icon, styles.formIcon]} />
      </Pressable>

      <ModalDialog onClose={onClose} visible={visible}>
        <Text style={styles.formHeader}>{t.orderService}</Text>
        <View style={styles.form}>
          <ControlledInput
            name="url"
            label={t.addLink}
            placeholder="https://www.trendyol.com/crocs/lila-unises"
            control={control}
            defaultValue={productUrl}
            submitted={submitted}
          />

          <ControlledInput
            name="price"
            label={t.price}
            placeholder="3913.77"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="count"
            label={t.quantity}
            placeholder="1"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="size"
            type="select"
            label={t.size}
            placeholder={t.size}
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="color"
            label={t.color}
            placeholder="например: Черный"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <ControlledInput
            name="description"
            label={t.notes}
            placeholder="примечания"
            control={control}
            defaultValue=""
            submitted={submitted}
          />

          <Button
            type={loading ? 'loading' : 'active'}
            title={t.addOrder}
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

  iconView: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    backgroundColor: 'white',
    padding: normalize('width', 15),
    borderRadius: 999,
  } as ViewStyle,
  icon: {
    color: 'black',
    width: normalize('width', 30),
    height: normalize('height', 30),
  } as ViewStyle,
  formIconView: {
    backgroundColor: '#00997D',
  } as ViewStyle,
  formDisabled: {
    backgroundColor: 'gray',
  },
  formIcon: {
    color: 'white',
  } as ViewStyle,
  formHeader: {
    fontSize: normalize('font', 23),
    fontWeight: '600',
    marginBottom: normalize('height', 20),
  },
  form: {
    gap: normalize('height', 10),
  } as ViewStyle,
});
