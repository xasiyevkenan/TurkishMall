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
import {normalize} from 'theme/metrics';

type ModalProps = {
  visible: boolean;
  type: string;
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
    switch (type) {
      case 'success':
        return require('../../assets/images/success.png');
      case 'error':
        return require('../../assets/images/error.png');
      case 'warning':
        return require('../../assets/images/warning.png');
      default:
        return require('../../assets/images/error.png');
    }
  };

  const getHeaderText = () => {
    switch (type) {
      case 'success':
        return 'Success!';
      case 'error':
        return 'Error!';
      case 'warning':
        return 'Warning!';
      default:
        return 'Error!';
    }
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
    borderRadius: normalize('width', 10),
    padding: normalize('horizontal', 20),
    alignItems: 'center',
    elevation: 5,
    width: normalize('width', 280),
    height: normalize('height', 280),
  },
  closeButton: {
    position: 'absolute',
    top: normalize('vertical', 10),
    right: normalize('horizontal', 10),
    zIndex: 99,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: normalize('width', 120),
    height: normalize('height', 150),
    marginBottom: normalize('vertical', 10),
  },
  cross: {
    width: normalize('width', 35),
    height: normalize('height', 35),
  },
  headerText: {
    fontSize: normalize('font', 18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: normalize('vertical', 5),
  },
  modalText: {
    fontSize: normalize('font', 16),
    textAlign: 'center',
  },
});
