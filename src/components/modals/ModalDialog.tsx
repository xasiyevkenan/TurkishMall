import {
  Modal,
  StyleProp,
  ViewStyle,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import CommonDimensions from 'theme/dimension';
import {normalize} from 'theme/metrics';

interface IModalDialog {
  children?: React.ReactNode;
  visible: boolean;
  modalStyle?: StyleProp<ViewStyle>;
  onSumbit?: () => void;
  onClose?: () => void;
}

export const ModalDialog: React.FC<IModalDialog> = ({
  children,
  visible,
  modalStyle,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent
      visible={visible}>
      <Pressable onPress={onClose} style={[styles.root, modalStyle]}>
        <Pressable style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#131515CC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  } as ViewStyle,
  modal: {
    width: normalize('width', CommonDimensions.windowWidth - 70),
    backgroundColor: 'white',
    padding: normalize('horizontal', 30),
    borderRadius: normalize('width', 16),
    maxHeight: '90%',
  } as ViewStyle,
});
