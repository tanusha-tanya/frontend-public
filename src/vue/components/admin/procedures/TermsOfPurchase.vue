<template>
  <div v-if="selectedData.tender_trading_type && selectedData.tender_trading_type.id" class="container-item">
    <h3 class="procedure__main-title">Сроки закупки</h3>
    <div class="row">
      <div
          v-if="
          procedureIdData.procedureType === 'Query' ||
          procedureIdData.procedureType === 'Offers' ||
          procedureIdData.procedureType === 'Commercial' ||
          procedureIdData.procedureType === 'Auction'
        "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-time
            v-model="selectedData.application_end_date"
            :label="
              procedureIdData.procedureType === 'Query' ||
              procedureIdData.procedureType === 'Offers' ||
              procedureIdData.procedureType === 'Commercial'
                ? 'Дата окончания подачи заявок'
                : 'Дата начала процедуры'
            "
            placeholder="Выберите крайнюю дату"
            :disabled="isCreatedProcedure"
            :min-date="
              procedureIdData.procedureType === 'Query'
                ? new Date(procedureIdData.setMinFiveDates.publication_date)
                : procedureIdData.procedureType === 'Offers'
                 ? new Date(procedureIdData.setMinSevenDates.publication_date)
                 : new Date(procedureIdData.setMinDates.publication_date)
            "
            :rules="{
               required: true,
               minMaxDateCheck:
                procedureIdData.procedureType === 'Query'
                  ? procedureIdData.setMinFiveDates.publication_date
                  : procedureIdData.procedureType === 'Offers'
                    ? procedureIdData.setMinSevenDates.publication_date
                    : procedureIdData.setMinDates.publication_date
            }"
        ></date-time>
      </div>
      <div
          v-if="
          procedureIdData.procedureType === 'Contest' ||
          procedureIdData.procedureType === 'Supplier'
        "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-range
            v-model="selectedData.application_terms_of_contract"
            label="Сроки заключения договора"
            :disabled="isCreatedProcedure"
            placeholder="Выберите период"
            :min-date="new Date(procedureIdData.setMinDates.application_date_time_summing_up)"
            :rules="{required: true, minMaxDateCheck: procedureIdData.setMinDates.application_date_time_summing_up}"
        ></date-range>
      </div>
      <div
          v-if="
          procedureIdData.procedureType === 'Contest' ||
          procedureIdData.procedureType === 'Query' ||
          procedureIdData.procedureType === 'Offers' ||
          procedureIdData.procedureType === 'Commercial' ||
          procedureIdData.procedureType === 'Supplier'
        "
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-range
            v-model="selectedData.application_delivery_time"
            :label="
              procedureIdData.procedureType === 'Contest' ||
              procedureIdData.procedureType === 'Suppliers'
                ? 'Сроки поставки товара'
                : 'Дата вскрытия заявок'
            "
            :disabled="isCreatedProcedure"
            placeholder="Выберите период"
            :min-date="
              procedureIdData.procedureType === 'Contest' ||
              procedureIdData.procedureType === 'Suppliers'
                ? new Date(procedureIdData.setMinDates.application_terms_of_contract)
                : new Date(procedureIdData.setMinDates.application_end_date)
            "
            :rules="{
              required: true,
              minMaxDateCheck:
                procedureIdData.procedureType === 'Contest' ||
                procedureIdData.procedureType === 'Suppliers'
                  ? procedureIdData.setMinDates.application_terms_of_contract
                  : procedureIdData.setMinDates.application_end_date
            }"
        ></date-range>
      </div>
      <div
          v-if="procedureIdData.procedureType === 'Auction'"
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <date-time
            v-model="selectedData.application_delivery_time"
            label="Дата окончания процедуры"
            placeholder="Выберите крайнюю дату"
            :disabled="isCreatedProcedure"
            :min-date="new Date(procedureIdData.setMin2WeeksDates.application_end_date)"
            :rules="{
              required: true,
              minMaxDateCheck: procedureIdData.setMin2WeeksDates.application_end_date
            }"
        ></date-time>
      </div>
      <div
          v-if="procedureIdData.procedureType === 'Auction'"
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <checkbox-input
            class-name="mt3"
            :disabled="isCreatedProcedure"
            name="consideration_of_auction_bids"
            v-model="selectedData.consideration_of_auction_bids"
            :label="[{label: 'Рассмотрение аукционных заявок до начала процедуры'}]"
        ></checkbox-input>
      </div>
      <div
          v-if="procedureIdData.procedureType === 'Auction'"
          class="col col-md-4 col-sm-6 col-xs-12"
      >
        <text-input
            v-model="selectedData.application_comment"
            label="Комментарий"
            :disabled="isCreatedProcedure"
            placeholder="Введите комментарий"
        ></text-input>
      </div>
    </div>
  </div>
</template>

<script>
import DateTime from '@/components/forms/DateTime.vue'
import TextInput from '@/components/forms/Input.vue'
import CheckboxInput from '@/components/forms/Checkbox.vue'
import DateRange from '@/components/forms/DateRange.vue'

export default {
  name: 'TermsOfPurchase',
  components: {
    DateTime,
    TextInput,
    DateRange,
    CheckboxInput,
  },
  props: {
    isCreatedProcedure: {
      default: false,
      type: Boolean,
    },
    selectedData: {
      default: null,
      type: Object,
    },
    procedureIdData: {
      default: null,
      type: Object,
    },
  },
}
</script>

<style scoped></style>
