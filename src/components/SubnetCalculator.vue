<template>
  <div class="subnet-calculator">
    <UiField label="IP адрес:">
      <UiInput
        v-model="ipAddress"
        type="text"
        placeholder="192.168.1.1"
        @keyup.enter="calculate"
        :data-has-error="!isIpValid(ipAddress) && ipAddress !== ''"
      />
    </UiField>

    <div v-if="!isIpValid(ipAddress) && ipAddress" class="error-message">Неверный формат IP адреса</div>

    <UiField label="Сетевая маска:">
      <UiSelect v-model="selectedMask" :options="maskLabels" />
    </UiField>

    <UiButton layout="primary" @click="calculate" :isDisabled="!isFormValid" type="button" class="calculate-btn">
      Рассчитать IP адрес
    </UiButton>

    <div v-if="result" class="results">
      <h3>Результаты:</h3>
      <div class="result-item">IP адрес: {{ result.ip }}</div>
      <div class="result-item">Маска: {{ result.mask }}</div>
      <div class="result-item">Адрес сети: {{ result.networkAddress }}</div>
      <div class="result-item">Количество адресов: {{ result.addressesCount }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { UiButton, UiInput, UiSelect, UiField } from 'componentsrichlibrary';
import { MASK_OPTIONS } from '../constants/maskOptions';
import { isIpValid } from '../utils/validation';
import { getNetworkAddress, getAddressesCount } from '../utils/calculations';
import type { NetworkInfo, MaskOption } from '../types/network';

const ipAddress = ref<string>('');
const selectedMask = ref<string>(MASK_OPTIONS[8].value);
const result = ref<NetworkInfo | null>(null);

const maskLabels = computed<string[]>(() => {
  return MASK_OPTIONS.map((option: MaskOption) => option.label);
});

const currentMaskValue = computed<string>(() => {
  const found = MASK_OPTIONS.find((option: MaskOption) => option.label === selectedMask.value);

  return found ? found.value : MASK_OPTIONS[8].value;
});

const isFormValid = computed<boolean>(() => isIpValid(ipAddress.value));

const calculate = (): void => {
  if (!isFormValid.value) return;

  result.value = {
    ip: ipAddress.value,
    mask: selectedMask.value,
    networkAddress: getNetworkAddress(ipAddress.value, currentMaskValue.value),
    addressesCount: getAddressesCount(currentMaskValue.value),
  };
};
</script>
