import VueI18n from 'vue-i18n'
import Vue from 'vue'

// Ready translated locale messages
const messages = {
    en: {
        hello: 'hello world'

    },
    sq: {
        hello: 'tungjatjeta bote'

    }
}

Vue.use(VueI18n)


// Create VueI18n instance with options
export const i18n = new VueI18n({
    locale: 'en', // set locale,
    fallbackLocale: 'en',
    messages, // set locale messages
})
