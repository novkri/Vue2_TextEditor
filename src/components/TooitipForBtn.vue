<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon :color="btnColor" @mousedown="$emit('handleBtnClick')"  v-bind="attrs"
        v-on="on">
        <v-icon>{{iconName}}</v-icon>
      </v-btn>
    </template>
      <span>{{tooltipText}}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    tooltipText: String,
    btnColor: String,
    iconName: String
  }
}
</script>

<style>

</style>