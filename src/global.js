import Vue from 'vue'

export const userKey = '__d2gfs8dstj12ba'
export const baseApiUrl = 'http://heroku pg:psql postgresql-animate-80030 --app crass-back'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }