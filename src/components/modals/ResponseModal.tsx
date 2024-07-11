import React from 'react';
import {
  Modal,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

type ModalProps = {
  visible: boolean;
  type: 'success' | 'error';
  modalText: string;
  onClose: () => void;
};

export const ResponseModal: React.FC<ModalProps> = ({
  visible,
  type,
  modalText,
  onClose,
}) => {
  const getImageSource = () => {
    return type === 'success'
      ? require('../../assets/images/success.png')
      : require('../../assets/images/error.png');
  };

  const getHeaderText = () => {
    return type === 'success' ? 'Success!' : 'Error!';
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onClose}
                hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                <Image
                  style={styles.cross}
                  source={require('../../assets/images/cross.png')}
                />
              </TouchableOpacity>

              <View style={styles.content}>
                <Image source={getImageSource()} style={styles.image} />
                <Text style={styles.headerText}>{getHeaderText()}</Text>
                <Text style={styles.modalText}>{modalText}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    width: 280,
    height: 220,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 99,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  cross: {
    width: 35,
    height: 35,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
