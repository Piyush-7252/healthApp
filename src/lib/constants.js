import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import palette from 'src/theme/palette';

dayjs.extend(utc);
dayjs.extend(timezone);

const contentType = {
  MULTIPART: 'multipart',
};

const DRAWER_WIDTH = 236;
const HEADER_MOBILE = 54;
const HEADER_DESKTOP = 62;
// validations

const inputLength = {
  firstName: { value: 50 },
  name: { value: 128 },
  email: { value: 300 },
  commonTextLength: { value: 300 },
  amountLength: { value: 6 },
  textArea: { value: 1000 },
};

const Regex = {
  firstName: /^[a-zA-Z-' ]+$/,
  name: /^[a-zA-Z-' ]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  number: /^[0-9]+$/i,
  onlyAlphabet: /^[A-Za-z ]+$/i,
  textArea: /^[\w\-.@#!?,$/ \n()]+$/,
  commonText: /^[ A-Za-z0-9_@./#&+,-\s]*$/,
  alphanumeric: /^[a-zA-Z0-9_' ]+$/,
  noHtmlTagRegex: /^(?!.*<[^>]+>)(?!.*&[#\w]+;)[^<>]*$/i,
  numberDec: /^\d+(\.\d*)?$/,
  postalCode: /^[0-9-]+$/,
  alphabetAndSpaces:/^[A-Za-z\s]+$/
};
const regName = Regex.name;

const alphanumericPattern = Regex.alphanumeric;

const regexAlphanumeric = {
  value: alphanumericPattern,
  message: ' should be alphabet, special symbols are not allowed',
};

const emailValidatorPattern = {
  value: Regex.email,
  message: 'Please enter valid EmailID',
};
const onlyAlphabet = {
  value: Regex.onlyAlphabet,
  message: 'Please enter only alphabet',
};

const noHtmlTagPattern = {
  value: Regex.noHtmlTagRegex,
  message: `Invalid characters used. Please remove <  or > and try again`,
};

const requiredField = { value: true };
const onlyNumber = { value: Regex.number, message: ' should be numeric' };
const regDecimal = {
  value: Regex.numberDec,
  message: ' should be numeric/decimal',
};
const regFirstname = {
  value: Regex.firstName,
  message: ' should be alphabet',
};
const regexName = {
  value: regName,
  message: ' should be alphabet, special symbols are not allowed',
}; // patient name, staff name
const regEmail = {
  value: Regex.email,
  message: 'Invalid Email',
};

const regTextArea = {
  value: Regex.textArea,
  message: 'Invalid character',
};

const regPostalCode = {
  value: Regex.postalCode,
  message: 'Invalid postal code',
};

const regPassword = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#])[A-Za-z\d@$!%*?&_#]{8,}$/,
  message:
    'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and has a minimum length of 8 characters.',
};

const regexCommonText = {
  value: Regex.commonText,
  message: ' special character not allowed',
}; // servicename, clinicename, templatename, emailsubject, mastername, description,

const maxLength = (name, value = 10) => ({
  value,
  message: `${name} cannot be longer than ${value} characters`,
});

const regMobile = { value: /^[0-9]+$/i, message: 'Invalid Number' };

const regexUrl = {
  value: /^(ftp|http|https):\/\/[^ "]+$/,
  message: 'Invalid Url',
};

const notificationReminder = [
  {
    value: 'YES',
    label: 'YES',
  },
  {
    value: 'NO',
    label: 'NO',
  },
];

const userTimeZone = dayjs.tz.guess();
const minDOB = dayjs().subtract(125, 'year');
const maxFutureAppointmentDate = dayjs().add(2, 'month').subtract(1, 'day');

const master = {
  addSuccessMessage: 'Master data has been added successfully',
  updateSuccessMessage: 'Master data has been updated successfully',
};

const genders = {
  male: {
    label: 'Male',
    value: 'male',
  },
  female: {
    label: 'Female',
    value: 'female',
  },
  other: {
    label: 'Other',
    value: 'other',
  },
};

const scheduleMessage = {
  addSuccessMessage: 'Schedule has been added successfully',
  updateSuccessMessage: 'Schedule has been updated successfully',
  noChangeMessage: 'No change in data',
  validTimeMessage: 'Please enter valid time',
};

const successMessage = {
  create: 'Created Successfully',
  update: 'Updated Successfully',
  delete: 'Delete Successfully',
};

const appointmentMessage = {
  addSuccessMessage: 'Appointment created successfully',
  updateSuccessMessage: 'Appointment updated successfully',
};

const copyMessage = {
  copied: 'Link copied to clipboard',
  error: 'There is something wrong',
};

const roleMessage = {
  change: 'Role changed successfully',
};

const roleTypes = {
  superAdmin: 'superAdmin',
  clinicAdmin: 'clinicAdmin',
  practitioner: 'practitioner',
  assistant: 'assistant',
  patient: 'patient',
};
const roleTypesValue = {
  superAdmin: 'Super Admin',
  clinicAdmin: 'Clinic Admin',
  practitioner: 'Practitioner',
  assistant: 'Assistant',
};
const userData = {};
const setUserData = (data = {}) => {
  userData.user = { ...data };
};

const dateFormats = {
  YYYYMMDD: 'YYYY-MM-DD',
  MMDDYYYY: 'MM-DD-YYYY',
  YYYDDMMHHMMSS: 'YYYY-MM-DDThh:mm:ss.sssZ',
  MMMDDYYYYHHMMSS: 'MMM DD, YYYY hh:mm A',
  MMMDDHHMMa: 'MMM DD hh:mm A',
  YYYYMMMDDDTHHmmssZ: 'YYYY-MM-DDTHH:mm:ss.sssZ',
};

const timeFormats = {
  HHmm: 'HH:mm',
  hhmma: 'hh:mm a',
};

const getArrayDiff = (targetArray, sourceArray) => {
  const inserted = [];
  const deleted = [];
  sourceArray?.map((item) => {
    if (!targetArray?.includes(item)) inserted.push(item);
    return item;
  });
  targetArray?.map((item) => {
    if (!sourceArray?.includes(item)) deleted.push(item);
    return item;
  });
  return [inserted, deleted];
};

const patientOrderStatus = {
  received: 'Pending',
  'Rx. Order Created': 'Rx. Order Created',
  shipped: 'Shipped'
};

const patientOrderStatusOptions = () =>
  Object.entries(patientOrderStatus)?.map(([key, value]) => ({
    name: value,
    code: value,
    id: key,
  }));

const appointmentStatus = {
  PENDING_CONFIRMATION: 'Pending Confirmation',
  CANCELLED: 'Cancelled',
  MISSED: 'Missed',
  CONFIRMED: 'Confirmed',
  CHECKIN: 'Check In',
  COMPLETED: 'Completed',
  READY_FOR_PRACTITIONER: 'Ready For Practitioner',
  WAITING_ROOM: 'Waiting Room',
};

const appointmentStatusOptions = () =>
  Object.entries(appointmentStatus)?.map(([key, value]) => ({
    name: value,
    code: value,
    id: key,
  }));
const defaultScheduleData = [
  {
    day: 'monday',
    startHrs: '09:00',
    endHrs: '17:00',
    isClosed: false,
  },
  {
    day: 'tuesday',
    startHrs: '09:00',
    endHrs: '17:00',
    isClosed: false,
  },
  {
    day: 'wednesday',
    startHrs: '09:00',
    endHrs: '17:00',
    isClosed: false,
  },
  {
    day: 'thursday',
    startHrs: '09:00',
    endHrs: '17:00',
    isClosed: false,
  },
  {
    day: 'friday',
    startHrs: '09:00',
    endHrs: '17:00',
    isClosed: false,
  },
  {
    day: 'saturday',
    startHrs: '09:00',
    endHrs: '17:00',
    isClosed: false,
  },
  {
    day: 'sunday',
    startHrs: '09:00',
    endHrs: '17:00',
    isClosed: false,
  },
];

const googleMapApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const tabsStyling = {
  root: {
    fontSize: '0.8rem',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    lineheight: '22.4px',
    color: palette.grey[800],
  },
  selected: {
    fontSize: '0.8rem',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    lineHeight: '19.6px',
    fontWeight: 700,
  },
};

const mobileWidth = `(max-width:600px)`;

const quantityUnit = {
  MILLILITRE: 'mL',
  TABS: 'Tabs',
  CAPSULES: 'Caps',
  SUPPOSITORY: 'Supp',
  PUFFS: 'Puffs',
  PACKETS: 'Packets',
  AMPULE: 'amp',
  APPLICATION: 'app',
  DROPS: 'Drops',
  VIALS: 'Vials',
  SPRAYS: 'Sprays',
  LOZENGES: 'Lozenges',
  EACH: 'Each',
  PATCHES: 'Patches',
  INCH: 'inch',
  UNIT: 'unit',
};

const quantityUnitOptions = [
  {
    name: 'ml',
    value: quantityUnit.MILLILITRE,
  },
  {
    name: 'tabs',
    value: quantityUnit.TABS,
  },
  {
    name: 'caps',
    value: quantityUnit.CAPSULES,
  },
  {
    name: 'supp',
    value: quantityUnit.SUPPOSITORY,
  },
  {
    name: 'puffs',
    value: quantityUnit.PUFFS,
  },
  {
    name: 'packets',
    value: quantityUnit.PACKETS,
  },
  {
    name: 'amp',
    value: quantityUnit.AMPULE,
  },
  {
    name: 'app',
    value: quantityUnit.APPLICATION,
  },
  {
    name: 'drops',
    value: quantityUnit.DROPS,
  },
  {
    name: 'vials',
    value: quantityUnit.VIALS,
  },
  {
    name: 'sprays',
    value: quantityUnit.SPRAYS,
  },
  {
    name: 'lozenges',
    value: quantityUnit.LOZENGES,
  },
  {
    name: 'each',
    value: quantityUnit.EACH,
  },
  {
    name: 'patches',
    value: quantityUnit.PATCHES,
  },
  {
    name: 'inch',
    value: quantityUnit.INCH,
  },
  {
    name: 'unit',
    value: quantityUnit.UNIT,
  },
];

const strengthUnit = {
  UNITS: 'units',
  MILLIGRAMS: 'mg',
  GRAMS: 'gm',
  MICROGRAMS: 'mcg',
  INTERNATIONAL_UNITS: 'Intl_units',
  MILLION_UNITS: 'million_units',
  MILLIEQUIVALENTS: 'mEq',
  MILLIMOLES_PER_LITRE: 'mmol',
  PARTS_PER_MILLION: 'ppm',
  NANOGRAMS: 'ng',
  MILLIGRAMS_PER_MILLILITRE: 'mg/ml',
};

const strengthUnitOptions = [
  {
    name: 'mg/ml',
    value: strengthUnit.MILLIGRAMS_PER_MILLILITRE,
  },
  {
    name: 'units',
    value: strengthUnit.UNITS,
  },
  {
    name: 'mg',
    value: strengthUnit.MILLIGRAMS,
  },
  {
    name: 'grams',
    value: strengthUnit.GRAMS,
  },
  {
    name: 'micrograms',
    value: strengthUnit.MICROGRAMS,
  },
  {
    name: 'international units',
    value: strengthUnit.INTERNATIONAL_UNITS,
  },
  {
    name: 'million units',
    value: strengthUnit.MILLION_UNITS,
  },
  {
    name: 'milli equivalents',
    value: strengthUnit.MILLIEQUIVALENTS,
  },
  {
    name: 'millimoles per litre',
    value: strengthUnit.MILLIMOLES_PER_LITRE,
  },
  {
    name: 'parts per million',
    value: strengthUnit.PARTS_PER_MILLION,
  },
  {
    name: 'nano grams',
    value: strengthUnit.NANOGRAMS,
  },
];

const paymentMethods = [
  {
    id: 'creditCard',
    method: 'Credit Card',
  },
  {
    id: 'cash',
    method: 'Cash',
  },
  {
    id: 'cheque',
    method: 'Cheque',
  },
  {
    id: 'debitCard',
    method: 'Debit Card',
  },
  {
    id: 'bankTransfer',
    method: 'Bank Transfer',
  },
  {
    id: 'insurance',
    method: 'Insurance',
  },
  {
    id: 'giftCard',
    method: 'Gift Card',
  },
  {
    id: 'other',
    method: 'Other',
  },
];

const invoiceStatus = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  PARTIALLY_PAID: 'partiallyPaid',
};
const faxHistoryStatus = {
  SUCCESS: 'Success',
  FAILED: 'Failed',
};

const formType = {
  SYRINGE: 'Syringe',
  TAB: 'Tab',
  VIAL: 'Vial',
  SOLUTION_FOR_INTRVENOUS_USE: 'Soln-IV',
  CAPSULE: 'Cap',
  SUPPOSITORY: 'Supp',
  ORAL_SOLUTION: 'Soln-Oral',
  ORAL_DROPS: 'Drops-Oral',
  IRRIGATION_SOLUTION: 'Soln-IRR',
  INHALATION_SOLUTION: 'Soln-Inh',
  AEROSOL: 'Aerosol',
  NEBULIZATION_SOLUTION: 'Soln-Neb',
  AMPULE: 'Amp',
  EXTENDED_RELEASE_TABLET: 'Tab-ER',
  ORAL_SUSPENSION: 'Susp-Oral',
  OINTMENT: 'Ointment',
  INJECTION: 'Injection',
  POWDER_FOR_INJECTION: 'Inj-Powder',
  IRRIGATION_SUSPENSION: 'Susp-IRR',
  NEBULIZATION_SUSPENSION: 'Susp-Neb',
  NASAL_INHALER: 'Inh-Nasal',
  LOTION: 'Lotion',
  RECONSTITUTION_SUSPENSION: 'Susp-Rec',
  VAGINAL_CREAM: 'Cream-Vag',
  LOZENGE: 'Lozenge',
  LIQUID: 'Liquid',
  SYRUP: 'Syrup',
  GEL: 'Gel',
  NASAL_SPRAY: 'Spray-Nasal',
  POWDER_FRO_AEROSOL: 'Powder-Aerosol',
  PATCH_72_HOUR: 'Patch-72',
  EPIDURAL: 'Epidural',
  MISCELLANEOUS: 'Misc',
};

const formTypeOption = [
  {
    name: 'Syringe',
    value: formType.SYRINGE,
  },
  {
    name: 'Tab',
    value: formType.TAB,
  },
  {
    name: 'Vial',
    value: formType.VIAL,
  },
  {
    name: 'Soln-IV',
    value: formType.SOLUTION_FOR_INTRVENOUS_USE,
  },
  {
    name: 'Capsule',
    value: formType.CAPSULE,
  },
  {
    name: 'Suppository',
    value: formType.SUPPOSITORY,
  },
  {
    name: 'Oral Solution',
    value: formType.ORAL_SOLUTION,
  },
  {
    name: 'Oral Drops',
    value: formType.ORAL_DROPS,
  },
  {
    name: 'Irrigation Solution',
    value: formType.IRRIGATION_SOLUTION,
  },
  {
    name: 'Inhalation Solution',
    value: formType.INHALATION_SOLUTION,
  },
  {
    name: 'Aerosol',
    value: formType.AEROSOL,
  },
  {
    name: 'Nebulization Solution',
    value: formType.NEBULIZATION_SOLUTION,
  },
  {
    name: 'Ampule',
    value: formType.AMPULE,
  },
  {
    name: 'Extended Release Tablet',
    value: formType.EXTENDED_RELEASE_TABLET,
  },
  {
    name: 'Oral Suspension',
    value: formType.ORAL_SUSPENSION,
  },
  {
    name: 'Ointment',
    value: formType.OINTMENT,
  },
  {
    name: 'Injection',
    value: formType.INJECTION,
  },
  {
    name: 'Powder for Injection',
    value: formType.POWDER_FOR_INJECTION,
  },
  {
    name: 'Irrigation Suspension',
    value: formType.IRRIGATION_SUSPENSION,
  },
  {
    name: 'Nebulization Suspension',
    value: formType.NEBULIZATION_SUSPENSION,
  },
  {
    name: 'Nasal Inhaler',
    value: formType.NASAL_INHALER,
  },
  {
    name: 'Lotion',
    value: formType.LOTION,
  },
  {
    name: 'Reconstitution Suspension',
    value: formType.RECONSTITUTION_SUSPENSION,
  },
  {
    name: 'Vaginal Cream',
    value: formType.VAGINAL_CREAM,
  },
  {
    name: 'Lozenge',
    value: formType.LOZENGE,
  },
  {
    name: 'Liquid',
    value: formType.LIQUID,
  },
  {
    name: 'Syrup',
    value: formType.SYRUP,
  },
  {
    name: 'Gel',
    value: formType.GEL,
  },
  {
    name: 'Nasal Spray',
    value: formType.NASAL_SPRAY,
  },
  {
    name: 'Powder for Aerosol',
    value: formType.POWDER_FRO_AEROSOL,
  },
  {
    name: 'Patch 72 Hour',
    value: formType.PATCH_72_HOUR,
  },
  {
    name: 'Epidural',
    value: formType.EPIDURAL,
  },
  {
    name: 'Miscellaneous',
    value: formType.MISCELLANEOUS,
  },
];

const orderStatus = {
  received: 'received',
  initiated: 'initiated',
  completed: 'completed',
};

const patientPrescriptionFrequency = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  TWICE_WEEK: 'twiceWeek',
  THRICE_WEEK: 'thriceWeek',
  BI_WEEKLY: 'bi-weekly',
  MONTHLY: 'monthly',
};

const patientPrescriptionFrequencyOptions = [
  {
    name: 'Daily',
    label: patientPrescriptionFrequency.DAILY,
  },
  {
    name: 'Once a Week',
    label: patientPrescriptionFrequency.WEEKLY,
  },
  {
    name: 'Twice a Week',
    label: patientPrescriptionFrequency.TWICE_WEEK,
  },
  {
    name: 'Three times a week',
    label: patientPrescriptionFrequency.THRICE_WEEK,
  },
  {
    name: 'Bi-Weekly',
    label: patientPrescriptionFrequency.BI_WEEKLY,
  },
  {
    name: 'Monthly',
    label: patientPrescriptionFrequency.MONTHLY,
  },
];

const patientActivityTypes = {
  WEIGHT: 'weight',
  WATER_INTAKE: 'waterIntake',
  EXERCISE: 'exercise',
  MEAL: 'meal',
  MEDICINE: 'medicine',
};

const patientActivityTypeIcons = {
  weight: '/assets/icons/weight.svg',
  waterIntake: '/assets/icons/waterIntake.svg',
  exercise: '/assets/icons/exercise.svg',
  meal: '/assets/icons/meals.svg',
  medicine: '/assets/icons/medicine.svg',
};

const formStatus = {
  COMPLETE: 'Complete',
  PENDING: 'Pending',
  PARTIAL: 'Partial',
  SENT: 'Sent',
  FAXED: 'faxed',
};

const formFilterStatus = {
  COMPLETE: 'Complete',
  PARTIAL: 'Partial',
  SENT: 'Sent',
  'PROVIDER SIGNATURE PENDING': 'hasPendingPractitionerSignature',
};

const shipAndPayee = {
  patient: {
    label: 'Patient',
    value: 'patient',
  },
  clinic: {
    label: 'Clinic',
    value: 'practice',
  },
};

const tagsColorCodes = [
  '#3498db',
  '#91c957',
  '#9f5594',
  '#2d3c4b',
  '#f1aa40',
  '#da5c91',
  '#a8b3c5',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#f2d600',
  '#ff6601',
  '#38b2b4',
];

const pharmacyOrderFaxStatus = {
  PENDING: 'pending',
  FAXED: 'faxed',
  CREATED: 'created',
};

const pharmacyOrderStatus = {
  PENDING: 'pending',
  FAXED: 'faxed',
};

const pharmacyOrderStatusOptions = () =>
  Object.entries(pharmacyOrderStatus)?.map(([key, value]) => ({
    name: value,
    code: value,
    id: key,
  }));

const durationUnit = {
  DAILY: 'days',
  WEEKLY: 'weeks',
  MONTHLY: 'months',
};

const durationUnitOptions = [
  {
    name: 'Days',
    label: durationUnit.DAILY,
  },
  {
    name: 'Weeks',
    label: durationUnit.WEEKLY,
  },
  {
    name: 'Months',
    label: durationUnit.MONTHLY,
  },
];

const formTypes = {
  consent: 'FT_CONSENT_FORMS',
  intake: 'FT_QUESTIONNAIRES',
};

const formTypeName = {
  FT_QUESTIONNAIRES: 'Intake Form',
  FT_CONSENT_FORMS: 'Consent Form',
};
const medicineStatus = {
  NEW: 'new',
  CHANGE: 'changed',
  STOP: 'stopped',
};

const medicineStatusOptions = [
  {
    name: 'New',
    label: medicineStatus.NEW,
  },
  {
    name: 'Changed',
    label: medicineStatus.CHANGE,
  },
  {
    name: 'Stopped',
    label: medicineStatus.STOP,
  },
];

const patientInvoiceStatus = {
  draft: 'Draft',
  sent: 'Sent',
  paid: 'Paid',
  partiallyPaid: 'Partially Paid',
};

const patientOInvoiceStatusOptions = () =>
  Object.entries(patientInvoiceStatus)?.map(([key, value]) => ({
    name: value,
    code: key,
    id: key,
  }));

const thirdPartySettingStatus = {
  VERIFIED: 'Verified',
  PENDING_VERIFICATION: 'Pending Verification',
};
const Exercises = [
  {
    id: '1',
    exercise: 'Sitting or Resting',
    met: 1.0,
  },
  {
    id: '2',
    exercise: 'Walking',
    met: 3.9,
  },
  // {
  //   id: '3',
  //   exercise: 'Brisk Walking (4 mph, level ground)',
  //   met: 5.9,
  // },
  {
    id: '3',
    exercise: 'Running',
    met: 7.0,
  },
  {
    id: '4',
    exercise: 'Bicycling',
    met: 6.0,
  },
  {
    id: '5',
    exercise: 'Swimming',
    met: 7.0,
  },
  {
    id: '6',
    exercise: 'Jumping Rope',
    met: 12.0,
  },
  {
    id: '7',
    exercise: 'Yoga',
    met: 2.5,
  },
  {
    id: '8',
    exercise: 'Aerobic Dance',
    met: 7.0,
  },
  {
    id: '9',
    exercise: 'Weightlifting',
    met: 3.0,
  },
  {
    id: '10',
    exercise: 'Circuit Training',
    met: 4.0,
  },
  {
    id: '11',
    exercise: 'Hiking',
    met: 6.0,
  },
  {
    id: '12',
    exercise: 'Pilates',
    met: 2.0,
  },
  {
    id: '13',
    exercise: 'Rowing',
    met: 7.0,
  },
  {
    id: '14',
    exercise: 'Elliptical Trainer',
    met: 5.0,
  },
  {
    id: '15',
    exercise: 'CrossFit',
    met: 6.0,
  },
  {
    id: '16',
    exercise: 'Team Sports (e.g., soccer, basketball)',
    met: 6.0,
  },
];

const IntensityLevel = [
  {
    id: '1',
    intensityLevel: 'Sedentary',
    METValue: 1.0,
  },
  {
    id: '2',
    intensityLevel: 'Light Activity',
    METValue: 1.2,
  },
  {
    id: '3',
    intensityLevel: 'Moderate Activity',
    METValue: 1.5,
  },
  {
    id: '4',
    intensityLevel: 'Highly Active',
    METValue: 1.9,
  },
];

const paymentType = {
  card: 'card',
  electronic: 'electronic',
};

const notificationTypes = {
  MEETING_INVITE: 'Meeting Invite',
  APPOINTMENT_CREATED: 'Appointment Created',
  READY_FOR_PRACTITIONER: [appointmentStatus.READY_FOR_PRACTITIONER],
  WAITING_ROOM: [appointmentStatus.WAITING_ROOM],
};

const fileInfo = {
  CLINIC_LOGO: 'clinicLogo',
  EDUCATION_CONTENT: 'eductionContent',
  CHAT: 'chat',
  COMMENTS: 'comments',
  PATIENT_FORM: 'patientForm',
};

const notificationTypeToPathMapping = {
  [notificationTypes.MEETING_INVITE]: 'appointmentDetail',
  [notificationTypes.APPOINTMENT_CREATED]: 'appointmentDetail',
  [notificationTypes.READY_FOR_PRACTITIONER]: 'appointmentDetail',
  [notificationTypes.WAITING_ROOM]: 'appointmentDetail',
};

export {
  emailValidatorPattern,
  contentType,
  onlyAlphabet,
  requiredField,
  onlyNumber,
  regDecimal,
  notificationReminder,
  minDOB,
  regName,
  regexName,
  regFirstname,
  regEmail,
  regTextArea,
  regexCommonText,
  regMobile,
  regPassword,
  regexAlphanumeric,
  noHtmlTagPattern,
  maxLength,
  maxFutureAppointmentDate,
  userTimeZone,
  DRAWER_WIDTH,
  HEADER_DESKTOP,
  HEADER_MOBILE,
  master,
  roleTypes,
  roleTypesValue,
  setUserData,
  userData,
  dateFormats,
  genders,
  scheduleMessage,
  getArrayDiff,
  appointmentStatus,
  appointmentStatusOptions,
  defaultScheduleData,
  googleMapApiKey,
  tabsStyling,
  successMessage,
  mobileWidth,
  inputLength,
  alphanumericPattern,
  regexUrl,
  quantityUnitOptions,
  strengthUnitOptions,
  copyMessage,
  timeFormats,
  paymentMethods,
  invoiceStatus,
  formTypeOption,
  orderStatus,
  patientPrescriptionFrequencyOptions,
  patientActivityTypes,
  patientActivityTypeIcons,
  formStatus,
  strengthUnit,
  shipAndPayee,
  patientPrescriptionFrequency,
  patientOrderStatusOptions,
  faxHistoryStatus,
  tagsColorCodes,
  pharmacyOrderStatusOptions,
  pharmacyOrderFaxStatus,
  durationUnitOptions,
  formFilterStatus,
  pharmacyOrderStatus,
  medicineStatusOptions,
  medicineStatus,
  appointmentMessage,
  formTypes,
  formTypeName,
  roleMessage,
  patientOInvoiceStatusOptions,
  durationUnit,
  Exercises,
  IntensityLevel,
  paymentType,
  thirdPartySettingStatus,
  regPostalCode,
  notificationTypes,
  patientOrderStatus,
  fileInfo,
  notificationTypeToPathMapping,
};
