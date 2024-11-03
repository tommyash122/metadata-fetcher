import { showToast } from '../components/common/ToastManager';

const handleCopy = (value) => {
  navigator.clipboard.writeText(value);
  showToast('Copied to clipboard!');
  console.log(value);
};

export default handleCopy;
