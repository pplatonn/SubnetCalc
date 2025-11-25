<template>
  <div class="subnet-calculator">
    <div class="input-group">
      <label for="ip-input">IP адрес:</label>
      <input
        id="ip-input"
        v-model="ipAddress"
        type="text"
        placeholder="192.168.1.1"
        @keyup.enter="calculate"
        :class="{ error: !isIpValid && ipAddress }"
      />
      <span v-if="!isIpValid && ipAddress" class="error-message"> Неверный формат IP адреса </span>
    </div>
    <div class="input-group">
      <label for="mask-select">Сетевая маска:</label>
      <select id="mask-select" v-model="selectedMask">
        <option v-for="option in MASK_OPTIONS" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <button type="button" @click="calculate" :disabled="!isFormValid" class="calculate-btn">Рассчитать IP адрес</button>
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
import { MASK_OPTIONS } from '../constants/maskOptions';
import { isIpValid } from '../utils/validation';
import { getNetworkAddress, getAddressesCount } from '../utils/calculations';
import type { NetworkInfo } from '../types/network';

const ipAddress = ref<string>('');
const selectedMask = ref<string>(MASK_OPTIONS[8].value);
const result = ref<NetworkInfo | null>(null);

const isFormValid = computed<boolean>(() => isIpValid(ipAddress.value));

const calculate = (): void => {
  if (!isFormValid.value) return;

  result.value = {
    ip: ipAddress.value,
    mask: selectedMask.value,
    networkAddress: getNetworkAddress(ipAddress.value, selectedMask.value),
    addressesCount: getAddressesCount(selectedMask.value),
  };
};
</script>
