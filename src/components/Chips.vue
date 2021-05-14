<template>
  <v-card-text>
    <v-chip-group
      column
    >
    <v-chip v-for="chip in chips" :key="chip"
      close
      @click:close="$emit('removeChip', chip)"
    >
      <strong>{{ chip }}</strong>&nbsp;
    </v-chip>
    </v-chip-group>
    
    <v-text-field v-model="newChipText" @keyup.enter="onChipAdd"
      label="Solo"
      placeholder="Placeholder"
      clearable
    ></v-text-field>
  </v-card-text>


  <!-- <v-card-text>
    <v-combobox
      v-model="chips"
      :items="items"
      chips
      clearable
      label="Your favorite hobbies"
      multiple
      prepend-icon="mdi-filter-variant"
      solo
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          @click:close="$emit('removeChip', item)"
        >
          <strong>{{ item }}</strong>&nbsp;
          <span>(interest)</span>
        </v-chip>
      </template>
    </v-combobox>
  </v-card-text> -->


  <!-- <div class="chips chips-initial" tabindex="0">
    <div class="chip" v-for="chip in chips" :key="chip">
      <span>{{chip}}</span>
      <i class="close fas fa-times" @click="$emit('removeChip', chip)"></i>
    </div>
    <input class="input active" placeholder="" v-model="newChipText" @keyup.enter="onChipAdd">
  </div> -->
</template>

<script>
export default {
  name: 'chips-component',
  props: {
    chips: Array,
    items: Array
  },
  data() {
    return {
      newChipText: '',
    }
  },
  methods: {
    onChipAdd() {
      this.$emit('addNewChip', this.newChipText)
      this.newChipText = ''
    }
  }
}
</script>

<style>
/* chips */
/* .chips {
  min-height: 45px;
  padding: 1rem 0;
  margin-bottom: 30px;
  border: 0;
  outline: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: all .3s;
  transition: all .3s;
}

.chip {
  display: inline-block;
  height: 32px;
  padding: 0 12px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 32px;
  color: rgba(0,0,0,0.6);
  cursor: pointer;
  background-color: #eceff1;
  border-radius: 16px;
  -webkit-transition: all .3s linear;
  transition: all .3s linear;
}

.chip img {
  float: left;
  width: 32px;
  height: 32px;
  margin: 0 8px 0 -12px;
  border-radius: 50%;
}

.chip .close {
  float: right;
  padding-left: 8px;
  font-size: 16px;
  line-height: 32px;
  cursor: pointer;
  -webkit-transition: all .1s linear;
  transition: all .1s linear;
}

.chip .close:hover {
  color: #000;
}
.chips .input {
  display: inline-block;
  width: 120px !important;
  height: 32px;
  padding: 0 !important;
  margin-right: 20px;
  font-weight: 500;
  line-height: 32px;
  color: rgba(0,0,0,0.6);
  background: 0;
  border: 0;
  outline: 0;
  overflow: visible;
}

.chips .input:focus {
  border: 0 !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
} */
</style>