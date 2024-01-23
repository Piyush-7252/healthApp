/* eslint-disable no-useless-catch */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
import axios from 'axios';
import moment from 'moment';
import startCase from 'lodash/startCase';
import dayjs from 'dayjs';
import { customRegexValidator } from 'src/utils/inputValidation';
import { BASE_URL, DECRYPT_RESPONSE_KEY, REACT_APP_COLLECTJS_API_KEY } from 'src/api/constants';
import { getDecryptedParams } from 'src/utils/decryption/Decryption';
import hTMLEntities from 'he';
import { v4 as uuid } from 'uuid';
import { PhoneNumberUtil } from 'google-libphonenumber';
import Events from './events';
import {
  copyMessage,
  dateFormats,
  durationUnit,
  genders,
  patientPrescriptionFrequency,
  roleTypes,
  shipAndPayee,
} from './constants';
import { UI_ROUTES } from './routeConstants';
import { Dimensions } from 'react-native';



const closeDrawer = () => {
  // Events.trigger('toggleAppDrawer', false);
};

const openDrawer = () => {
  Events.trigger('toggleAppDrawer');
};

const triggerEvents = (event, message = {}) => {
  Events.trigger(event, message);
};

const showSnackbar = (message) => {
  Events.trigger('showSnackbar', message);
};

const showConfirmDialog = ({ data, confirmAction, message = '' }) => {
  Events.trigger('showConfirmDialog', {
    data,
    confirmAction,
    message,
  });
};

const dateFormatter = (date, format = 'll') => moment(date).format(format);

const dateFormatterDayjs = (date, format = 'll') => dayjs(date).format(format);

const convertWithTimezone = (utcTimestamp, { timezone, format } = {}) => {
  // eslint-disable-next-line no-param-reassign
  timezone = timezone || getUserTimezone();
  const newDate = dayjs.utc(utcTimestamp).tz(timezone);
  if (format) {
    return newDate.format(format);
  }
  return newDate.toDate();
};

const getNewDate = (
  date,
  { timezone} = {}
) => {
  // eslint-disable-next-line no-param-reassign
  timezone = timezone || getUserTimezone();
  return dayjs(date).tz(timezone);
};

const getTimezoneAbbreviation =(timezone) =>moment.tz(timezone.toString()).format('z')

const getEndOfTheDate = (
  date,
  { unit = 'day', format = dateFormats.YYYYMMDD } = {}
) => 
   dayjs(date).endOf(unit).format(format)
;
const getStartOfTheDate = (
  date,
  { unit = 'day', format = dateFormats.YYYYMMDD } = {}
) => 
   dayjs(date).startOf(unit).format(format)
;

const to24Hours = (ampm) => {
  const hours = ampm ? dayjs(`${ampm}`).format('HH') : ampm;
  const minutes = ampm ? dayjs(`${ampm}`).format('mm') : ampm;
  return `${hours}:${minutes}`;
};

const time12hr = (time24hr) => moment(time24hr, 'HH:mm').format('h:mm A');

const combinedDateTime = (inputDate, inputTime) =>
  moment(`${inputDate} ${inputTime}`, 'YYYY-MM-DD h:mm A').toISOString();

function decodeHtml(html) {
  const decodedHtml = hTMLEntities.decode(html);
  return decodedHtml;
}
const getStartCase = (str) => startCase(str);

const getDirtyFieldsValue = (modifiedData = {}, dirtyFields = {}) => {
  const diffData = {};
  for (const key in dirtyFields) {
    if (Object.hasOwn(dirtyFields, key)) {
      diffData[key] = modifiedData[key];
    }
  }
  return diffData;
};

const getUpdatedFieldsValue = (newObj, preObj) => {
  if (!newObj || Object.keys(newObj).length < 1) return {};

  const diffValue = Object.keys(newObj).reduce((diff, key) => {
    if (preObj?.[key] === newObj?.[key]) return diff;
    return {
      ...diff,
      [key]: newObj?.[key],
    };
  }, {});
  return diffValue;
};

