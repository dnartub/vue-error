<template>
  <div class="error-overlay">
    <div class="error-content">

      <div class="error-type">
        <span class ="error-type-text">
          {{errorTypeString}}
        </span>
      </div>

      <div class="error-message">
        {{errorMessage}}
      </div>

      <div class="error-stack">
        {{errorStack}}
      </div>

      <div v-if="showRefreshBtn" class="error-refresh">
        <div>Click 'Refresh' button for element reloading </div>
        <el-button  @click="onRefresh">Refresh</el-button>
      </div>

    </div>
  </div>
</template>

<script src="./error-overlay.ts" lang="ts"></script>
<style lang="scss">
  @import "./error-overlay.scss";
</style>
