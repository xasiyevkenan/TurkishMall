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
    width: CommonDimensions.windowWidth - 40,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 16,
    maxHeight: '90%',
  } as ViewStyle,
});
