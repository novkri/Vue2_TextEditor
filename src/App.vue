<template>
  <div id="app">
    <v-app>
      <!-- <v-main>
        <v-main>
          <h1 style="overflow: auto;">Tiptap Vuetify
            <v-btn href="https://github.com/iliyaZelenko/tiptap-vuetify" style="float: right;" icon>
              <v-icon>mdi-github-circle</v-icon>
            </v-btn>
          </h1>1
          <v-divider/>

          <h2 class="text-center my-3">Examples navigation</h2>

        </v-main>
        <div>
          <v-card flat>
            <v-container>
              <TextEditor />
            </v-container>
        
          </v-card>
        </div>
      </v-main> -->
          <QuillEd />
    </v-app>
    

  </div>
</template>

<script>
import QuillEd from './components/QuillEd'
// import TextEditor from './components/TextEditor'

export default {
  name: 'App',
  components: {
    QuillEd
    // TextEditor
  }
}
</script>

<style>

</style>
