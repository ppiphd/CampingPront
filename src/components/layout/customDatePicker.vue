<script>
import { onMounted, ref } from "vue";

export default {
  name: "customDatePicker",
  emits: ["update:value"],
  setup() {
    const openCalendarState = ref(false);
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const daysOfWeekList = ["일", "월", "화", "수", "목", "금", "토"];
    const dateValue = ref({
      year: 0,
      month: 0,
      date: 0,
      dayOfWeek: 0
    });
    const calendarMonthStartDate = ref(0); //월의 시작일
    const calendarMonthLastDate = ref(0); //월의 마지막일
    const weekCount = ref(0); //월의 주 갯수
    const displayDate = ref("날짜 선택");

    const changeCalendarState = () => {
      openCalendarState.value = !openCalendarState.value;
    };

    const getCalendar = (year, month) => {
      let date;
      if (year && month) {
        date = new Date(year, month - 1, 1);
      } else {
        date = new Date();
      }
      dateValue.value = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        dayOfWeek: date.getDay()
      };
      calcLeapYear();
      calendarMonthLastDate.value = monthDays[date.getMonth()]; //월의 마지막 날
      calendarMonthStartDate.value = new Date(dateValue.value.year, date.getMonth(), 1).getDay() + 1; // 월의 시작 날 // +1한 이유 일요일부터 시작하기 때문
      weekCount.value = Math.ceil((calendarMonthStartDate.value + calendarMonthLastDate.value) / 7); // 월의 주 갯수
    };

    //윤년 계산
    const calcLeapYear = () => {
      if (dateValue.value.year % 400 === 0) {
        monthDays[1] = 29;
      } else if (dateValue.value.year % 100 === 0) {
        monthDays[1] = 28;
      } else if (dateValue.value.year % 4 === 0) {
        monthDays[1] = 29;
      }
    };

    onMounted(() => {
      getCalendar();

    });

    const showDate = (col, row) => {
      let result = (col - 1) * 7 + row;
      if (result < calendarMonthStartDate.value) {
        result = "";
      } else if (result < calendarMonthLastDate.value + calendarMonthStartDate.value) {
        result -= calendarMonthStartDate.value - 1;
      } else {
        result = "";
      }
      return result;
    };

    const checkDay = (col, row) => {
      let result = "";
      const date = new Date();
      if (row === 7) {
        result += "sater-day";
      } else if (row === 1) {
        result += "sun-day";
      }
      if (dateValue.value.month === date.getMonth() + 1) {
        if (showDate(col, row) === dateValue.value.date) {
          result += " today";
        }
      }
      if (showDate(col, row)) {
        result += " cursor";
      }

      return result;
    };

    const preMonth = () => {
      dateValue.value.month -= 1;
      if (dateValue.value.month < 1) {
        dateValue.value.month = 12;
        dateValue.value.year -= 1;
      }
      getCalendar(dateValue.value.year, dateValue.value.month);
    };
    const nextMonth = () => {
      dateValue.value.month += 1;
      if (dateValue.value.month > 12) {
        dateValue.value.month = 1;
        dateValue.value.year += 1;
      }
      getCalendar(dateValue.value.year, dateValue.value.month);
    };

    return {
      openCalendarState,
      dateValue,
      weekCount,
      calendarMonthStartDate,
      displayDate,
      showDate,
      checkDay,
      preMonth,
      nextMonth,
      changeCalendarState
    };
  },
  methods: {
    getDate(date) {
      if (date) {
        const result = `${this.dateValue.year}-${this.dateValue.month}-${date}`;
        this.changeCalendarState();
        this.displayDate = result;
        this.$emit("update:value", result);
      }
    }
  }
};
</script>
<template>
  <div class="calendar-btn" @click="changeCalendarState">{{ displayDate }}</div>
  <div v-if="openCalendarState" id="calendar">
    <div class="header">
      <i class="fa-solid fa-caret-left left" @click="preMonth"></i>
      {{ dateValue.year }}년 {{ dateValue.month }}월
      <i class="fa-solid fa-caret-right right" @click="nextMonth"></i>
    </div>
    <div class="body">
      <div class="week" v-for="col in weekCount">
        <div class="days" v-for="row in 7" :class="checkDay(col, row)" @click="getDate(showDate(col, row))">
          {{ showDate(col, row) }}
        </div>
      </div>
    </div>
  </div>

</template>
