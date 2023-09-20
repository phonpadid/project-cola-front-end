<template>
  <!-- class="card" -->
  <div class="card mt-2">
    <!-- {{ inputValueContent }} -->
    <p v-if="error" class="error-message">{{ error }}</p>
    <nav>
      <div class="textarea-box">
        <textarea
          class="textarea"
          ref="textInputRef"
          v-model="inputValueContent"
          @input="varidateText"
          @focus="onTextAreaFocus"
        />
      </div>
      <!-- Emoji -->
      <ul class="menu">
        <li>
          <a href="#" @click="onShowClose"
            ><i class="bi bi-emoji-laughing-fill cursor-pointer"></i
          ></a>
          <ul class="menu-popup">
            <li class="li-emoji">
              <a href="#" class="a-emoji"
                ><EmojiPicker class="Emojipicker" v-show="showEimoji" @select="onSelectEmoji"
              /></a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <!-- Btn -->
    <button
      class="btn_a m-2 bg-primary cursor-pointer text-white hover:text-gray-900 hover:bg-red-400"
      @click="showFirstName"
    >
      $firstName
    </button>
    <button
      class="btn_a m-2 bg-primary cursor-pointer text-white hover:text-gray-900 hover:bg-red-400"
      @click="showTeam_A"
    >
      $teamA
    </button>
    <button
      class="btn_b m-2 bg-pink-500 cursor-pointer text-white hover:text-gray-900 hover:bg-yellow-500"
      @click="showTeam_B"
    >
      $teamB
    </button>

    <button
      class="btn_b m-2 bg-pink-900 cursor-pointer text-white hover:text-gray-900 hover:bg-red-600"
      @click="addDatetimeToTextarea"
    >
      $dateTime
    </button>
    <button
      class="btn_b m-2 bg-red-500 cursor-pointer text-white hover:text-gray-900 hover:bg-purple-500"
      @click="Clear_Data"
    >
      $clear
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watchEffect } from 'vue'
import textarea from 'primevue/textarea'
import { count } from 'console'

// import Textarea from 'primevue/textarea';
// Define your data properties
const textInputRef = ref<HTMLTextAreaElement>()
const showEimoji = ref(false)
const error = ref('')

function onShowClose() {
  showEimoji.value = !showEimoji.value
}

const inputValueContent = ref('🥰ສະບາຍດີ🥰 ຂອບໃຈທີເຂົົ້າຮ່ວມເຊຍທີມ👉 ')

const showFirstName = () => {
  const dataFirstname = '$FirstName '
  onChangeReplaceCurrentCursorFocus(dataFirstname)
}
const showTeam_A = () => {
  const dataToShow = 'TeamA VS '
  onChangeReplaceCurrentCursorFocus(dataToShow)
}
const showTeam_B = () => {
  const dataToAdd = 'Team_B '
  onChangeReplaceCurrentCursorFocus(dataToAdd)
}
// DateTime
const addDatetimeToTextarea = () => {
  const currentDate = new Date()
  const formattedDatetime = currentDate.toLocaleString() // Format as desired
  inputValueContent.value += formattedDatetime + '\n' // Add datetime to textarea
}
// Clear
const Clear_Data = () => {
  inputValueContent.value = ''
}

function onSelectEmoji(emoji: any) {
  const emoji_icon: string = emoji.i as string
  onChangeReplaceCurrentCursorFocus(emoji_icon)
}
const rememberCursorPoistion = ref(0)
const isHaveEvented = ref(false)
function onTextAreaFocus() {
  rememberCursorPoistion.value = textInputRef.value.selectionStart
  isHaveEvented.value = false
}
function onChangeReplaceCurrentCursorFocus(_key_replace: string) {
  let cursor_cuurent_position = textInputRef.value.selectionStart
  if (isHaveEvented.value) {
    cursor_cuurent_position = rememberCursorPoistion.value
  }

  const speacial_content = inputValueContent.value[cursor_cuurent_position]
    ? inputValueContent.value[cursor_cuurent_position]
    : ''
  inputValueContent.value =
    inputValueContent.value.substring(0, cursor_cuurent_position) +
    _key_replace +
    speacial_content +
    inputValueContent.value.substring(cursor_cuurent_position + 1)
  if (!isHaveEvented.value) {
    rememberCursorPoistion.value = cursor_cuurent_position + _key_replace.length
  } else {
    rememberCursorPoistion.value = rememberCursorPoistion.value + _key_replace.length
  }
  isHaveEvented.value = true
}

watchEffect(() => {
  // textInputRef.value
})

// varidate
const varidateText = () => {
  const content = inputValueContent.value
  if (content.trim() === '') {
    error.value = 'ກະລຸນາປ້ອນຂໍ້ຄວາມກ່ອນ'
  } else {
    error.value = ''
  }
}

// const showPopup = ref(false)

// const closePopup = () => {
//   showPopup.value = false
// }
</script>
<style scoped lang="scss">
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
/* textarea */
.textarea-with-icon {
  display: flex;
  align-items: center;
}

.textarea-with-icon i {
  font-size: 1.2rem; /* Adjust the size as needed */
  margin-right: 10px; /* Adjust the spacing as needed */
}

textarea {
  width: 100%;
  height: 100px;
  resize: none;
  font-size: 16px;
  padding: 10px;
}
/* Emoji */
/* .head-emoji{
  position: absolute;
  outline: 1px solid red;
} */

// .Emojipicker {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
//   left: 50px;
// }

/* Text error */
.error-message {
  color: red;
  font-size: 16px;
}

nav {
  display: flex;
  justify-content: space-between;
  .textarea-box {
    width: 100%;
  }
  .textarea {
    width: 105%;
  }
}

.menu {
  list-style: none;
  position: relative;
  .li,
  a,
  i {
    color: #333;
    position: absolute;
    right: 12px;
    margin: 4px;
  }
}
.menu-popup {
    list-style: none;
    .li-emoji{
      .a-emoji{
        top: 60px;
      }
    }
  }
</style>