const updateFormFields = (formGroup, fields, key, value) => {
  const updatedFormGroups = formGroup.map((obj) => {
    if (fields?.includes(obj.name)) {
      const temp = obj;
      temp[key] = value;
      return temp;
    }
    return obj;
  });
  return updatedFormGroups;
};

const getGendersForm = () => {
  const gender = Object.keys(genders);
  const genderForm = [];
  gender.forEach((key) => {
    genderForm.push({ label: genders[key].label, value: genders[key].value });
  });
  return genderForm;
};


const passwordValidation = (formData) => [
  {
    condition: 'At least 1 uppercase character',
    satisfied: formData?.password
      ? !customRegexValidator({
          field: 'password',
          regex: /[A-Z]/g,
        })(formData)
      : false,
  },
  {
    condition: 'At least 1 lowercase character',
    satisfied: formData?.password
      ? !customRegexValidator({
          field: 'password',
          regex: /[a-z]/g,
        })(formData)
      : false,
  },
  {
    condition: 'At least 1 number',
    satisfied: formData?.password
      ? !customRegexValidator({
          field: 'password',
          regex: /[0-9]/,
        })(formData)
      : false,
  },
  {
    condition: 'At least 1 special character',
    satisfied: formData?.password
      ? !customRegexValidator({
          field: 'password',
          regex: /(?=.[!@#$%^&()_{}\-[\];:'"<>,./?\\|+=])/,
        })(formData)
      : false,
  },
  {
    condition: 'At least 8 characters',
    satisfied: formData?.password?.length >= 8,
  },
  {
    condition: 'Password must match with confirm password',
    satisfied:
      formData?.password?.length &&
      formData?.password === formData?.repeatPassword,
  },
];

const generateUniqueId = () => uuid();

// Image Upload
// eslint-disable-next-line consistent-return
const uploadImage = async (file, options = {}, isThumbnailRequired = false) => {
  const name = `${file?.fileInfo?.type || options?.type}_${file.name.replace(
    /[&/\\#,^@!+()$~%" "'":*?<>{}-]/g,
    '_'
  )}`;
  const formData = new FormData();
  if (file?.fileInfo?.patient) {
    formData.append('patient', file?.fileInfo?.patient);
  }
  if(file?.fileInfo?.isPublic || options?.isPublic) {
    formData.append('isPublic', 'true');
  }
  // eslint-disable-next-line no-param-reassign
  file = new File([file], name, { type: file.type });
  const { uri = 'upload' } = options;
  formData.append('', file);
  formData.append('thumbnail', isThumbnailRequired);

  try {
    const res = await axios.post(`${BASE_URL}${uri}`, formData, {
      mode: 'cors',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    let result = getDecryptedParams(res?.data, DECRYPT_RESPONSE_KEY) || {};
    result = result && result.length ? result[0] : result;
    return result;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Image download
const getImageUrl = (file, {isPublic = false, isPatientFile = false, practice, isPublicURI = false } = {}) => {
  if (!file) {
    return;
  }
  let imageUrl = isPublicURI ? `${BASE_URL}download/public?fileName=${file}` : `${BASE_URL}download?fileName=${file}`;
  if(isPatientFile) {
    imageUrl = `${imageUrl}&isPatientFile=${true}`;
  }
  if(isPublic){
    imageUrl = `${imageUrl}&public=${true}`;
  }
   if(practice){
    imageUrl = `${imageUrl}&practice=${practice}`;
  }
  // eslint-disable-next-line consistent-return
  return imageUrl;
};

const downloadFile = (file, fileName) => {
  const isPatientFile = file?.patient;
  const imageUrl = getImageUrl(fileName, {isPatientFile});
  fetch(imageUrl, { credentials: 'include' })
    .then((response) => response.blob())
    .then((responseAsBlob) => {
      const downloadURL = window.URL.createObjectURL(responseAsBlob);
      const a = document.createElement('a');
      a.href = downloadURL;
      a.download = fileName;
      a.click();
    });
};

const downloadPdf = (url, fileName = 'invoice.pdf') => {
  axios({
    url,
    method: 'GET',
    responseType: 'blob',
    withCredentials: true, // Send credentials
  }).then((response) => {
    const contentDisposition =
      response.headers.get('Content-Disposition') || '';
    const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(
      contentDisposition
    );
    const filename = matches && matches[1] ? matches[1] : fileName;
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};

const getZplToPdfUrl = (label) => {
  const byteCharacters = atob(label);
  const data = new FormData();
  data.append('file', byteCharacters);
  const reqUrl = process.env.REACT_APP_LABELARY_URL;

  return fetch(reqUrl, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/pdf' },
    
  })
    .then((response) => response.blob())
    .then((blob) => window.URL.createObjectURL(blob));
};

const DEVICE_DIMENSION = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const BASE_DIMENSION = {
  width: 1440,
  height: 898,
};

const normalizedWidth = (size) =>
  (DEVICE_DIMENSION.width / BASE_DIMENSION.width) * size;
const normalizedHeight = (size) =>
  (DEVICE_DIMENSION.height / BASE_DIMENSION.height) * size;

const scale = (size) => normalizedWidth(size);
const verticalScale = (size) => normalizedHeight(size);
const horizontalScale = (size) => normalizedWidth(size);
const lineHeightScale = (fontSize, factor = 1.2) =>
  Math.ceil(normalizedHeight(fontSize * factor));


const bytesToMB = (bytes) => {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2);
};

const getFileType = (file) => {
  if (file?.mimetype?.startsWith('image/')) {
    return 'image';
  }
  if (file?.mimetype === 'application/pdf') {
    return 'pdf';
  }
  return 'unknown';
};


const copyWidgetLink = (url) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      showSnackbar({
        message: copyMessage.copied,
        severity: 'success',
      });
    })
    .catch(() => {
      showSnackbar({
        message: copyMessage.error,
        severity: 'error',
      });
    });
};

  const isValidNumber = (number) => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const contact = `+${number}`;
    try {
      const regionCode = phoneUtil.getRegionCodeForNumber(
        phoneUtil.parseAndKeepRawInput(contact)
      );
      if (!regionCode || regionCode === null) {
        return false;
      }
      const parsedNumber = phoneUtil.parse(number, regionCode);
      const isValid = phoneUtil.isValidNumber(parsedNumber);
      if (!isValid) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  };
  
  const getFormValidations = (item = {}) => {
    const validation = {};
    if(item.inputType === 'date') {
      if(item.disableFuture && item.minDate) {
        validation.validateDate = (date) => {
          if(date > getNewDate()) 
           return "You can't select future date."
          if(date < item.minDate || date.$d.toString() === "Invalid Date") 
           return "Invalid date selected"
          return true
        }
      } else {
        if(item.disableFuture) {
          validation.validateDate = (date)=> date > getNewDate() ? "You can't select future date." : true
        }
        if(item.minDate) {
          validation.validateDate = (date) => {
            const selectedDate = new Date(date);
            const minDate = new Date(item.minDate);
          
            selectedDate.setHours(0,0,0,0);
            minDate.setHours(0,0,0,0);
          
            return selectedDate < minDate ? "Invalid date" : true
          }
        }
      }
    } 
    else if(item.inputType === 'phoneInput') {
      return {validatePhoneNumber : (num) => {
        if(!num || isValidNumber(num)) {
          return true
        } 
        return  "Invalid Number"
      }
    }
  }
  return validation;
  
}


export {
  closeDrawer,
  openDrawer,
  showSnackbar,
  dateFormatter,
  decodeHtml,
  getStartCase,
  getDirtyFieldsValue,
  triggerEvents,
  dateFormatterDayjs,
  getUpdatedFieldsValue,
  updateFormFields,
  getGendersForm,
  to24Hours,
  passwordValidation,
  generateUniqueId,
  uploadImage,
  getImageUrl,
  time12hr,
  combinedDateTime,
  downloadFile,
  scale,
  verticalScale,
  horizontalScale,
  lineHeightScale,
  getEndOfTheDate,
  getStartOfTheDate,
  convertWithTimezone,
  showConfirmDialog,
  downloadPdf,
  getZplToPdfUrl,
  bytesToMB,
  getFileType,
  copyWidgetLink,
  getNewDate,
  getTimezoneAbbreviation,
  getFormValidations,
  DEVICE_DIMENSION,
};
