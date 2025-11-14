import { PickersLocaleText } from '@mui/x-date-pickers';
import { TimeViewWithMeridiem } from '@mui/x-date-pickers/internals';

export const getPickersLocalization = (pickersTranslations: Partial<PickersLocaleText>) => {
  return {
    components: {
      MuiLocalizationProvider: {
        defaultProps: {
          localeText: { ...pickersTranslations },
        },
      },
    },
  };
};

const views: Record<TimeViewWithMeridiem, string> = {
  hours: 'الساعات',
  minutes: 'الدقائق',
  seconds: 'الثواني',
  meridiem: 'صباحاً/مساءً',
};

// Arabic Translations for DatePicker component.
const arSAPickers: Partial<PickersLocaleText> = {
  // Calendar navigation
  previousMonth: 'الشهر السابق',
  nextMonth: 'الشهر التالي',
  // View navigation
  openPreviousView: 'فتح العرض السابق',
  openNextView: 'فتح العرض التالي',
  calendarViewSwitchingButtonAriaLabel: (view) =>
    view === 'year'
      ? 'عرض السنة مفتوح، التبديل إلى عرض التقويم'
      : 'عرض التقويم مفتوح، التبديل إلى عرض السنة',
  // DateRange labels
  start: 'بداية',
  end: 'نهاية',
  startDate: 'تاريخ البداية',
  startTime: 'وقت البداية',
  endDate: 'تاريخ النهاية',
  endTime: 'وقت النهاية',
  // Action bar
  cancelButtonLabel: 'إلغاء',
  clearButtonLabel: 'مسح',
  okButtonLabel: 'موافق',
  todayButtonLabel: 'اليوم',
  nextStepButtonLabel: 'التالي',
  // Toolbar titles
  datePickerToolbarTitle: 'اختر التاريخ',
  dateTimePickerToolbarTitle: 'اختر التاريخ والوقت',
  timePickerToolbarTitle: 'اختر الوقت',
  dateRangePickerToolbarTitle: 'اختر نطاق التاريخ',
  // Clock labels
  clockLabelText: (view, formattedTime) =>
    `اختر ${views[view]}. ${!formattedTime ? 'لم يتم اختيار وقت' : `الوقت المختار هو ${formattedTime}`}`,
  hoursClockNumberText: (hours) => `${hours} ساعة`,
  minutesClockNumberText: (minutes) => `${minutes} دقيقة`,
  secondsClockNumberText: (seconds) => `${seconds} ثانية`,
  // Digital clock labels
  selectViewText: (view) => `اختر ${views[view]}`,
  // Calendar labels
  calendarWeekNumberHeaderLabel: 'رقم الأسبوع',
  calendarWeekNumberHeaderText: '#',
  calendarWeekNumberAriaLabelText: (weekNumber) => `أسبوع ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,
  // Open Picker labels
  openDatePickerDialogue: (formattedDate) =>
    formattedDate ? `اختر التاريخ، التاريخ المختار هو ${formattedDate}` : 'اختر التاريخ',
  openTimePickerDialogue: (formattedTime) =>
    formattedTime ? `اختر الوقت، الوقت المختار هو ${formattedTime}` : 'اختر الوقت',
  fieldClearLabel: 'مسح القيمة',
  // Table labels
  timeTableLabel: 'اختر الوقت',
  dateTableLabel: 'اختر التاريخ',
  // Field section placeholders
  fieldYearPlaceholder: (params) => 'س'.repeat(params.digitAmount),
  fieldMonthPlaceholder: (params) => (params.contentType === 'letter' ? 'شهر' : 'شش'),
  fieldDayPlaceholder: () => 'يي',
  fieldWeekDayPlaceholder: (params) => (params.contentType === 'letter' ? 'يوم' : 'ي'),
  fieldHoursPlaceholder: () => 'سس',
  fieldMinutesPlaceholder: () => 'دد',
  fieldSecondsPlaceholder: () => 'ثث',
  fieldMeridiemPlaceholder: () => 'ص/م',
  // View names
  year: 'السنة',
  month: 'الشهر',
  day: 'اليوم',
  weekDay: 'يوم الأسبوع',
  hours: 'الساعات',
  minutes: 'الدقائق',
  seconds: 'الثواني',
  meridiem: 'صباحاً/مساءً',
  // Common
  empty: 'فارغ',
};

export const arSA = getPickersLocalization(arSAPickers);
